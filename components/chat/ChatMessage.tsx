'use client';

import type { Message } from 'ai';
import { clsx } from 'clsx';
import { ProductGrid } from './ProductCard';

interface ChatMessageProps { message: Message }

function parseToolResults(message: Message) {
  if (!message.toolInvocations) return null;
  const results = message.toolInvocations
    .filter((inv) => inv.state === 'result')
    .map((inv) => ({ name: inv.toolName, result: (inv as { state: 'result'; result: unknown }).result }));
  return results.length > 0 ? results : null;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const toolResults = parseToolResults(message);

  return (
    <div className={clsx('flex flex-col gap-2', isUser ? 'items-end' : 'items-start')}>
      {message.content && (
        <div
          className="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
          style={
            isUser
              ? { background: '#C49A3C', color: '#111111', borderRadius: '16px 16px 4px 16px' }
              : { background: '#222222', color: '#F5F0E8', border: '1px solid #2C2A28', borderRadius: '4px 16px 16px 16px' }
          }
        >
          <MessageContent content={message.content} isUser={isUser} />
        </div>
      )}

      {toolResults?.map(({ name, result }) => (
        <div key={name} className="w-full max-w-full">
          {name === 'recommendProducts'    && <RecommendResult    result={result as RecommendResult_} />}
          {name === 'getInspirationProjects' && <InspirationResult result={result as InspirationResult_} />}
          {name === 'getColorOptions'       && <ColorResult        result={result as ColorResult_} />}
        </div>
      ))}
    </div>
  );
}

function MessageContent({ content, isUser }: { content: string; isUser: boolean }) {
  return (
    <>
      {content.split('\n').map((line, i) => {
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} className={i > 0 ? 'mt-2' : ''}>
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**') ? (
                <strong key={j} className="font-semibold" style={{ color: isUser ? '#111111' : '#E8C56A' }}>
                  {part.slice(2, -2)}
                </strong>
              ) : <span key={j}>{part}</span>
            )}
          </p>
        );
      })}
    </>
  );
}

interface ProductCard_ {
  id: string; brand: string; category: string; name: string; tagline: string;
  priceRange: string; colors: { name: string; hex: string }[];
  keyBenefits: string[]; learnMoreUrl: string;
}
interface RecommendResult_    { products: ProductCard_[]; count: number; ecosystem_tip: string }
interface InspirationResult_  { projects: { id: string; title: string; style: string; region: string; description: string; featuredProducts: ProductCard_[] }[] }
interface ColorResult_        { products: { productName: string; brand: string; colors: { name: string; hex: string }[] }[] }

function RecommendResult({ result }: { result: RecommendResult_ }) {
  if (!result?.products?.length) return null;
  return (
    <div className="mt-1">
      <ProductGrid products={result.products} />
      {result.ecosystem_tip && (
        <p className="mt-2 text-xs italic px-1" style={{ color: '#A89880' }}>{result.ecosystem_tip}</p>
      )}
    </div>
  );
}

function InspirationResult({ result }: { result: InspirationResult_ }) {
  if (!result?.projects?.length) return null;
  return (
    <div className="mt-1 space-y-3">
      {result.projects.map((proj) => (
        <div key={proj.id} className="rounded-xl p-4" style={{ background: '#222', border: '1px solid #2C2A28' }}>
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#C49A3C' }}>
            {proj.style} · {proj.region}
          </p>
          <p className="font-semibold text-sm mt-0.5" style={{ color: '#F5F0E8' }}>{proj.title}</p>
          <p className="text-xs mt-1 leading-relaxed" style={{ color: '#A89880' }}>{proj.description}</p>
          {proj.featuredProducts?.length > 0 && <div className="mt-3"><ProductGrid products={proj.featuredProducts} /></div>}
        </div>
      ))}
    </div>
  );
}

function ColorResult({ result }: { result: ColorResult_ }) {
  if (!result?.products?.length) return null;
  return (
    <div className="mt-1 space-y-3">
      {result.products.map((p) => (
        <div key={p.productName} className="rounded-xl p-4" style={{ background: '#222', border: '1px solid #2C2A28' }}>
          <p className="text-xs" style={{ color: '#A89880' }}>{p.brand}</p>
          <p className="font-semibold text-sm" style={{ color: '#F5F0E8' }}>{p.productName}</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {p.colors.map((c) => (
              <div key={c.name} className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full border border-white/10" style={{ background: c.hex }} />
                <span className="text-xs" style={{ color: '#A89880' }}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
