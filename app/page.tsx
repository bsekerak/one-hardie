'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Shield, Zap, House, ExternalLink, CheckCircle, Volume2, Play } from 'lucide-react';
import { useHardieChat } from '@/hooks/useHardieChat';
import { AnimatedAvatar } from '@/components/avatar/AnimatedAvatar';
import { ChatPanel } from '@/components/chat/ChatPanel';

const HERO_IMAGE =
  'https://images.ctfassets.net/dzi2asncd44t/4y9hKZlxTKRM15rBuD4QT2/b3e5edfa5d1dc606e6ab9ea83cf2116a/HORB2602_OneHardie_Dealer-Channel_BeautyImagery_3__1__1_.jpg';

const BRANDS = [
  {
    label: 'SIDING | TRIM | SOFFIT',
    name: 'Hardie® Products',
    color: '#003B8E', bg: '#EBF0F9', border: '#BDD0EF',
    desc: 'Hardie® is the #1 brand of siding in North America*, delivering durable, innovative exterior solutions that empower homeowners and professionals with premium performance and design.',
    url: 'https://www.jameshardie.com/products',
  },
  {
    label: 'DECKING | RAILING | LIGHTING | ACCESSORIES',
    name: 'TimberTech®',
    color: '#7A3B10', bg: '#F7EDE5', border: '#E8C9A8',
    desc: 'Setting the standard for premium decking, TimberTech® offers sustainable, low-maintenance PVC and composite decking and outdoor living products with unmatched aesthetics and technology.',
    url: 'https://www.timbertech.com',
  },
  {
    label: 'SIDING | TRIM',
    name: 'AZEK Exteriors®',
    color: '#2D6A2D', bg: '#EBF5EB', border: '#A8D5A8',
    desc: 'Known for beautiful trim, siding, and more, AZEK provides a wide range of premium PVC exterior building solutions that are trusted for durability, flexibility, and superior quality.',
    url: 'https://www.azekexteriors.com',
  },
  {
    label: 'PERGOLAS | CABANAS',
    name: 'StruXure®',
    color: '#4A2D7A', bg: '#F0EAFA', border: '#C8AEE8',
    desc: 'The leader in customizable, automated outdoor living systems, StruXure® redefines outdoor spaces with innovative pergola solutions that blur the lines between indoors and out.',
    url: 'https://struxure.com',
  },
];

const VALUE_PROPS = [
  { icon: Shield,      heading: 'Beauty that lasts',        body: 'Engineered to resist weather, moisture, pests, fire, fading, and wear — without compromising the look you love.' },
  { icon: Zap,         heading: 'Less upkeep, more living', body: 'Products that resist fading, rotting, and warping — helping homeowners and contractors deliver results that last.' },
  { icon: House,       heading: 'The whole home, covered',  body: 'From siding and trim to decking, railing, and pergolas, all our products work together for a cohesive exterior.' },
  { icon: CheckCircle, heading: 'The brands pros count on', body: 'For decades, contractors and homeowners have relied on our brands for premium design and long-lasting performance.' },
];

/* ─── Shared nav ─── */
function TopNav() {
  return (
    <header className="flex-shrink-0 bg-white border-b border-gray-200">
      <div className="px-4 md:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#2D6A2D] rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-xs">JH</span>
          </div>
          <span className="font-bold text-gray-900 text-base tracking-tight">
            JAMES <span className="text-[#2D6A2D]">HARDIE</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {['Our brands', 'Products', 'Design tools', 'Find a pro', 'About', 'Investor Relations'].map((item) => (
            <button key={item} className="text-sm text-gray-500 hover:text-[#2D6A2D] font-medium transition-colors whitespace-nowrap">
              {item}
            </button>
          ))}
        </nav>
        <button className="hidden sm:block border border-gray-900 text-gray-900 text-sm font-semibold px-4 py-2 rounded hover:bg-gray-900 hover:text-white transition-colors whitespace-nowrap">
          Get a quote
        </button>
      </div>
    </header>
  );
}

