import Link from 'next/link';
import { PHONE, PHONE_LINK, SITE_NAME } from '@/lib/constants';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <div className="container mx-auto px-4 text-center">
        {/* 404 Number */}
        <h1 className="text-8xl md:text-9xl font-bold text-amber-400 mb-4">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-white/80 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
          Let us help you find what you need.
        </p>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold hover:shadow-xl transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
          <a
            href={PHONE_LINK}
            className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-amber-400 text-amber-400 rounded-full font-bold hover:bg-amber-400 hover:text-slate-900 transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call {PHONE}
          </a>
        </div>

        {/* Popular Pages */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto border border-white/20">
          <h3 className="text-lg font-bold text-white mb-6">Popular Pages</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/services/siding"
              className="flex flex-col items-center p-4 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <span className="text-3xl mb-2">🏠</span>
              <span className="text-white/90 text-sm font-medium group-hover:text-amber-400 transition-colors">Siding</span>
            </Link>
            <Link
              href="/services/windows"
              className="flex flex-col items-center p-4 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <span className="text-3xl mb-2">🪟</span>
              <span className="text-white/90 text-sm font-medium group-hover:text-amber-400 transition-colors">Windows</span>
            </Link>
            <Link
              href="/services/doors"
              className="flex flex-col items-center p-4 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <span className="text-3xl mb-2">🚪</span>
              <span className="text-white/90 text-sm font-medium group-hover:text-amber-400 transition-colors">Doors</span>
            </Link>
            <Link
              href="/contact"
              className="flex flex-col items-center p-4 rounded-xl hover:bg-white/10 transition-colors group"
            >
              <span className="text-3xl mb-2">📞</span>
              <span className="text-white/90 text-sm font-medium group-hover:text-amber-400 transition-colors">Contact</span>
            </Link>
          </div>
        </div>

        {/* SEO-friendly content */}
        <p className="text-white/60 text-sm mt-8">
          {SITE_NAME} — Massachusetts Licensed Contractor serving 100+ cities
        </p>
      </div>
    </section>
  );
}
