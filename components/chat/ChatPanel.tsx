'use client';

import { type FormEvent, useEffect, useRef } from 'react';
import type { Message, CreateMessage, ChatRequestOptions } from 'ai';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

interface ChatPanelProps {
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  append: (
    message: Message | CreateMessage,
    options?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
}

const QUICK_PROMPTS = [
  'I need new siding for a craftsman home',
  'Show me decking options under $$$',
  "What is a StruXure pergola?",
  'Help me match siding + deck colors',
];

export function ChatPanel({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  append,
}: ChatPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function onVoiceResult(text: string) {
    append({ role: 'user', content: text });
  }

  function onQuickPrompt(prompt: string) {
    append({ role: 'user', content: prompt });
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Messages scroll area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}

        {/* Streaming indicator */}
        {isLoading && (
          <div className="flex items-start">
            <div className="bg-brand-surface2 border border-brand-border rounded-2xl rounded-bl-sm px-4 py-3">
              <ThinkingDots />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick-prompt chips — only before first user message */}
      {messages.filter((m) => m.role === 'user').length === 0 && (
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => onQuickPrompt(p)}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 rounded-full border border-brand-gold/25 text-brand-muted hover:text-brand-gold hover:border-brand-gold/50 transition-colors disabled:opacity-40"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        onVoiceResult={onVoiceResult}
      />
    </div>
  );
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 h-4">
      {[0, 0.2, 0.4].map((d) => (
        <span
          key={d}
          className="w-1.5 h-1.5 rounded-full bg-brand-gold/50 animate-bounce"
          style={{ animationDelay: `${d}s` }}
        />
      ))}
    </div>
  );
}