/* ─── 1. CONCIERGE ─── */
function ConciergeSection(props: ReturnType<typeof useHardieChat>) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, isSpeaking, ttsAvailable, audioUnlocked, enableVoice, append, debugLog } = props;
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  function handleStart() {
    setStarted(true);
    enableVoice();
  }

  // Scroll concierge into view when conversation starts so the hero below stays hidden
  useEffect(() => {
    if (started) {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [started]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#111111',
        // Fill the viewport once chat starts so the hero image below stays out of view
        minHeight: started ? 'calc(100dvh - 57px)' : undefined,
      }}
      className="flex flex-col"
    >
      {/* Section label */}
      <div className="px-4 md:px-8 pt-6 pb-0 max-w-7xl mx-auto w-full">
        <p className="text-[#C49A3C] text-[10px] font-bold uppercase tracking-widest">
          AI Exterior Concierge · One Hardie
        </p>
      </div>

      {!started ? (
        /* ── Pre-start ── */
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 px-4 md:px-8 py-10 md:py-14 max-w-5xl mx-auto w-full">
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            <AnimatedAvatar isSpeaking={false} isThinking={false} size="lg" />
            <div className="text-center">
              <p className="text-white font-semibold text-lg">Hardie</p>
              <p style={{ color: '#A89880' }} className="text-sm">Exterior Concierge</p>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl leading-snug mb-4">
              Design your perfect<br />
              <span style={{ color: '#C49A3C' }}>whole-home exterior.</span>
            </h2>
            <p style={{ color: '#A89880' }} className="text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-lg mx-auto md:mx-0">
              Meet Hardie — your personal exterior design consultant. She'll ask a few questions
              about your home, then recommend siding, trim, decking, and outdoor living products
              from the James Hardie family of brands — all tailored to your style and budget.
            </p>

            <button
              onClick={handleStart}
              className="inline-flex items-center gap-3 px-6 md:px-7 py-3.5 md:py-4 rounded-xl font-semibold text-sm md:text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #C49A3C, #E8C56A)', color: '#111111' }}
            >
              <Play className="w-4 h-4 md:w-5 md:h-5 fill-current" />
              Start conversation with Hardie
            </button>

            {ttsAvailable ? (
              <p style={{ color: '#6B5E52' }} className="text-xs mt-3 flex items-center gap-1.5 justify-center md:justify-start">
                <Volume2 className="w-3.5 h-3.5" style={{ color: '#C49A3C' }} />
                Voice-enabled — Hardie will speak her responses aloud
              </p>
            ) : (
              <p style={{ color: '#6B5E52' }} className="text-xs mt-3 text-center md:text-left">
                Text-only mode — add <code className="text-[#C49A3C]">ELEVENLABS_API_KEY</code> to enable voice
              </p>
            )}

            <div className="flex flex-wrap gap-2 mt-5 justify-center md:justify-start">
              {['Hardie®', 'AZEK Exteriors®', 'TimberTech®', 'StruXure®'].map((b) => (
                <span
                  key={b}
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(196,154,60,0.12)', color: '#C49A3C', border: '1px solid rgba(196,154,60,0.2)' }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ── Post-start ── */
        <div className="flex flex-col flex-1" style={{ borderTop: '1px solid #2C2A28' }}>

          {/* Mobile: compact top bar */}
          <div
            className="flex md:hidden items-center gap-3 px-4 py-3"
            style={{ borderBottom: '1px solid #2C2A28' }}
          >
            <AnimatedAvatar isSpeaking={isSpeaking} isThinking={isLoading} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-none">Hardie</p>
              <p style={{ color: '#A89880' }} className="text-[11px] mt-0.5">Exterior Concierge</p>
            </div>
            <div
              className="inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-semibold flex-shrink-0"
              style={
                isSpeaking
                  ? { background: 'rgba(196,154,60,0.15)', color: '#C49A3C' }
                  : isLoading
                  ? { background: 'rgba(59,130,246,0.1)', color: '#60A5FA' }
                  : { background: 'rgba(45,106,45,0.15)', color: '#4ADE80' }
              }
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${(isSpeaking || isLoading) ? 'animate-pulse' : ''}`}
                style={{ background: isSpeaking ? '#C49A3C' : isLoading ? '#60A5FA' : '#4ADE80' }}
              />
              {isSpeaking ? 'Speaking…' : isLoading ? 'Thinking…' : 'Ready'}
            </div>
          </div>

          {/* Desktop: sidebar + chat */}
          <div className="hidden md:flex flex-1 max-w-7xl mx-auto w-full">
            {/* Avatar sidebar */}
            <div
              className="w-56 lg:w-64 flex-shrink-0 flex flex-col items-center justify-start px-6 py-8 gap-4"
              style={{ borderRight: '1px solid #2C2A28' }}
            >
              <AnimatedAvatar isSpeaking={isSpeaking} isThinking={isLoading} size="md" />
              <div className="text-center mt-2">
                <p className="text-white font-semibold text-sm">Hardie</p>
                <p style={{ color: '#A89880' }} className="text-xs mt-0.5">Exterior Concierge</p>
                <div
                  className="mt-2 inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-semibold"
                  style={
                    isSpeaking
                      ? { background: 'rgba(196,154,60,0.15)', color: '#C49A3C' }
                      : isLoading
                      ? { background: 'rgba(59,130,246,0.1)', color: '#60A5FA' }
                      : { background: 'rgba(45,106,45,0.15)', color: '#4ADE80' }
                  }
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${(isSpeaking || isLoading) ? 'animate-pulse' : ''}`}
                    style={{ background: isSpeaking ? '#C49A3C' : isLoading ? '#60A5FA' : '#4ADE80' }}
                  />
                  {isSpeaking ? 'Speaking…' : isLoading ? 'Thinking…' : 'Ready'}
                </div>
                {audioUnlocked && (
                  <p
                    style={{ color: ttsAvailable ? '#6B5E52' : '#EF4444' }}
                    className="text-[10px] mt-2 flex items-center gap-1 justify-center"
                  >
                    <Volume2 className="w-3 h-3" style={{ color: ttsAvailable ? '#C49A3C' : '#EF4444' }} />
                    {ttsAvailable ? 'Voice on' : 'Voice unavailable — check API key'}
                  </p>
                )}
              </div>
            </div>

            {/* Chat panel — desktop */}
            <div className="flex-1 flex flex-col" style={{ background: '#181818' }}>
              <ChatPanel
                messages={messages}
                input={input}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
                append={append}
              />
            </div>
          </div>

          {/* Chat panel — mobile (full width, fills remaining space) */}
          <div className="flex md:hidden flex-1 flex-col" style={{ background: '#181818' }}>
            <ChatPanel
              messages={messages}
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              append={append}
            />
          </div>
        </div>
      )}

      {/* TTS DEBUG PANEL */}
      {started && debugLog.length > 0 && (
        <div className="px-4 md:px-8 pb-4 max-w-7xl mx-auto w-full">
          <div className="rounded-xl p-3 font-mono text-[11px] leading-relaxed" style={{ background: '#0A0A0A', border: '1px solid #2C2A28' }}>
            <p className="font-bold mb-1.5" style={{ color: '#C49A3C' }}>🔧 TTS DEBUG</p>
            {debugLog.map((line, i) => (
              <p key={i} style={{ color: line.includes('❌') ? '#EF4444' : line.includes('✅') ? '#4ADE80' : line.includes('⚠️') ? '#FBBF24' : '#A89880' }}>
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/* ─── 2. Hero image ─── */
function HeroSection() {
  return (
    <section className="relative flex-shrink-0 h-[420px] md:h-[500px] lg:h-[580px] overflow-hidden">
      {/* Show from top so baked-in logo/text isn't cropped */}
      <Image src={HERO_IMAGE} alt="Home exterior" fill sizes="100vw" className="object-cover object-top" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

      {/* JH logo overlay — visible regardless of image crop */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 flex items-center gap-2">
        <div className="w-9 h-9 bg-[#2D6A2D] rounded-full flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xs">JH</span>
        </div>
        <span className="text-white font-bold text-sm drop-shadow-md tracking-wide">JamesHardie™</span>
      </div>

      <div className="relative z-10 h-full flex items-end justify-end p-4 md:p-10">
        <div className="flex gap-2 md:gap-3">
          <button className="bg-[#2D6A2D] text-white font-semibold text-xs md:text-sm px-4 md:px-5 py-2 md:py-2.5 rounded hover:bg-[#1B4D1B] transition-colors">Get a quote</button>
          <button className="bg-gray-900/90 text-white font-semibold text-xs md:text-sm px-4 md:px-5 py-2 md:py-2.5 rounded hover:bg-gray-700 transition-colors">Explore our brands</button>
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Portfolio intro + value props ─── */
function PortfolioIntro() {
  return (
    <section className="flex-shrink-0 px-4 md:px-8 py-8 md:py-10 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
        <div className="md:col-span-1">
          <p className="text-[#2D6A2D] text-xs font-bold uppercase tracking-widest mb-3">One portfolio. One vision.</p>
          <p className="text-gray-800 text-sm md:text-base leading-relaxed">
            From siding and trim to decking, railing, and more, James Hardie brings together trusted materials that give homeowners more ways to bring their vision to life. Built for the realities of where and how people live, our brands pair authentic style with performance that helps homes stand strong through moisture, sun, pests, fire, and extreme weather.
          </p>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {VALUE_PROPS.map(({ icon: Icon, heading, body }) => (
            <div key={heading}>
              <div className="w-10 h-10 rounded-lg bg-[#EBF5EB] flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-[#2D6A2D]" />
              </div>
              <h3 className="text-gray-900 font-semibold text-sm mb-1">{heading}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 4. Brand cards ─── */
function BrandCards() {
  return (
    <section className="flex-shrink-0 px-4 md:px-8 py-8 md:py-10 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-gray-900 font-bold text-xl md:text-2xl mb-1">Explore our industry-leading brands</h2>
        <p className="text-gray-500 text-sm mb-5 md:mb-6">Together, our brands give homeowners and professionals more ways to create a beautiful, high-performing exterior.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BRANDS.map((b) => (
            <div key={b.name} className="rounded-xl border bg-white p-4 md:p-5 hover:shadow-md transition-shadow" style={{ borderColor: b.border }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: b.color }}>{b.label}</p>
              <h3 className="font-bold text-base mb-2" style={{ color: b.color }}>{b.name}</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">{b.desc}</p>
              <a href={b.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold hover:underline" style={{ color: b.color }}>
                Learn more <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-[10px] mt-5">*Based on Freedonia Group, Global Siding (Cladding) Report (2025).</p>
      </div>
    </section>
  );
}

/* ─── 5. Footer ─── */
function Footer() {
  return (
    <footer className="flex-shrink-0 bg-[#1A1A1A] text-white/60 px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#2D6A2D] rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">JH</span>
            </div>
            <span className="text-white font-bold text-sm tracking-tight">JAMES HARDIE</span>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-5 text-xs">
            {['Our brands', 'Products', 'Design tools', 'Find a pro', 'About'].map((l) => (
              <button key={l} className="hover:text-white transition-colors">{l}</button>
            ))}
          </div>
        </div>
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px]">
          <p>© 2026 James Hardie Building Products Inc. All rights reserved. ™ or ® denote trademarks of James Hardie Technology Ltd.</p>
          <div className="flex gap-4">
            <a href="https://www.jameshardie.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white">Privacy Policy</a>
            <a href="https://www.jameshardie.com/legal/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Root ─── */
export default function Home() {
  const chatProps = useHardieChat();

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-y-auto">
      <TopNav />
      <ConciergeSection {...chatProps} />
      <HeroSection />
      <PortfolioIntro />
      <BrandCards />
      <Footer />
    </div>
  );
}
