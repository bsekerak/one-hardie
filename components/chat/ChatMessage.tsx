'use client';

import type { Message } from 'ai';
import { clsx } from 'clsx';
import { ProductGrid } from './ProductCard';

interface ChatMessageProps {
  message: Message;
}

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
    <div
      className={clsx(
        'flex flex-col gap-2',
        isUser ? 'items-end' : 'items-start',
      )}
    >
      {/* Text bubble */}
      {message.content && (
        <div
          className={clsx(
            'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
            isUser
              ? 'bg-brand-gold/15 text-brand-text rounded-br-sm border border-brand-gold/25'
              : 'bg-brand-surface2 text-brand-text rounded-bl-sm border border-brand-border',
          )}
        >
          <MessageContent content={message.content} />
        </div>
      )}

      {/* Tool call results — product cards, color palettes, inspiration */}
      {toolResults?.map(({ name, result }) => (
        <div key={name} className="w-full max-w-full">
          {name === 'recommendProducts' && (
            <RecommendResult result={result as RecommendProductsResult} />
          )}
          {name === 'getInspirationProjects' && (
            <InspirationResult result={result as InspirationProjectsResult} />
          )}
          {name === 'getColorOptions' && (
            <ColorResult result={result as ColorOptionsResult} />
          )}
        </div>
      ))}
    </div>
  );
}

// Render markdown-lite: bold, line breaks
function MessageContent({ content }: { content: string }) {
  const lines = content.split('\n');
  return (
    <>
      {lines.map((line, i) => {
        // Bold: **text**
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} className={i > 0 ? 'mt-2' : ''}>
            {parts.map((part, j) =>
              part.startsWith('**') && part.endsWith('**') ? (
                <strong key={j} className="text-brand-gold-lt font-semibold">
                  {part.slice(2, -2)}
                </strong>
              ) : (
                <span key={j}>{part}</span>
              ),
            )}
          </p>
        );
      })}
    </>
  );
}

interface ProductCardData {
  id: string;
  brand: string;
  category: string;
  name: string;
  tagline: string;
  priceRange: string;
  colors: { name: string; hex: string }[];
  keyBenefits: string[];
  learnMoreUrl: string;
}

interface RecommendProductsResult {
  products: ProductCardData[];
  count: number;
  ecosystem_tip: string;
}

function RecommendResult({ result }: { result: RecommendProductsResult }) {
  if (!result?.products?.length) return null;
  return (
    <div className="mt-1">
      <ProductGrid products={result.products} />
      {result.ecosystem_tip && (
        <p className="mt-2 text-xs text-brand-muted italic px-1">
          {result.ecosystem_tip}
        </p>
      )}
    </div>
  );
}

interface InspirationProject {
  id: string;
  title: string;
  style: string;
  region: string;
  description: string;
  featuredProducts: ProductCardData[];
}

interface InspirationProjectsResult {
  projects: InspirationProject[];
}

function InspirationResult({ result }: { result: InspirationProjectsResult }) {
  if (!result?.projects?.length) return null;
  return (
    <div className="mt-1 space-y-3">
      {result.projects.map((proj) => (
        <div
          key={proj.id}
          className="rounded-xl border border-brand-border bg-brand-surface2 p-4"
        >
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest">
            {proj.style} · {proj.region}
          </p>
          <p className="text-brand-text font-semibold text-sm mt-0.5">{proj.title}</p>
          <p className="text-brand-muted text-xs mt-1 leading-relaxed">{proj.description}</p>
          {proj.featuredProducts?.length > 0 && (
            <div className="mt-3">
              <ProductGrid products={proj.featuredProducts} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

interface ColorEntry {
  name: string;
  hex: string;
}

interface ColorProduct {
  productName: string;
  brand: string;
  colors: ColorEntry[];
}

interface ColorOptionsResult {
  products: ColorProduct[];
}

function ColorResult({ result }: { result: ColorOptionsResult }) {
  if (!result?.products?.length) return null;
  return (
    <div className="mt-1 space-y-3">
      {result.products.map((p) => (
        <div
          key={p.productName}
          className="rounded-xl border border-brand-border bg-brand-surface2 p-4"
        >
          <p className="text-brand-muted text-xs">{p.brand}</p>
          <p className="text-brand-text font-semibold text-sm">{p.productName}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.colors.map((c) => (
              <div key={c.name} className="flex items-center gap-1.5">
                <div
                  className="w-6 h-6 rounded-full border border-white/10"
                  style={{ background: c.hex }}
                />
                <span className="text-brand-muted text-xs">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
