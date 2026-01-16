import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header, Footer, TopBar } from '@/components/layout';
import FloatingCTA from '@/components/FloatingCTA';
import ChatWidget from '@/components/ChatWidget';
import { SITE_NAME, SITE_URL, PHONE, ADDRESS } from '@/lib/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | Expert Siding, Door & Windows Installation in Massachusetts`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `Professional siding, door, and windows installation services in Massachusetts. Licensed & insured contractor serving 100+ cities. Call ${PHONE} for a free estimate!`,
  keywords: [
    'siding installation Massachusetts',
    'window replacement MA',
    'door installation contractor',
    'home improvement Massachusetts',
    'general contractor Marlborough',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Expert Home Improvement in Massachusetts`,
    description: 'Professional siding, door, and windows installation services throughout Massachusetts.',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: 'Professional siding, door, and windows installation services in Massachusetts.',
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
