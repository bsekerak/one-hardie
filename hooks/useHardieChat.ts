'use client';

import { useChat } from 'ai/react';
import { useCallback, useEffect, useRef, useState } from 'react';

const GREETING =
  "Welcome to One Hardie. I'm your Exterior Concierge — here to help you design a complete exterior that looks beautiful and performs better for decades. Whether you're thinking about new siding, a stunning deck, or a covered outdoor room you can use year-round, let's figure out what's right for your home. Where would you like to start?";

export function useHardieChat() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsAvailable, setTtsAvailable] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const greetedRef = useRef(false);

  const speakText = useCallback(
    async (text: string) => {
      if (!ttsAvailable || !text.trim()) return;

      try {
        setIsSpeaking(true);

        // Stop any currently playing audio
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

        const blob = await resp.blob();
        const url = URL.createObjectURL(blob);
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
      } catch {
        setIsSpeaking(false);
      }
    },
    [ttsAvailable],
  );

  const stopSpeaking = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  const chat = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: 'greeting',
        role: 'assistant',
        content: GREETING,
      },
    ],
    onFinish: async (message) => {
      if (message.role === 'assistant' && message.content) {
        await speakText(message.content);
      }
    },
  });

  // Speak the greeting once on mount
  useEffect(() => {
    if (greetedRef.current) return;
    greetedRef.current = true;
    const timer = setTimeout(() => speakText(GREETING), 600);
    return () => clearTimeout(timer);
  }, [speakText]);

  return {
    ...chat,
    isSpeaking,
    ttsAvailable,
    speakText,
    stopSpeaking,
  };
}
