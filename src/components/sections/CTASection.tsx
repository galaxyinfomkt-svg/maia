import Link from 'next/link';
import { PHONE, PHONE_LINK } from '@/lib/constants';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  cityName?: string;
}

export default function CTASection({
  title = 'Ready to Transform Your Home?',
  subtitle = 'Get your free estimate today!',
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
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={PHONE_LINK}
            className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call {PHONE}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center px-12 py-6 bg-white text-slate-900 rounded-full text-xl font-bold hover:bg-amber-400 transition-all"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Request Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
