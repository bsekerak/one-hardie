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

export function ChatInput({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  onVoiceResult,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { isListening, isSupported, startListening, stopListening } =
    useSpeechInput((transcript) => {
      onVoiceResult?.(transcript);
    });

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
      }
    }
  }

  // Auto-resize textarea
  function onInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    handleInputChange(e);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 px-4 py-3 border-t border-brand-border bg-brand-surface"
    >
      {/* Mic button */}
      {isSupported !== false && (
        <button
          type="button"
          onClick={isListening ? stopListening : startListening}
          className={clsx(
            'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
            isListening
              ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
              : 'bg-brand-surface2 text-brand-muted hover:text-brand-gold border border-brand-border',
          )}
          aria-label={isListening ? 'Stop listening' : 'Start voice input'}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>
      )}

      {/* Text input */}
      <div className="flex-1 relative">
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
            'bg-brand-surface2 border border-brand-border',
            'text-brand-text placeholder:text-brand-faint',
            'focus:outline-none focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/20',
            'disabled:opacity-50 transition-colors',
            'leading-relaxed',
          )}
          style={{ minHeight: 42, maxHeight: 120 }}
        />
      </div>

      {/* Send button */}
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className={clsx(
          'flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center',
          'bg-brand-gold text-brand-bg font-medium',
          'hover:bg-brand-gold-lt disabled:opacity-40 disabled:cursor-not-allowed',
          'transition-colors',
        )}
        aria-label="Send message"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Send className="w-4 h-4" />
        )}
      </button>
    </form>
  );
}
