'use client';

import { Shield, Zap, House, ChevronRight, ExternalLink } from 'lucide-react';
import { useHardieChat } from '@/hooks/useHardieChat';
import { AnimatedAvatar } from '@/components/avatar/AnimatedAvatar';
import { ChatPanel } from '@/components/chat/ChatPanel';

/* ─── Brand data (exact copy from jameshardie.com/brands) ─── */
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
  {
    icon: Shield,
    heading: 'Beauty that lasts',
    body: 'Our products are engineered to resist weather, moisture, pests, fire, fading, and wear—so your exterior can defend your home without compromising the look you love.',
  },
  {
    icon: Zap,
    heading: 'Less upkeep, more living',
    body: 'Designed to maintain their beauty with less upkeep, our products resist fading, rotting, warping, and weathering—helping homeowners maintain their exterior with less effort.',
  },
  {
    icon: House,
    heading: 'The whole home, covered',
    body: 'From siding and trim to decking, railing, and pergolas, all our products work together to create a cohesive exterior that looks better, performs better, and protects more.',
  },
];

/* ─── Nav ─── */
function TopNav({ isSpeaking, isLoading }: { isSpeaking: boolean; isLoading: boolean }) {
  return (
    <header className="flex-shrink-0 bg-white border-b border-brand-border">
      {/* Utility bar */}
      <div className="bg-[#1B4D1B] px-6 py-1.5 flex items-center justify-between">
        <span className="text-white/70 text-[11px]">The Home of Resilient Beauty™</span>
        <div className="flex items-center gap-4">
          <a href="https://www.jameshardie.com/homeowners/find-a-contractor" target="_blank" rel="noopener noreferrer"
            className="text-white/80 hover:text-white text-[11px] flex items-center gap-1">
            Find a Contractor <ChevronRight className="w-3 h-3" />
          </a>
          <a href="https://www.jameshardie.com/homeowners/request-a-quote" target="_blank" rel="noopener noreferrer"
            className="text-white/80 hover:text-white text-[11px] flex items-center gap-1">
            Get a Quote <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* JH-style logo block */}
          <div
            className="h-8 px-3 flex items-center rounded font-bold text-white text-sm tracking-wide"
            style={{ background: 'linear-gradient(135deg, #2D6A2D, #1B4D1B)' }}
          >
            ONE HARDIE
          </div>
          <span className="text-brand-faint text-xs hidden sm:block">Exterior Concierge</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {['Our Brands', 'Products', 'Design Help', 'Find a Pro'].map((item) => (
            <button key={item} className="text-sm text-brand-muted hover:text-brand-green font-medium transition-colors">
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 text-xs">
          <span className={`w-2 h-2 rounded-full ${isSpeaking || !isLoading ? 'bg-brand-green' : 'bg-blue-400'} ${(isSpeaking || isLoading) ? 'animate-pulse' : ''}`} />
          <span className="text-brand-faint hidden sm:inline">
            {isSpeaking ? 'Hardie is speaking…' : isLoading ? 'Thinking…' : 'Hardie is ready'}
          </span>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="px-6 py-1.5 bg-brand-bg-soft border-t border-brand-border text-[11px] text-brand-faint flex items-center gap-1">
        <span>Home</span>
        <ChevronRight className="w-3 h-3" />
        <span>About James Hardie</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-brand-text font-medium">James Hardie Brands</span>
      </div>
    </header>
  );
}

/* ─── Hero ─── */
function HeroSection() {
  return (
    <section
      className="px-8 py-10 flex-shrink-0"
      style={{ background: 'linear-gradient(135deg, #1B4D1B 0%, #2D6A2D 60%, #3A7A3A 100%)' }}
    >
      <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-3">
        James Hardie Brands
      </p>
      <h1 className="text-white font-bold text-3xl sm:text-4xl leading-tight max-w-xl">
        The Home Of Resilient Beauty™
      </h1>
      <p className="text-white/75 text-sm leading-relaxed mt-4 max-w-2xl">
        From siding and trim to decking, railing, and more, James Hardie brings together trusted
        materials that give homeowners more ways to bring their vision to life. Built for the
        realities of where and how people live, our brands pair authentic style with performance
        that helps homes stand strong through moisture, sun, pests, fire, and extreme weather.
      </p>
    </section>
  );
}

/* ─── Value props ─── */
function ValueProps() {
  return (
    <section className="px-8 py-8 border-b border-brand-border bg-white flex-shrink-0">
      <h2 className="text-brand-text font-bold text-xl mb-1">
        Resilient Beauty™ for the whole home exterior
      </h2>
      <p className="text-brand-muted text-sm mb-6 max-w-2xl">
        Beautiful exteriors do more than make a first impression. They help protect what matters
        inside, stand up to the elements, and make it easier to enjoy every space around your home.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {VALUE_PROPS.map(({ icon: Icon, heading, body }) => (
          <div key={heading} className="bg-brand-bg-soft rounded-xl p-5 border border-brand-border">
            <div className="w-9 h-9 rounded-lg bg-brand-green-lt flex items-center justify-center mb-3">
              <Icon className="w-4 h-4 text-brand-green" />
            </div>
            <h3 className="text-brand-text font-semibold text-sm mb-1.5">{heading}</h3>
            <p className="text-brand-muted text-xs leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Brand cards ─── */
function BrandCards() {
  return (
    <section className="px-8 py-8 bg-white flex-shrink-0">
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <h2 className="text-brand-text font-bold text-xl">Meet the James Hardie family of brands</h2>
          <p className="text-brand-muted text-sm mt-1 max-w-xl">
            Together, our brands give homeowners and professionals more ways to create a beautiful,
            high-performing exterior—from the siding to the deck and beyond.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {BRANDS.map((b) => (
          <div
            key={b.name}
            className="rounded-xl border p-5 bg-white hover:shadow-card transition-shadow"
            style={{ borderColor: b.border }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-2"
              style={{ color: b.color }}
            >
              {b.label}
            </p>
            <h3 className="text-brand-text font-bold text-base mb-2" style={{ color: b.color }}>
              {b.name}
            </h3>
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

      <p className="text-brand-faint text-[10px] mt-6 leading-relaxed">
        *Based on Freedonia Group, Global Siding (Cladding) Report (2025).
      </p>
    </section>
  );
}

/* ─── Chat section ─── */
function ChatSection({
  messages, input, handleInputChange, handleSubmit, isLoading, isSpeaking, ttsAvailable, append,
}: ReturnType<typeof useHardieChat>) {
  return (
    <section className="flex-shrink-0 bg-brand-bg-soft border-t border-brand-border">
      <div className="px-8 pt-8 pb-4">
        <p className="text-brand-green text-xs font-bold uppercase tracking-widest mb-1">
          AI Exterior Concierge
        </p>
        <h2 className="text-brand-text font-bold text-xl">Design your exterior with Hardie</h2>
        <p className="text-brand-muted text-sm mt-1">
          Tell me about your home and I'll recommend products across all four brands.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-0 border-t border-brand-border">
        {/* Avatar panel */}
        <div className="md:w-56 lg:w-64 flex-shrink-0 flex flex-col items-center justify-start px-6 py-8 gap-4 border-b md:border-b-0 md:border-r border-brand-border bg-white">
          <AnimatedAvatar isSpeaking={isSpeaking} isThinking={isLoading} size="md" />
          <div className="text-center">
            <p className="text-brand-text font-semibold text-sm">Hardie</p>
            <p className="text-brand-muted text-xs mt-0.5">Exterior Concierge</p>
            <div className={`mt-2 inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-semibold ${
              isSpeaking ? 'bg-brand-green-lt text-brand-green'
              : isLoading ? 'bg-blue-50 text-blue-600'
              : 'bg-brand-green-lt text-brand-green'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isSpeaking || !isLoading ? 'bg-brand-green' : 'bg-blue-400'} ${(isSpeaking || isLoading) ? 'animate-pulse' : ''}`} />
              {isSpeaking ? 'Speaking…' : isLoading ? 'Thinking…' : 'Ready'}
            </div>
            {!ttsAvailable && (
              <p className="text-brand-faint text-[10px] mt-2 max-w-[140px] leading-relaxed">
                Add <code className="text-brand-green">ELEVENLABS_API_KEY</code> for voice
              </p>
            )}
          </div>
        </div>

        {/* Chat */}
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
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="flex-shrink-0 bg-[#1A1A1A] text-white/60 px-8 py-6 text-[11px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div>
        <p className="font-semibold text-white/80 mb-1">One Hardie</p>
        <p>© 2026 James Hardie Building Products Inc. All rights reserved.</p>
        <p className="mt-0.5">
          ™ or ® denote trademarks or registered trademarks of James Hardie Technology Ltd.
        </p>
      </div>
      <div className="flex gap-4">
        <a href="https://www.jameshardie.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer"
          className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="https://www.jameshardie.com/legal/terms-and-conditions" target="_blank" rel="noopener noreferrer"
          className="hover:text-white transition-colors">Terms</a>
        <a href="https://www.jameshardie.com" target="_blank" rel="noopener noreferrer"
          className="hover:text-white transition-colors">JamesHardie.com</a>
      </div>
    </footer>
  );
}

/* ─── Root page ─── */
export default function Home() {
  const chatProps = useHardieChat();

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-y-auto">
      <TopNav isSpeaking={chatProps.isSpeaking} isLoading={chatProps.isLoading} />
      <HeroSection />
      <ValueProps />
      <BrandCards />
      <ChatSection {...chatProps} />
      <Footer />
    </div>
  );
}
