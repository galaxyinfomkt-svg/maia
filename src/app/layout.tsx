import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header, Footer } from '@/components/layout';
import FloatingCTA from '@/components/FloatingCTA';
import { SITE_NAME, SITE_URL, PHONE } from '@/lib/constants';

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
