import { Metadata } from 'next';
import Link from 'next/link';
import { ReviewsHighlight } from '@/components/sections';
import { JsonLd } from '@/components/seo';
import { SITE_NAME, PHONE, PHONE_LINK, SITE_URL, HIC_NUMBER } from '@/lib/constants';
import {
  reviews,
  completeReviews,
  REVIEW_COUNT,
  AVERAGE_RATING,
  GOOGLE_PROFILE_URL,
} from '@/lib/reviews';

/**
 * Review markup lives here and only here — this is the one page that shows the
 * reviews to the reader, which is what Google's policy requires. Only the
 * reviews we hold in full are marked up; the truncated ones are displayed as
 * excerpts but not asserted as reviewBody.
 */
const reviewsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `Customer reviews of ${SITE_NAME}`,
  itemListElement: completeReviews.map((review, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'Review',
      itemReviewed: {
        '@type': 'HomeAndConstructionBusiness',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
      },
      author: { '@type': 'Person', name: review.author },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(review.rating),
        bestRating: '5',
        worstRating: '1',
      },
      datePublished: review.date,
      reviewBody: review.text,
    },
  })),
};

export const metadata: Metadata = {
  title: `Customer Reviews | 5.0★ Google Rating | 19 Reviews`,
  description: `Read 19 verified 5-star Google reviews from Massachusetts homeowners. See why ${SITE_NAME} is the #1 rated siding, window & door contractor in MA. Licensed HIC #${HIC_NUMBER}.`,
  alternates: { canonical: `${SITE_URL}/reviews` },
};

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={reviewsSchema} />

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
            19 verified 5-star Google reviews from real customers across Middlesex, Worcester, Norfolk, and Essex counties.
            Licensed HIC #{HIC_NUMBER}. Serving 75+ Massachusetts cities since 2015.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-amber-400">5.0</p>
              <p className="text-gray-400 text-sm">Google Rating</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-amber-400">19</p>
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

      {/* The reviews themselves, as text in the HTML.
          This page used to be 380 visible words: the widget below loads from a
          third party after hydration, so on a static export Google indexed a
          page with a heading, four numbers and nothing else. */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <article
                  key={review.author + review.date}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-amber-400 tracking-tight" aria-hidden="true">
                      ★★★★★
                    </span>
                    <span className="sr-only">{review.rating} out of 5 stars</span>
                    <time
                      dateTime={review.date}
                      className="text-slate-500 text-sm ml-auto tabular-nums"
                    >
                      {new Date(review.date).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </time>
                  </div>

                  {review.text ? (
                    <blockquote className="text-slate-700 leading-relaxed flex-1">
                      “{review.text}
                      {review.excerpt ? '…' : ''}”
                    </blockquote>
                  ) : (
                    <p className="text-slate-500 italic flex-1">
                      Five stars, left without a written review.
                    </p>
                  )}

                  <footer className="mt-4 pt-4 border-t border-slate-200">
                    <p className="font-semibold text-slate-900">{review.author}</p>
                    {review.work && (
                      <p className="text-slate-500 text-sm">{review.work}</p>
                    )}
                    {review.excerpt && (
                      <a
                        href={GOOGLE_PROFILE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-600 text-sm font-semibold hover:text-amber-700 inline-block mt-1"
                      >
                        Read the full review on Google →
                      </a>
                    )}
                  </footer>
                </article>
              ))}
            </div>

            <p className="text-center text-slate-500 text-sm mt-10 max-w-2xl mx-auto">
              All {REVIEW_COUNT} reviews are from our Google Business Profile and are
              reproduced here as written. Where Google truncates a review in its own
              listing, we show the opening and link to the full text rather than
              paraphrasing it.
            </p>
          </div>
        </div>
      </section>

      {/* Live Google widget, as a second source */}
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
