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
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `#1 Siding & Window Contractor MA (2026) | 5.0★ Rated | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `Massachusetts' #1 rated siding, window & door contractor ★5.0. 500+ projects completed, 25-50yr warranties. Licensed HIC #${HIC_NUMBER} & fully insured. Call ${PHONE} for your FREE estimate today!`,
  icons: {
    icon: '/images/logo-200.png',
    shortcut: '/images/logo-200.png',
    apple: '/images/logo-200.png',
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
    title: `${SITE_NAME} | #1 MA Siding, Windows & Doors Contractor (2026)`,
    description: 'Massachusetts top-rated exterior contractor ★5.0. Premium siding, ENERGY STAR windows & doors. 500+ projects, 25-50yr warranties. FREE estimates!',
    images: [
      {
        url: LOGO_URL,
        width: 400,
        height: 400,
        alt: `${SITE_NAME} - 5-Star Rated Massachusetts Home Exterior Contractor`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | 5-Star Siding & Window Contractor MA`,
    description: '5.0-star rated siding, window & door contractor. Serving 100+ Massachusetts cities. Licensed & insured. Call for FREE estimate!',
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
      <head>
        <link rel="preconnect" href="https://api.leadconnectorhq.com" />
        <link rel="preconnect" href="https://widgets.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
      </head>
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
