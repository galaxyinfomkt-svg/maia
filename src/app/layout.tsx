import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header, Footer, TopBar } from '@/components/layout';
import FloatingCTA from '@/components/FloatingCTA';
import ChatWidget from '@/components/ChatWidget';
import Analytics from '@/components/Analytics';
import { SITE_NAME, SITE_URL, PHONE, ADDRESS, HIC_NUMBER, LOGO_URL } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Siding, Windows & Doors in Massachusetts | Free Quote in 24h`,
    template: `%s | ${SITE_NAME} - Licensed MA Contractor (HIC #${HIC_NUMBER})`,
  },
  description: `Massachusetts' trusted siding, window & door contractor. 5-star rated, 100+ projects completed. Licensed (HIC #${HIC_NUMBER}) & insured. Get your FREE quote today - call ${PHONE}!`,
  icons: {
    icon: LOGO_URL,
    shortcut: LOGO_URL,
    apple: LOGO_URL,
  },
  keywords: [
    'siding installation Massachusetts',
    'siding contractor Boston MA',
    'vinyl siding installation Worcester',
    'fiber cement siding Massachusetts',
    'window replacement Massachusetts',
    'energy efficient windows MA',
    'door installation contractor MA',
    'entry door replacement Boston',
    'home improvement Massachusetts',
    'general contractor Marlborough MA',
    'exterior renovation New England',
    'James Hardie siding installer MA',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Premium Siding, Windows & Doors in Massachusetts`,
    description: 'New England\'s trusted home exterior specialists. Premium siding, energy-efficient windows & doors. 5-star rated, licensed & insured. Free estimates!',
    images: [
      {
        url: LOGO_URL,
        width: 400,
        height: 400,
        alt: `${SITE_NAME} - Massachusetts Siding, Windows & Doors Contractor`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | MA's Top-Rated Siding & Window Contractor`,
    description: 'Transform your home with quality siding, windows & doors. Serving 100+ Massachusetts cities. Licensed & insured. Call for free estimate!',
    images: [LOGO_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    // Geo meta tags for local SEO
    'geo.region': 'US-MA',
    'geo.placename': ADDRESS.city,
    'geo.position': `${ADDRESS.lat};${ADDRESS.lng}`,
    'ICBM': `${ADDRESS.lat}, ${ADDRESS.lng}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-slate-900 focus:rounded-lg focus:font-semibold"
        >
          Skip to main content
        </a>
        <Analytics />
        <TopBar />
        <Header />
        <main id="main-content" role="main" aria-label="Main content">
          {children}
        </main>
        <Footer />
        <FloatingCTA />
        <ChatWidget />
      </body>
    </html>
  );
}
