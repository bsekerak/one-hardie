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
  append: (message: Message | CreateMessage, options?: ChatRequestOptions) => Promise<string | null | undefined>;
}

const QUICK_PROMPTS = [
  'I need new siding for a craftsman home',
  'Show me decking options under $$$',
  'What is a StruXure pergola?',
  'Help me match siding and deck colors',
];

export function ChatPanel({ messages, input, handleInputChange, handleSubmit, isLoading, append }: ChatPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4" style={{ background: '#181818' }}>
        {messages.map((m) => <ChatMessage key={m.id} message={m} />)}

        {isLoading && (
          <div className="flex items-start">
            <div className="rounded-2xl rounded-bl-sm px-4 py-3" style={{ background: '#222', border: '1px solid #2C2A28' }}>
              <ThinkingDots />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick-prompt chips */}
      {messages.filter((m) => m.role === 'user').length === 0 && (
        <div className="px-5 pb-3 pt-3 flex gap-2 flex-wrap" style={{ borderTop: '1px solid #2C2A28', background: '#181818' }}>
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => append({ role: 'user', content: p })}
              disabled={isLoading}
              className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors disabled:opacity-40"
              style={{ border: '1px solid rgba(196,154,60,0.3)', color: '#C49A3C' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(196,154,60,0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        onVoiceResult={(text) => append({ role: 'user', content: text })}
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
          className="w-1.5 h-1.5 rounded-full animate-bounce"
          style={{ background: '#C49A3C', opacity: 0.6, animationDelay: `${d}s` }}
        />
      ))}
    </div>
  );
}
