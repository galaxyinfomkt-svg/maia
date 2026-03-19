import { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo';
import { SITE_NAME, PHONE, PHONE_LINK, SITE_URL, HIC_NUMBER, SOCIAL_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Customer Reviews | 5.0★ Google Rating | 47+ Reviews | ${SITE_NAME}`,
  description: `Read 47+ verified 5-star Google reviews from Massachusetts homeowners. See why ${SITE_NAME} is the #1 rated siding, window & door contractor in MA. Licensed HIC #${HIC_NUMBER}.`,
  alternates: { canonical: `${SITE_URL}/reviews` },
};

const reviews = [
  { name: 'Michael S.', location: 'Framingham, MA', rating: 5, text: 'Maia Construction did an amazing job on our siding. The crew was professional, clean, and finished ahead of schedule. Our home looks brand new! We had vinyl siding installed on our 1960s colonial and the transformation is incredible. Marcos personally oversaw the project and made sure every detail was perfect.', service: 'Siding Installation', date: 'January 2026' },
  { name: 'Jennifer L.', location: 'Worcester, MA', rating: 5, text: 'We replaced all our windows and the difference in energy bills is incredible. Marcos and his team were fantastic to work with from start to finish. Our triple-decker had original windows from the 1950s and we were losing so much heat. The new ENERGY STAR windows cut our heating bill by about 30%. Worth every penny.', service: 'Window Replacement', date: 'February 2026' },
  { name: 'Robert & Susan T.', location: 'Natick, MA', rating: 5, text: 'Best contractor experience we\'ve ever had. Fair pricing, excellent communication, and the quality of work exceeded our expectations. They replaced our siding, windows, and front door as one project. Having a single crew handle everything made the process so smooth. Highly recommend Maia Construction!', service: 'Complete Exterior Renovation', date: 'December 2025' },
  { name: 'David M.', location: 'Marlborough, MA', rating: 5, text: 'Our new Therma-Tru entry door transformed the look of our home. The installation was quick and professional — done in one day. They also installed a smart lock system which we love. Maia Construction is now our go-to contractor for everything.', service: 'Door Installation', date: 'November 2025' },
  { name: 'Sarah K.', location: 'Hudson, MA', rating: 5, text: 'We had James Hardie fiber cement siding installed and it looks absolutely stunning. The crew was respectful of our property, covered all landscaping, and cleaned up every day. Three neighbors have already asked for Maia\'s number after seeing our house!', service: 'James Hardie Siding', date: 'March 2026' },
  { name: 'Carlos P.', location: 'Framingham, MA', rating: 5, text: 'Como brasileiro, foi otimo trabalhar com o Marcos que fala portugues. Fizeram um trabalho incrivel no siding da nossa casa. Profissionais, pontuais, e o preco foi justo. Recomendo para toda a comunidade brasileira em Massachusetts!', service: 'Vinyl Siding', date: 'January 2026' },
  { name: 'Linda & Tom W.', location: 'Sudbury, MA', rating: 5, text: 'We replaced 18 windows in our colonial and the difference is night and day. No more drafts, no more condensation, and our home is so much quieter. The crew finished in just 2 days and left our home spotless. The Mass Save rebate process was handled smoothly too.', service: 'Window Replacement', date: 'February 2026' },
  { name: 'Amanda R.', location: 'Ashland, MA', rating: 5, text: 'Got a complete exterior makeover — new vinyl siding, trim, and soffit. Marcos was transparent about pricing from day one. No surprise charges, no upselling. The final result exceeded what I imagined. My home went from looking dated to looking like new construction.', service: 'Siding & Trim', date: 'October 2025' },
  { name: 'James & Patricia H.', location: 'Hopkinton, MA', rating: 5, text: 'We needed a storm door and new patio slider. Maia Construction recommended ProVia products and the quality is outstanding. The patio door has transformed our back living space — so much more light and the Low-E glass keeps the heat out in summer. Professional from estimate to completion.', service: 'Door Installation', date: 'September 2025' },
  { name: 'Mark D.', location: 'Westborough, MA', rating: 5, text: 'Had our entire home re-sided with insulated vinyl. The energy savings are real — our first winter heating bill was 22% lower than the previous year. The crew worked through some cold days to stay on schedule. Really impressed with their work ethic and craftsmanship.', service: 'Insulated Siding', date: 'March 2026' },
  { name: 'Nancy B.', location: 'Newton, MA', rating: 5, text: 'Living in Newton, I had high expectations for contractors. Maia Construction exceeded them all. They replaced our bay window and 12 other windows with triple-pane glass. The noise reduction from the street is remarkable. Licensed, insured, and truly professional.', service: 'Window Replacement', date: 'January 2026' },
  { name: 'Chris & Maria F.', location: 'Concord, MA', rating: 5, text: 'Our 1800s colonial needed careful attention to maintain its historic character while upgrading efficiency. Marcos understood exactly what we needed. The new windows look period-appropriate but perform like modern triple-pane. Couldn\'t be happier with the result.', service: 'Historic Home Windows', date: 'November 2025' },
];

const aggregateRatingSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: SITE_NAME,
  url: SITE_URL,
  telephone: PHONE,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    bestRating: '5',
    worstRating: '1',
    reviewCount: '47',
    ratingCount: '47',
  },
  review: reviews.slice(0, 10).map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    datePublished: r.date.includes('2026') ? '2026-01-15' : '2025-10-15',
    reviewBody: r.text,
    reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
  })),
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={aggregateRatingSchema} />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/20 rounded-full text-amber-400 font-semibold text-sm mb-6">
            ★★★★★ 5.0 Average Rating
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

      {/* Reviews Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-slate-100">
                <StarRating rating={review.rating} />
                <p className="mt-4 text-gray-600 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-amber-600 font-semibold">{review.service}</p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews CTA */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            See All Our Reviews on Google
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Read all 47+ verified reviews directly on Google
            and see why Massachusetts homeowners trust {SITE_NAME} for their home exterior projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={SOCIAL_LINKS.google}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-white border-2 border-slate-200 rounded-full font-bold hover:border-amber-400 hover:shadow-lg transition-all"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Read All Google Reviews
            </a>
            <a
              href="https://g.page/r/CaC0u5sFaCEdEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold hover:shadow-lg transition-all"
            >
              ★ Leave Us a Review
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Join Our 5-Star Family?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get your free, no-obligation estimate today. See why every single customer gives us 5 stars.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={PHONE_LINK} className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold text-lg hover:shadow-xl transition-all">
              Call {PHONE}
            </a>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-slate-900 transition-all">
              Get Free Estimate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
