'use client';

import { useHardieChat } from '@/hooks/useHardieChat';
import { AnimatedAvatar } from '@/components/avatar/AnimatedAvatar';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { Logo } from '@/components/ui/Logo';
import { BrandBadges } from '@/components/ui/BrandBadge';

export default function Home() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    isSpeaking,
    ttsAvailable,
    append,
  } = useHardieChat();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-brand-bg">
      {/* ── Header ── */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-brand-border flex-shrink-0">
        <Logo />
        <BrandBadges />
      </header>

      {/* ── Main content ── */}
      <main className="flex flex-1 overflow-hidden">
        {/* Avatar column — hidden on mobile, shown md+ */}
        <div className="hidden md:flex flex-col items-center justify-center w-[360px] lg:w-[420px] xl:w-[480px] flex-shrink-0 border-r border-brand-border bg-brand-surface px-8 py-10 gap-6">
          <AnimatedAvatar isSpeaking={isSpeaking} isThinking={isLoading} />

          <div className="text-center">
            <p className="text-brand-text font-semibold text-lg">Hardie</p>
            <p className="text-brand-muted text-sm mt-0.5">Exterior Concierge</p>
          </div>

          {/* Status pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-surface2 border border-brand-border text-xs text-brand-muted">
            <span
              className={`w-2 h-2 rounded-full ${
                isSpeaking
                  ? 'bg-brand-gold animate-pulse'
                  : isLoading
                  ? 'bg-blue-400 animate-pulse'
                  : 'bg-green-500'
              }`}
            />
            {isSpeaking ? 'Speaking…' : isLoading ? 'Thinking…' : 'Ready'}
          </div>

          {!ttsAvailable && (
            <p className="text-brand-faint text-xs text-center max-w-[200px]">
              Voice unavailable — add{' '}
              <code className="text-brand-gold">ELEVENLABS_API_KEY</code> to
              enable audio.
            </p>
          )}
        </div>

        {/* Mobile avatar strip */}
        <div className="md:hidden w-full flex-shrink-0" />

        {/* Chat panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile avatar row */}
          <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-brand-border bg-brand-surface">
            <AnimatedAvatar isSpeaking={isSpeaking} isThinking={isLoading} size="sm" />
            <div>
              <p className="text-brand-text text-sm font-medium">Hardie</p>
              <p className="text-brand-muted text-xs">
                {isSpeaking ? 'Speaking…' : isLoading ? 'Thinking…' : 'Exterior Concierge'}
              </p>
            </div>
          </div>

          <ChatPanel
            messages={messages}
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            append={append}
          />
        </div>
      </main>
    </div>
  );
}
