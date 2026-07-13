'use client';

import Image from 'next/image';
import { Shield, Zap, House, ChevronRight, ExternalLink, CheckCircle } from 'lucide-react';
import { useHardieChat } from '@/hooks/useHardieChat';
import { AnimatedAvatar } from '@/components/avatar/AnimatedAvatar';
import { ChatPanel } from '@/components/chat/ChatPanel';

const HERO_IMAGE =
  'https://images.ctfassets.net/dzi2asncd44t/4y9hKZlxTKRM15rBuD4QT2/b3e5edfa5d1dc606e6ab9ea83cf2116a/HORB2602_OneHardie_Dealer-Channel_BeautyImagery_3__1__1_.jpg';

/* ─── Brand data ─── */
const BRANDS = [
  {
    label: 'SIDING | TRIM | SOFFIT',
    name: 'Hardie® Products',
    color: '#003B8E',
    bg: '#EBF0F9',
    border: '#BDD0EF',
    desc: 'Hardie® is the #1 brand of siding in North America*, delivering durable, innovative exterior solutions that empower homeowners and professionals with premium performance and design.',
    url: 'https://www.jameshardie.com/products',
  },
  {
    label: 'DECKING | RAILING | LIGHTING | ACCESSORIES',
    name: 'TimberTech®',
    color: '#7A3B10',
    bg: '#F7EDE5',
    border: '#E8C9A8',
    desc: 'Setting the standard for premium decking, TimberTech® offers sustainable, low-maintenance PVC and composite decking and outdoor living products with unmatched aesthetics and technology.',
    url: 'https://www.timbertech.com',
  },
  {
    label: 'SIDING | TRIM',
    name: 'AZEK Exteriors®',
    color: '#2D6A2D',
    bg: '#EBF5EB',
    border: '#A8D5A8',
    desc: 'Known for beautiful trim, siding, and more, AZEK provides a wide range of premium PVC exterior building solutions that are trusted for durability, flexibility, and superior quality.',
    url: 'https://www.azekexteriors.com',
  },
  {
    label: 'PERGOLAS | CABANAS',
    name: 'StruXure®',
    color: '#4A2D7A',
    bg: '#F0EAFA',
    border: '#C8AEE8',
    desc: 'The leader in customizable, automated outdoor living systems, StruXure® redefines outdoor spaces with innovative pergola solutions that blur the lines between indoors and out.',
    url: 'https://struxure.com',
  },
];

const VALUE_PROPS = [
  { icon: Shield,  heading: 'Beauty that lasts',        body: 'Engineered to resist weather, moisture, pests, fire, fading, and wear — without compromising the look you love.' },
  { icon: Zap,     heading: 'Less upkeep, more living',  body: 'Products that resist fading, rotting, and warping — helping homeowners and contractors deliver results that last.' },
  { icon: House,   heading: 'The whole home, covered',   body: 'From siding and trim to decking, railing, and pergolas, all our products work together for a cohesive exterior.' },
  { icon: CheckCircle, heading: 'The brands pros count on', body: 'For decades, contractors and homeowners have relied on our brands for premium design and long-lasting performance.' },
];

/* Product callout circles overlaid on hero image */
const CALLOUTS = [
  { label: 'AZEK® Trim',                    left: '36%', top: '54%' },
  { label: 'TimberTech® Decking & Railing', left: '52%', top: '64%' },
  { label: 'Hardie Plank',                  left: '72%', top: '28%' },
  { label: 'StruXure Pergola X',            left: '80%', top: '48%' },
];

