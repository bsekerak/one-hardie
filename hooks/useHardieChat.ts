'use client';

import { useChat } from 'ai/react';
import { useCallback, useRef, useState } from 'react';

const GREETING =
  "Welcome to One Hardie. I'm Hardie, your Exterior Concierge — here to help you design a complete exterior that looks beautiful and performs better for decades. Whether you're thinking about new siding, a stunning deck, or a covered outdoor room you can use year-round, let's figure out what's right for your home. Where would you like to start?";

export function useHardieChat() {
  const [isSpeaking, setIsSpeaking]     = useState(false);
  const [ttsAvailable, setTtsAvailable] = useState(true);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  // useRef so the flag is always current inside any async callback or
  // stale closure — avoids the classic "onFinish captures old state" bug.
  const audioUnlockedRef = useRef(false);
  const audioRef         = useRef<HTMLAudioElement | null>(null);

  const playBlob = useCallback(async (blob: Blob) => {
    const url   = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audioRef.current = audio;

    audio.onended = () => {
      setIsSpeaking(false);
      URL.revokeObjectURL(url);
      audioRef.current = null;
    };
    audio.onerror = (e) => {
      console.error('[OneHardie] audio element error:', e);
      setIsSpeaking(false);
      URL.revokeObjectURL(url);
      audioRef.current = null;
    };

    try {
      console.log('[OneHardie] audio.play() — blob size:', blob.size, 'type:', blob.type);
      await audio.play();
      console.log('[OneHardie] audio.play() succeeded');
    } catch (err) {
      console.error('[OneHardie] audio.play() blocked:', err);
      setIsSpeaking(false);
    }
  }, []);

  const fetchAndPlay = useCallback(
    async (text: string): Promise<boolean> => {
      if (!text.trim()) return false;

      console.log('[OneHardie] fetchAndPlay — text length:', text.length);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      setIsSpeaking(true);

      try {
        const resp = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });

        console.log('[OneHardie] /api/tts status:', resp.status, resp.headers.get('Content-Type'));

        if (!resp.ok) {
          const body = await resp.text();
          console.error('[OneHardie] /api/tts error:', resp.status, body);
          if (resp.status === 503) setTtsAvailable(false);
          setIsSpeaking(false);
          return false;
        }

        const blob = await resp.blob();
        console.log('[OneHardie] blob received — size:', blob.size, 'type:', blob.type);

        if (blob.size === 0) {
          console.error('[OneHardie] empty audio blob received');
          setIsSpeaking(false);
          return false;
        }

        await playBlob(blob);
        return true;
      } catch (err) {
        console.error('[OneHardie] fetchAndPlay error:', err);
        setIsSpeaking(false);
        return false;
      }
    },
    [playBlob],
  );

  // Called from a button onClick — satisfies browser user-gesture requirement
  // for audio playback. Plays the greeting immediately.
  const enableVoice = useCallback(async () => {
    console.log('[OneHardie] enableVoice — setting audioUnlocked = true');
    audioUnlockedRef.current = true;
    setAudioUnlocked(true);

    if (!ttsAvailable) {
      console.warn('[OneHardie] TTS not available (no API key)');
      return;
    }

    await fetchAndPlay(GREETING);
  }, [ttsAvailable, fetchAndPlay]);

  // Called from onFinish — reads from ref so it always sees the current value
  // even if the callback was captured before the user clicked Enable Voice.
  const speakText = useCallback(
    async (text: string) => {
      if (!audioUnlockedRef.current) {
        console.log('[OneHardie] speakText skipped — audio not yet unlocked');
        return;
      }
      if (!ttsAvailable) return;
      await fetchAndPlay(text);
    },
    [ttsAvailable, fetchAndPlay],
  );

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
    onError: (err) => {
      console.error('[OneHardie] chat error:', err);
    },
  });

  return {
    ...chat,
    isSpeaking,
    ttsAvailable,
    audioUnlocked,
    enableVoice,
    stopSpeaking,
  };
}
