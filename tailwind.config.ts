import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:          '#FFFFFF',
          'bg-soft':   '#F8F6F3',
          surface:     '#F2EFE9',
          surface2:    '#EAE6DE',
          border:      '#D5D0C8',
          'border-lt': '#EAE6DE',
          green:       '#2D6A2D',
          'green-dk':  '#1B4D1B',
          'green-lt':  '#EBF5EB',
          'green-mid': '#3A7A3A',
          gold:        '#C49A3C',
          'gold-lt':   '#E8C56A',
          blue:        '#003B8E',
          text:        '#1A1A1A',
          muted:       '#5C5549',
          faint:       '#9A9089',
          white:       '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card':   '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
        'avatar': '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
        'input':  '0 0 0 3px rgba(45,106,45,0.15)',
      },
      animation: {
        'breathe':    'breathe 4s ease-in-out infinite',
        'pulse-ring': 'pulseRing 1.5s ease-out infinite',
        'shimmer':    'shimmer 2.5s linear infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.02)' },
        },
        pulseRing: {
          '0%':   { transform: 'scale(1)',    opacity: '0.5' },
          '100%': { transform: 'scale(1.8)',  opacity: '0'   },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
