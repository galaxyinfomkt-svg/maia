import Link from 'next/link';
import { PHONE, PHONE_LINK, HIC_NUMBER } from '@/lib/constants';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  cityName?: string;
}

export default function CTASection({
  title = 'Ready to Transform Your Home?',
  subtitle = "Join 500+ satisfied Massachusetts homeowners. Get your FREE, no-obligation estimate today — most quotes delivered within 24 hours!",
  cityName,
}: CTASectionProps) {
  const displayTitle = cityName
    ? `Ready to Transform Your ${cityName} Home?`
    : title;

  return (
    <section className="py-24 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {displayTitle}
        </h2>
        <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
          {subtitle}
        </p>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-white/80">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">MA HIC #{HIC_NUMBER}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm">5.0 Star Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Same-Day Estimates</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={PHONE_LINK}
            className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call Now: {PHONE}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center px-12 py-6 bg-white text-slate-900 rounded-full text-xl font-bold hover:bg-amber-400 transition-all"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Get Your FREE Quote
          </Link>
        </div>

        <p className="mt-6 text-white/60 text-sm">
          No pressure, no obligation — just honest advice from local experts
        </p>
      </div>
    </section>
  );
}