/* ─── Nav ─── */
function TopNav() {
  return (
    <header className="flex-shrink-0 bg-white border-b border-gray-200 z-50">
      <div className="px-6 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-green rounded-sm flex items-center justify-center">
            <span className="text-white font-bold text-xs">JH</span>
          </div>
          <span className="font-bold text-brand-text text-base tracking-tight">
            JAMES <span className="text-brand-green">HARDIE</span>
          </span>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6">
          {['Our brands', 'Products', 'Design tools', 'Find a pro', 'About', 'Investor Relations'].map((item) => (
            <button key={item} className="text-sm text-brand-muted hover:text-brand-green font-medium transition-colors whitespace-nowrap">
              {item}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button className="hidden sm:block border border-brand-text text-brand-text text-sm font-semibold px-4 py-2 rounded hover:bg-brand-text hover:text-white transition-colors whitespace-nowrap">
          Get a quote
        </button>
      </div>
    </header>
  );
}

/* ─── Hero ─── */
function HeroSection() {
  return (
    <section className="relative flex-shrink-0 h-[520px] lg:h-[600px] overflow-hidden">
      {/* Background image */}
      <Image
        src={HERO_IMAGE}
        alt="Beautiful home exterior showcasing James Hardie brands"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Dark gradient — left side for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col justify-between p-6 lg:p-10">
        {/* Top: JH badge + headline */}
        <div className="max-w-md">
          {/* JH brand badge */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">JH</span>
            </div>
            <span className="text-white font-bold text-sm tracking-wide">JamesHardie™</span>
          </div>

          {/* Headline */}
          <h1 className="text-white font-bold text-4xl lg:text-5xl leading-tight drop-shadow-md">
            The home of<br />resilient beauty™
          </h1>

          {/* Brand logos row */}
          <div className="flex items-center gap-3 mt-5 flex-wrap">
            {[
              { name: 'Hardie',      color: '#E8490F' },
              { name: 'TimberTech',  color: '#D4A04A' },
              { name: 'AZEK',        color: '#6BB0D4' },
              { name: 'STRUXURE',    color: '#FFFFFF' },
            ].map((b, i, arr) => (
              <span key={b.name} className="flex items-center gap-3">
                <span className="font-bold text-sm" style={{ color: b.color }}>{b.name}</span>
                {i < arr.length - 1 && <span className="text-white/30">|</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom: CTAs */}
        <div className="flex gap-3 justify-end items-end">
          <button className="bg-brand-green text-white font-semibold text-sm px-5 py-2.5 rounded hover:bg-brand-green-dk transition-colors">
            Get a quote
          </button>
          <button className="bg-brand-text text-white font-semibold text-sm px-5 py-2.5 rounded hover:bg-gray-700 transition-colors">
            Explore our brands
          </button>
        </div>
      </div>

      {/* Product callout circles — hidden on mobile */}
      <div className="hidden lg:block">
        {CALLOUTS.map(({ label, left, top }) => (
          <ProductCallout key={label} label={label} left={left} top={top} />
        ))}
      </div>
    </section>
  );
}

function ProductCallout({ label, left, top }: { label: string; left: string; top: string }) {
  return (
    <div
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left, top }}
    >
      {/* Dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/80" />
      {/* Circle */}
      <div className="w-24 h-24 rounded-full border-2 border-white/75 bg-black/25 backdrop-blur-[2px] flex items-center justify-center">
        <span className="text-white text-[11px] font-semibold text-center leading-tight px-2 drop-shadow">
          {label}
        </span>
      </div>
    </div>
  );
}

/* ─── "One portfolio" intro strip ─── */
function PortfolioIntro() {
  return (
    <section className="flex-shrink-0 px-8 py-10 bg-white border-b border-brand-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left copy */}
        <div className="md:col-span-1">
          <p className="text-brand-green text-xs font-bold uppercase tracking-widest mb-3">
            One portfolio. One vision.
          </p>
          <p className="text-brand-text text-base leading-relaxed">
            From siding and trim to decking, railing, and more, James Hardie brings together
            trusted materials that give homeowners more ways to bring their vision to life. Built
            for the realities of where and how people live, our brands pair authentic style with
            performance that helps homes stand strong through moisture, sun, pests, fire, and
            extreme weather.
          </p>
        </div>

        {/* Right value props */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {VALUE_PROPS.map(({ icon: Icon, heading, body }) => (
            <div key={heading}>
              <div className="w-10 h-10 rounded-lg bg-brand-green-lt flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-brand-green" />
              </div>
              <h3 className="text-brand-text font-semibold text-sm mb-1">{heading}</h3>
              <p className="text-brand-muted text-xs leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Brand cards ─── */
function BrandCards() {
  return (
    <section className="flex-shrink-0 px-8 py-10 bg-brand-bg-soft border-b border-brand-border">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-brand-text font-bold text-2xl mb-1">
          Explore our industry-leading brands
        </h2>
        <p className="text-brand-muted text-sm mb-6">
          Together, our brands give homeowners and professionals more ways to create a beautiful,
          high-performing exterior—from the siding to the deck and beyond.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BRANDS.map((b) => (
            <div
              key={b.name}
              className="rounded-xl border bg-white p-5 hover:shadow-card transition-shadow"
              style={{ borderColor: b.border }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: b.color }}>
                {b.label}
              </p>
              <h3 className="font-bold text-base mb-2" style={{ color: b.color }}>{b.name}</h3>
              <p className="text-brand-muted text-xs leading-relaxed mb-4">{b.desc}</p>
              <a
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold hover:underline"
                style={{ color: b.color }}
              >
                Learn more <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
        <p className="text-brand-faint text-[10px] mt-5">
          *Based on Freedonia Group, Global Siding (Cladding) Report (2025).
        </p>
      </div>
    </section>
  );
}

/* ─── Chat section ─── */
function ChatSection(props: ReturnType<typeof useHardieChat>) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, isSpeaking, ttsAvailable, append } = props;

  return (
    <section className="flex-shrink-0 bg-white border-b border-brand-border">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="px-8 pt-10 pb-6">
          <p className="text-brand-green text-xs font-bold uppercase tracking-widest mb-2">
            AI Exterior Concierge
          </p>
          <h2 className="text-brand-text font-bold text-2xl mb-1">Design your exterior with Hardie</h2>
          <p className="text-brand-muted text-sm">
            Tell me about your home and I'll recommend products across all four brands — siding to deck to pergola.
          </p>
        </div>

        {/* Chat layout */}
        <div className="flex flex-col md:flex-row border-t border-brand-border">
          {/* Avatar column */}
          <div className="md:w-56 lg:w-64 flex-shrink-0 flex flex-col items-center justify-start px-6 py-8 gap-4 border-b md:border-b-0 md:border-r border-brand-border bg-brand-bg-soft">
            <AnimatedAvatar isSpeaking={isSpeaking} isThinking={isLoading} size="md" />
            <div className="text-center">
              <p className="text-brand-text font-semibold text-sm">Hardie</p>
              <p className="text-brand-muted text-xs mt-0.5">Your Exterior Concierge</p>
              <div className={`mt-2 inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                isSpeaking ? 'bg-brand-green-lt text-brand-green'
                : isLoading ? 'bg-blue-50 text-blue-600'
                : 'bg-brand-green-lt text-brand-green'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  isLoading && !isSpeaking ? 'bg-blue-400' : 'bg-brand-green'
                } ${(isSpeaking || isLoading) ? 'animate-pulse' : ''}`} />
                {isSpeaking ? 'Speaking…' : isLoading ? 'Thinking…' : 'Ready to help'}
              </div>
              {!ttsAvailable && (
                <p className="text-brand-faint text-[10px] mt-2 max-w-[140px] leading-relaxed">
                  Add <code className="text-brand-green">ELEVENLABS_API_KEY</code> for voice
                </p>
              )}
            </div>
          </div>

          {/* Chat panel */}
          <div className="flex-1 flex flex-col min-h-[420px] max-h-[560px] bg-white">
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
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="flex-shrink-0 bg-[#1A1A1A] text-white/60 px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-brand-green rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">JH</span>
            </div>
            <span className="text-white font-bold text-sm tracking-tight">JAMES HARDIE</span>
          </div>
          <div className="flex gap-5 text-xs">
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
      <HeroSection />
      <PortfolioIntro />
      <BrandCards />
      <ChatSection {...chatProps} />
      <Footer />
    </div>
  );
}
