'use client';

import { ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';

interface Color {
  name: string;
  hex: string;
}

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

interface ProductCardProps {
  product: ProductCardData;
}

const brandColor: Record<string, string> = {
  'Hardie®':          '#003B8E',
  'AZEK Exteriors®':  '#2D6A2D',
  'TimberTech®':      '#8B4513',
  'StruXure®':        '#5A3A8C',
};

const tierLabel: Record<string, string> = {
  moderate: '$$',
  premium:  '$$$',
  luxury:   '$$$$',
};

export function ProductCard({ product }: ProductCardProps) {
  const accentColor = brandColor[product.brand] ?? '#C49A3C';
  const extraColors = product.colors.length > 5 ? product.colors.length - 5 : 0;

  return (
    <div
      className={clsx(
        'rounded-xl border border-brand-border bg-brand-surface2',
        'overflow-hidden w-full max-w-[300px] flex-shrink-0',
        'hover:border-brand-gold/40 transition-colors duration-200',
      )}
    >
      {/* Brand stripe */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${accentColor}, #C49A3C)` }}
      />

      <div className="p-4 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <span
              className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              {product.brand}
            </span>
            <p className="text-brand-text font-semibold text-sm leading-tight mt-0.5">
              {product.name}
            </p>
          </div>
          <span className="text-brand-muted text-xs font-medium flex-shrink-0">
            {tierLabel[product.priceRange] ?? '$$'}
          </span>
        </div>

        {/* Tagline */}
        <p className="text-brand-muted text-xs leading-relaxed">{product.tagline}</p>

        {/* Color swatches */}
        {product.colors.length > 0 && (
          <div>
            <p className="text-brand-faint text-[10px] uppercase tracking-widest mb-1.5">
              Colors
            </p>
            <div className="flex items-center gap-1.5 flex-wrap">
              {product.colors.slice(0, 5).map((c) => (
                <div
                  key={c.name}
                  title={c.name}
                  className="w-5 h-5 rounded-full border border-white/10 cursor-default"
                  style={{ background: c.hex }}
                />
              ))}
              {extraColors > 0 && (
                <span className="text-brand-muted text-[10px]">+{extraColors}</span>
              )}
            </div>
          </div>
        )}

        {/* Benefits */}
        <ul className="space-y-1">
          {product.keyBenefits.map((b) => (
            <li key={b} className="flex items-start gap-1.5 text-xs text-brand-muted">
              <span className="text-brand-gold mt-0.5 flex-shrink-0">✓</span>
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
            'mt-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium',
            'bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20 border border-brand-gold/20',
            'transition-colors duration-150',
          )}
        >
          Learn More
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

export function ProductGrid({ products }: { products: ProductCardData[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
