'use client';

import { ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';

interface Color { name: string; hex: string }

interface ProductCardData {
  id: string;
  brand: string;
  category: string;
  name: string;
  tagline: string;
  priceRange: string;
  colors: Color[];
  keyBenefits: string[];
  learnMoreUrl: string;
}

const brandAccent: Record<string, { bar: string; badge: string; text: string }> = {
  'Hardie®':          { bar: '#003B8E', badge: '#EBF0F9', text: '#003B8E' },
  'AZEK Exteriors®':  { bar: '#2D6A2D', badge: '#EBF5EB', text: '#2D6A2D' },
  'TimberTech®':      { bar: '#7A3B10', badge: '#F7EDE5', text: '#7A3B10' },
  'StruXure®':        { bar: '#4A2D7A', badge: '#F0EAFA', text: '#4A2D7A' },
};

const tierLabel: Record<string, string> = {
  moderate: '$$', premium: '$$$', luxury: '$$$$',
};

export function ProductCard({ product }: { product: ProductCardData }) {
  const accent = brandAccent[product.brand] ?? { bar: '#2D6A2D', badge: '#EBF5EB', text: '#2D6A2D' };
  const extra = Math.max(0, product.colors.length - 5);

  return (
    <div className={clsx(
      'rounded-xl border border-brand-border bg-white shadow-card',
      'overflow-hidden w-full max-w-[280px] flex-shrink-0',
      'hover:shadow-md transition-shadow duration-200',
    )}>
      {/* Brand colour bar */}
      <div className="h-1" style={{ background: accent.bar }} />

      <div className="p-4 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
              style={{ background: accent.badge, color: accent.text }}
            >
              {product.brand}
            </span>
            <p className="text-brand-text font-semibold text-sm leading-tight mt-1.5">
              {product.name}
            </p>
          </div>
          <span className="text-brand-muted text-xs font-medium flex-shrink-0 mt-0.5">
            {tierLabel[product.priceRange] ?? '$$'}
          </span>
        </div>

        <p className="text-brand-muted text-xs leading-relaxed">{product.tagline}</p>

        {/* Color swatches */}
        {product.colors.length > 0 && (
          <div>
            <p className="text-brand-faint text-[10px] uppercase tracking-widest mb-1.5">Colors</p>
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.colors.slice(0, 5).map((c) => (
                <div
                  key={c.name}
                  title={c.name}
                  className="w-5 h-5 rounded-full border border-brand-border/60 cursor-default"
                  style={{ background: c.hex }}
                />
              ))}
              {extra > 0 && <span className="text-brand-faint text-[10px]">+{extra}</span>}
            </div>
          </div>
        )}

        {/* Benefits */}
        <ul className="space-y-1.5">
          {product.keyBenefits.map((b) => (
            <li key={b} className="flex items-start gap-1.5 text-xs text-brand-muted">
              <span className="text-brand-green mt-0.5 flex-shrink-0 font-bold">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={product.learnMoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(
            'mt-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold',
            'bg-brand-green text-white hover:bg-brand-green-dk',
            'transition-colors duration-150',
          )}
        >
          Learn More <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

export function ProductGrid({ products }: { products: ProductCardData[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
