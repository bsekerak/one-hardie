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
      className="flex items-end gap-2 px-4 py-3 border-t border-brand-border bg-white"
    >
      {isSupported !== false && (
        <button
          type="button"
          onClick={isListening ? stopListening : startListening}
          className={clsx(
            'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors border',
            isListening
              ? 'bg-red-50 text-red-500 border-red-200 animate-pulse'
              : 'bg-brand-surface text-brand-muted hover:text-brand-green border-brand-border',
          )}
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
          className={clsx(
            'w-full resize-none rounded-xl px-4 py-2.5 text-sm',
            'bg-brand-bg-soft border border-brand-border',
            'text-brand-text placeholder:text-brand-faint',
            'focus:outline-none focus:border-brand-green focus:shadow-input',
            'disabled:opacity-50 transition-all leading-relaxed',
          )}
          style={{ minHeight: 42, maxHeight: 120 }}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className={clsx(
          'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center',
          'bg-brand-green text-white hover:bg-brand-green-dk',
          'disabled:opacity-40 disabled:cursor-not-allowed transition-colors',
        )}
        aria-label="Send"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
      </button>
    </form>
  );
}
