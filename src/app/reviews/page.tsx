import { Metadata } from 'next';
import Link from 'next/link';
import { ReviewsHighlight } from '@/components/sections';
import { SITE_NAME, PHONE, PHONE_LINK, SITE_URL, HIC_NUMBER } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Customer Reviews | 5.0★ Google Rating | 47+ Reviews | ${SITE_NAME}`,
  description: `Read 47+ verified 5-star Google reviews from Massachusetts homeowners. See why ${SITE_NAME} is the #1 rated siding, window & door contractor in MA. Licensed HIC #${HIC_NUMBER}.`,
  alternates: { canonical: `${SITE_URL}/reviews` },
};

export default function ReviewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/20 rounded-full text-amber-400 font-semibold text-sm mb-6">
            5.0 Average Rating
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            What Massachusetts Homeowners Say About{' '}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              {SITE_NAME}
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            47+ verified 5-star Google reviews from real customers across Middlesex, Worcester, Norfolk, and Essex counties.
            Licensed HIC #{HIC_NUMBER}. Serving 75+ Massachusetts cities since 2015.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-amber-400">5.0</p>
              <p className="text-gray-400 text-sm">Google Rating</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-amber-400">47+</p>
              <p className="text-gray-400 text-sm">Verified Reviews</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-amber-400">500+</p>
              <p className="text-gray-400 text-sm">Projects Completed</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-amber-400">100%</p>
              <p className="text-gray-400 text-sm">5-Star Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Google Reviews Widget */}
      <ReviewsHighlight />

      {/* CTA */}
      <section className="py-8 bg-gradient-to-r from-amber-400 to-yellow-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Ready to Join Our 5-Star Family?</h2>
              <p className="text-slate-700 mt-1">Get your free, no-obligation estimate today.</p>
            </div>
            <a href={PHONE_LINK} className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all whitespace-nowrap">
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
