'use client';

import { useHardieChat } from '@/hooks/useHardieChat';
import { AnimatedAvatar } from '@/components/avatar/AnimatedAvatar';
import { ChatPanel } from '@/components/chat/ChatPanel';
import { Logo } from '@/components/ui/Logo';
import { BrandBadges } from '@/components/ui/BrandBadge';

const BRAND_ICONS = [
  {
    label: 'SIDING · TRIM · SOFFIT',
    name: 'Hardie®',
    color: '#003B8E',
    bg: '#EBF0F9',
    desc: "#1 brand of siding in North America",
  },
  {
    label: 'PVC TRIM · MOULDINGS',
    name: 'AZEK Exteriors®',
    color: '#2D6A2D',
    bg: '#EBF5EB',
    desc: 'Rot-proof, paint-perfect PVC trim',
  },
  {
    label: 'DECKING · RAILING · LIGHTING',
    name: 'TimberTech®',
    color: '#7A3B10',
    bg: '#F7EDE5',
    desc: 'No staining, sealing, or painting — ever',
  },
  {
    label: 'PERGOLAS · CABANAS',
    name: 'StruXure®',
    color: '#4A2D7A',
    bg: '#F0EAFA',
    desc: 'Motorized outdoor rooms for year-round living',
  },
];

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, isSpeaking, ttsAvailable, append } =
    useHardieChat();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white">

      {/* ── Top nav — matches JH site style ── */}
      <header className="flex items-center justify-between px-6 py-3.5 border-b border-brand-border bg-white flex-shrink-0 shadow-sm">
        <Logo />
        <BrandBadges />
        <div className="hidden lg:flex items-center gap-1">
          <span
            className={`w-2 h-2 rounded-full flex-shrink-0 ${
              isSpeaking ? 'bg-brand-green animate-pulse' : isLoading ? 'bg-blue-400 animate-pulse' : 'bg-brand-green'
            }`}
          />
          <span className="text-brand-faint text-xs ml-1">
            {isSpeaking ? 'Speaking…' : isLoading ? 'Thinking…' : 'Ready'}
          </span>
          {!ttsAvailable && (
            <span className="ml-3 text-[10px] text-brand-faint border border-brand-border rounded px-1.5 py-0.5">
              Voice off
            </span>
          )}
        </div>
      </header>

      {/* ── Hero strip — "The Home of Resilient Beauty™" ── */}
      <div
        className="flex-shrink-0 px-6 py-5 flex items-center justify-between gap-4"
        style={{
          background: 'linear-gradient(135deg, #1B4D1B 0%, #2D6A2D 50%, #3A7A3A 100%)',
        }}
      >
        <div>
          <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
            One Hardie
          </p>
          <h1 className="text-white font-bold text-lg sm:text-xl leading-tight">
            The Home of Resilient Beauty™
          </h1>
          <p className="text-white/70 text-xs mt-1 hidden sm:block">
            Four brands. One complete exterior. Designed with you.
          </p>
        </div>

        {/* Brand pills inside hero */}
        <div className="hidden md:flex items-center gap-2 flex-wrap justify-end">
          {BRAND_ICONS.map((b) => (
            <span
              key={b.name}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
            >
              {b.name}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main two-panel layout ── */}
      <main className="flex flex-1 overflow-hidden min-h-0">

        {/* Left: Avatar + brand cards */}
        <div className="hidden md:flex flex-col w-[320px] lg:w-[380px] flex-shrink-0 border-r border-brand-border bg-brand-bg-soft overflow-y-auto">

          {/* Avatar card */}
          <div className="flex flex-col items-center px-6 pt-8 pb-6 border-b border-brand-border">
            <AnimatedAvatar isSpeaking={isSpeaking} isThinking={isLoading} size="md" />
            <div className="text-center mt-4">
              <p className="text-brand-text font-semibold">Hardie</p>
              <p className="text-brand-muted text-xs mt-0.5">Your Exterior Concierge</p>
            </div>
            <div
              className={`mt-3 flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium ${
                isSpeaking
                  ? 'bg-brand-green-lt text-brand-green'
                  : isLoading
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-brand-green-lt text-brand-green'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isSpeaking || !isLoading ? 'bg-brand-green' : 'bg-blue-400'} ${(isSpeaking || isLoading) ? 'animate-pulse' : ''}`} />
              {isSpeaking ? 'Speaking…' : isLoading ? 'Thinking…' : 'Ready to help'}
            </div>
          </div>

          {/* Brand reference cards */}
          <div className="px-4 py-4 space-y-2">
            <p className="text-brand-faint text-[10px] uppercase tracking-widest font-semibold px-1 mb-3">
              Our Brands
            </p>
            {BRAND_ICONS.map((b) => (
              <div
                key={b.name}
                className="rounded-xl border border-brand-border bg-white p-3.5 shadow-card hover:border-brand-border/80 transition-colors"
              >
                <p
                  className="text-[9px] font-bold uppercase tracking-widest"
                  style={{ color: b.color }}
                >
                  {b.label}
                </p>
                <p className="text-brand-text font-semibold text-sm mt-0.5">{b.name}</p>
                <p className="text-brand-muted text-xs mt-0.5 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Chat */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Mobile avatar strip */}
          <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-brand-border bg-brand-bg-soft">
            <AnimatedAvatar isSpeaking={isSpeaking} isThinking={isLoading} size="sm" />
            <div>
              <p className="text-brand-text text-sm font-semibold">Hardie</p>
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
