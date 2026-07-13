import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'One Hardie — Exterior Concierge',
  description:
    'AI-powered exterior design concierge for Hardie®, AZEK Exteriors®, TimberTech®, and StruXure®. Design your whole-home exterior with Resilient Beauty.',
  metadataBase: new URL('https://onehardie.com'),
  openGraph: {
    title: 'One Hardie — Exterior Concierge',
    description:
      'Design a complete, resilient exterior with America\'s best outdoor brands.',
    url: 'https://onehardie.com',
    siteName: 'One Hardie',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-brand-bg`}
      >
        {children}
      </body>
    </html>
  );
}
