import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header, Footer, TopBar } from '@/components/layout';
import FloatingCTA from '@/components/FloatingCTA';
import ChatWidget from '@/components/ChatWidget';
import { SITE_NAME, SITE_URL, PHONE, ADDRESS, HIC_NUMBER } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | #1 Siding & Window Installation in Massachusetts | Free Estimates`,
    template: `%s | ${SITE_NAME} - MA Licensed Contractor`,
  },
  description: `Transform your home with New England's trusted siding, window & door experts. MA HIC #${HIC_NUMBER}. 10+ years experience, 5-star rated, serving 100+ MA cities. Call ${PHONE} for FREE estimate!`,
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
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | MA's Top-Rated Siding & Window Contractor`,
    description: 'Transform your home with quality siding, windows & doors. Serving 100+ Massachusetts cities. Licensed & insured. Call for free estimate!',
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
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
        <ChatWidget />
      </body>
    </html>
  );
}
