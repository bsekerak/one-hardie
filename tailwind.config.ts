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
          bg:        '#0E0E0E',
          surface:   '#181818',
          surface2:  '#222222',
          border:    '#2C2A28',
          gold:      '#C49A3C',
          'gold-lt': '#E8C56A',
          'gold-dk': '#8B6914',
          blue:      '#003B8E',
          text:      '#F5F0E8',
          muted:     '#A89880',
          faint:     '#6B5E52',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'breathe':   'breathe 4s ease-in-out infinite',
        'pulse-ring': 'pulseRing 1.5s ease-out infinite',
        'shimmer':   'shimmer 2s linear infinite',
        'float':     'float 6s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.025)' },
        },
        pulseRing: {
          '0%':   { transform: 'scale(1)',    opacity: '0.6' },
          '100%': { transform: 'scale(1.75)', opacity: '0' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
