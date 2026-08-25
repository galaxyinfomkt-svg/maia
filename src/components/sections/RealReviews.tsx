import { reviewsFor, GOOGLE_PROFILE_URL, REVIEW_COUNT, AVERAGE_RATING } from '@/lib/reviews';
import { SITE_NAME } from '@/lib/constants';

interface RealReviewsProps {
  /** Keys which three reviews this page shows, so neighbouring pages differ. */
  seed: string;
  cityName?: string;
}

/**
 * Three real Google reviews, rendered as text in the HTML.
 *
 * This replaces <Testimonials>, which carried four quotes written in-house and
 * attributed to named customers. These are the customers' own words, and they
 * rotate by page so two nearby city pages do not show the same three.
 *
 * No Review markup here on purpose: the same quote appearing across hundreds of
 * pages is exactly the pattern that got the old markup into trouble. The
 * structured data lives once, on /reviews/.
 */
export default function RealReviews({ seed, cityName }: RealReviewsProps) {
  const picked = reviewsFor(seed, 3);

  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-5" />
          <p className="text-white/70">
            {AVERAGE_RATING} across {REVIEW_COUNT} Google reviews
            {cityName ? ` — from homeowners near ${cityName} and across Massachusetts` : ''}.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {picked.map((review) => (
            <article
              key={review.author + review.date}
              className="bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-amber-400" aria-hidden="true">
                  ★★★★★
                </span>
                <span className="sr-only">{review.rating} out of 5 stars</span>
              </div>

              <blockquote className="text-white/85 leading-relaxed flex-1">
                “{review.text}
                {review.excerpt ? '…' : ''}”
              </blockquote>

              <footer className="mt-4 pt-4 border-t border-white/10">
                <p className="font-semibold">{review.author}</p>
                {review.work && (
                  <p className="text-white/50 text-sm">{review.work}</p>
                )}
              </footer>
            </article>
          ))}
        </div>

        <p className="text-center mt-10">
          <a
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 font-semibold hover:text-amber-300"
          >
            Read all {REVIEW_COUNT} reviews on Google →
          </a>
        </p>
      </div>
    </section>
  );
}
