import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'One Hardie — The Home of Resilient Beauty™',
  description:
    'AI-powered exterior design concierge for Hardie®, AZEK Exteriors®, TimberTech®, and StruXure®. Design your whole-home exterior with Resilient Beauty.',
  metadataBase: new URL('https://onehardie.com'),
  openGraph: {
    title: 'One Hardie — The Home of Resilient Beauty™',
    description:
      "Design a complete, resilient exterior with America's best outdoor brands.",
    url: 'https://onehardie.com',
    siteName: 'One Hardie',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased min-h-screen bg-white`}>
        {children}
      </body>
    </html>
  );
}
