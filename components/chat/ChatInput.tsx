'use client';

import { type FormEvent, useRef } from 'react';
import { Mic, MicOff, Send, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { useSpeechInput } from '@/hooks/useSpeechInput';

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  onVoiceResult?: (text: string) => void;
}

export function ChatInput({ input, handleInputChange, handleSubmit, isLoading, onVoiceResult }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isListening, isSupported, startListening, stopListening } = useSpeechInput(
    (transcript) => onVoiceResult?.(transcript),
  );

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
    }
  }

  function onInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    handleInputChange(e);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 px-4 py-3"
      style={{ borderTop: '1px solid #2C2A28', background: '#111111' }}
    >
      {isSupported !== false && (
        <button
          type="button"
          onClick={isListening ? stopListening : startListening}
          className={clsx(
            'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors border',
            isListening ? 'border-red-500/40 text-red-400 animate-pulse' : 'text-[#6B5E52] hover:text-[#C49A3C]',
          )}
          style={isListening ? { background: 'rgba(239,68,68,0.1)' } : { background: '#1C1C1C', borderColor: '#2C2A28' }}
          aria-label={isListening ? 'Stop' : 'Voice input'}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>
      )}

      <div className="flex-1">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={onInput}
          onKeyDown={onKeyDown}
          placeholder={isListening ? 'Listening…' : 'Ask about siding, decking, pergolas…'}
          rows={1}
          disabled={isLoading}
          className="w-full resize-none rounded-xl px-4 py-2.5 text-sm leading-relaxed disabled:opacity-50 transition-all focus:outline-none"
          style={{
            background: '#1C1C1C',
            border: '1px solid #2C2A28',
            color: '#F5F0E8',
            minHeight: 42,
            maxHeight: 120,
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#C49A3C')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#2C2A28')}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: '#C49A3C', color: '#111111' }}
        aria-label="Send"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
      </button>
    </form>
  );
}
