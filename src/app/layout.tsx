import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header, Footer, TopBar } from '@/components/layout';
import FloatingCTA from '@/components/FloatingCTA';
import ChatWidget from '@/components/ChatWidget';
import Analytics from '@/components/Analytics';
import { SITE_NAME, SITE_URL, PHONE, ADDRESS, HIC_NUMBER, LOGO_URL, OG_IMAGE, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `Siding Contractor MA | Windows, Doors & Exterior | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `#1 siding & exterior contractor in Massachusetts. Expert siding, windows, doors installation. 19 5-star reviews. Licensed HIC #${HIC_NUMBER} & insured. FREE estimates. Call ${PHONE}`,
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
    'exterior contractor Charlton MA',
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
        url: OG_IMAGE,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: `Completed siding replacement by ${SITE_NAME}, a licensed Massachusetts exterior contractor`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Siding, Windows & Doors in Massachusetts`,
    description: 'Licensed Massachusetts exterior contractor (HIC #204634). Siding, windows and doors, installed by our own crews. Free written estimates.',
    images: [OG_IMAGE],
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
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        {/* AI Search Engine Discovery - llms.txt for AI crawlers */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Information" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM Full Information" />
        {/* Speakable meta for voice assistants and AI */}
        <meta name="ai-content-declaration" content="This website contains factual business information about Maia Construction, a licensed Massachusetts home improvement contractor." />
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
