'use client';

import { useChat } from 'ai/react';
import { useCallback, useRef, useState } from 'react';

const GREETING =
  "Welcome to One Hardie. I'm your Exterior Concierge — here to help you design a complete exterior that looks beautiful and performs better for decades. Whether you're thinking about new siding, a stunning deck, or a covered outdoor room you can use year-round, let's figure out what's right for your home. Where would you like to start?";

export function useHardieChat() {
  const [isSpeaking, setIsSpeaking]       = useState(false);
  const [ttsAvailable, setTtsAvailable]   = useState(true);
  // true once the user has clicked something — needed to satisfy browser autoplay policy
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speakText = useCallback(
    async (text: string, { force = false } = {}) => {
      if (!ttsAvailable)               return;
      if (!text.trim())                return;
      // Skip autoplay until the user has interacted with the page,
      // unless this call is explicitly forced (e.g. from the enable-voice button)
      if (!audioUnlocked && !force)    return;

      try {
        setIsSpeaking(true);

        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }

        const resp = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });

        if (!resp.ok) {
          if (resp.status === 503) setTtsAvailable(false);
          setIsSpeaking(false);
          return;
        }

        const blob  = await resp.blob();
        const url   = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audioRef.current = audio;

        audio.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(url);
          audioRef.current = null;
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(url);
          audioRef.current = null;
        };

        await audio.play();
      } catch (err) {
        console.warn('TTS playback error:', err);
        setIsSpeaking(false);
      }
    },
    [ttsAvailable, audioUnlocked],
  );

  // Called when the user clicks "Enable voice" — counts as a user gesture
  // so the browser allows the audio.play() that follows.
  const enableVoice = useCallback(async () => {
    setAudioUnlocked(true);
    // speakText with force:true bypasses the audioUnlocked guard
    // (state update is async so audioUnlocked may still be false here)
    if (!ttsAvailable) return;
    try {
      setIsSpeaking(true);
      const resp = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: GREETING }),
      });
      if (!resp.ok) { if (resp.status === 503) setTtsAvailable(false); setIsSpeaking(false); return; }
      const url   = URL.createObjectURL(await resp.blob());
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => { setIsSpeaking(false); URL.revokeObjectURL(url); audioRef.current = null; };
      audio.onerror = () => { setIsSpeaking(false); URL.revokeObjectURL(url); audioRef.current = null; };
      await audio.play();
    } catch (err) {
      console.warn('TTS enable error:', err);
      setIsSpeaking(false);
    }
  }, [ttsAvailable]);

  const stopSpeaking = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
    setIsSpeaking(false);
  }, []);

  const chat = useChat({
    api: '/api/chat',
    initialMessages: [{ id: 'greeting', role: 'assistant', content: GREETING }],
    onFinish: async (message) => {
      if (message.role === 'assistant' && message.content) {
        await speakText(message.content);
      }
    },
  });

  return {
    ...chat,
    isSpeaking,
    ttsAvailable,
    audioUnlocked,
    speakText,
    enableVoice,
    stopSpeaking,
  };
}
