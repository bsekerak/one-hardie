'use client';

import { useChat } from 'ai/react';
import { useCallback, useRef, useState } from 'react';

const GREETING =
  "Welcome to One Hardie. I'm Hardie, your Exterior Concierge — here to help you design a complete exterior that looks beautiful and performs better for decades. Whether you're thinking about new siding, a stunning deck, or a covered outdoor room you can use year-round, let's figure out what's right for your home. Where would you like to start?";

export function useHardieChat() {
  const [isSpeaking, setIsSpeaking]       = useState(false);
  const [ttsAvailable, setTtsAvailable]   = useState(true);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [debugLog, setDebugLog]           = useState<string[]>([]);

  // Refs so async callbacks always see current values — avoids stale closures
  const audioUnlockedRef  = useRef(false);
  const ttsAvailableRef   = useRef(true);   // mirrors ttsAvailable state
  const audioRef          = useRef<HTMLAudioElement | null>(null);

  const addDebug = useCallback((msg: string) => {
    const ts = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    console.log(`[OneHardie] ${msg}`);
    setDebugLog((prev) => [...prev.slice(-30), `${ts}  ${msg}`]);
  }, []);

  const playBlob = useCallback(async (blob: Blob) => {
    const url   = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audioRef.current = audio;

    audio.onended = () => {
      setIsSpeaking(false);
      URL.revokeObjectURL(url);
      audioRef.current = null;
      addDebug('✅ Audio finished playing');
    };
    audio.onerror = (e) => {
      addDebug(`❌ Audio element error: ${JSON.stringify(e)}`);
      setIsSpeaking(false);
      URL.revokeObjectURL(url);
      audioRef.current = null;
    };

    try {
      addDebug(`▶️ Calling audio.play() — blob: ${blob.size} bytes, type: ${blob.type}`);
      await audio.play();
      addDebug('✅ audio.play() resolved — audio is playing');
    } catch (err) {
      addDebug(`❌ audio.play() threw: ${(err as Error).message}`);
      setIsSpeaking(false);
    }
  }, [addDebug]);

  const fetchAndPlay = useCallback(
    async (text: string): Promise<boolean> => {
      if (!text.trim()) return false;

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      setIsSpeaking(true);
      addDebug(`📡 Calling /api/tts — text length: ${text.length} chars`);

      try {
        const resp = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });

        addDebug(`📥 /api/tts responded: HTTP ${resp.status} | Content-Type: ${resp.headers.get('Content-Type') ?? 'none'}`);

        if (!resp.ok) {
          const body = await resp.text();
          addDebug(`❌ /api/tts error body: ${body.slice(0, 200)}`);
          if (resp.status === 503) {
            setTtsAvailable(false);
            ttsAvailableRef.current = false;
          }
          setIsSpeaking(false);
          return false;
        }

        const blob = await resp.blob();
        addDebug(`📦 Blob received — size: ${blob.size} bytes, type: ${blob.type}`);

        if (blob.size === 0) {
          addDebug('❌ Empty blob — 0 bytes received');
          setIsSpeaking(false);
          return false;
        }

        await playBlob(blob);
        return true;
      } catch (err) {
        addDebug(`❌ fetchAndPlay threw: ${(err as Error).message}`);
        setIsSpeaking(false);
        return false;
      }
    },
    [playBlob, addDebug],
  );

  // Called directly from button onClick — satisfies browser autoplay requirement
  const enableVoice = useCallback(async () => {
    addDebug('🔓 enableVoice() called — unlocking audio');
    audioUnlockedRef.current = true;
    setAudioUnlocked(true);

    if (!ttsAvailableRef.current) {
      addDebug('⚠️ ttsAvailable=false — skipping TTS (no API key?)');
      return;
    }

    addDebug('🎙️ Playing greeting via TTS...');
    await fetchAndPlay(GREETING);
  }, [fetchAndPlay, addDebug]);

  // speakText uses refs (not state) so it's always current inside onFinish's stale closure
  const speakTextRef = useRef<(text: string) => Promise<void>>();
  speakTextRef.current = async (text: string) => {
    if (!audioUnlockedRef.current) {
      addDebug('⏭️ speakText skipped — audio not yet unlocked');
      return;
    }
    if (!ttsAvailableRef.current) {
      addDebug('⏭️ speakText skipped — TTS unavailable');
      return;
    }
    addDebug('🎙️ speakText() — speaking assistant response');
    await fetchAndPlay(text);
  };

  const stopSpeaking = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
    setIsSpeaking(false);
    addDebug('⏹️ stopSpeaking() called');
  }, [addDebug]);

  const chat = useChat({
    api: '/api/chat',
    initialMessages: [{ id: 'greeting', role: 'assistant', content: GREETING }],
    onFinish: async (message) => {
      if (message.role === 'assistant' && message.content) {
        addDebug(`💬 onFinish fired — role: ${message.role}, content length: ${message.content.length}`);
        // Call via ref so we always get the current function, not a stale closure
        await speakTextRef.current?.(message.content);
      }
    },
    onError: (err) => {
      addDebug(`❌ Chat API error: ${err.message}`);
    },
  });

  return {
    ...chat,
    isSpeaking,
    ttsAvailable,
    audioUnlocked,
    enableVoice,
    stopSpeaking,
    debugLog,
  };
}
