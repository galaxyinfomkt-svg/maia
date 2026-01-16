import Link from 'next/link';
import { SOCIAL_LINKS } from '@/lib/constants';

const reviews = [
  {
    id: 1,
    name: 'Michael S.',
    location: 'Framingham, MA',
    rating: 5,
    text: 'Maia Construction did an amazing job on our siding. The crew was professional, clean, and finished ahead of schedule. Our home looks brand new!',
    service: 'Siding Installation',
    date: '2024',
  },
  {
    id: 2,
    name: 'Jennifer L.',
    location: 'Worcester, MA',
    rating: 5,
    text: 'We replaced all our windows and the difference in energy bills is incredible. Marcos and his team were fantastic to work with from start to finish.',
    service: 'Window Replacement',
    date: '2024',
  },
  {
    id: 3,
    name: 'Robert & Susan T.',
    location: 'Natick, MA',
    rating: 5,
    text: 'Best contractor experience we\'ve ever had. Fair pricing, excellent communication, and the quality of work exceeded our expectations. Highly recommend!',
    service: 'Complete Exterior Renovation',
    date: '2024',
  },
  {
    id: 4,
    name: 'David M.',
    location: 'Marlborough, MA',
    rating: 5,
    text: 'Our new entry door transformed the look of our home. The installation was quick and professional. Maia Construction is now our go-to contractor.',
    service: 'Door Installation',
    date: '2023',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsHighlight() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full text-amber-700 font-semibold text-sm mb-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            5.0 Average Rating from 47+ Reviews
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real reviews from Massachusetts homeowners who trusted us with their homes
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4 border-amber-400"
            >
              {/* Rating */}
              <StarRating rating={review.rating} />

              {/* Quote */}
              <p className="mt-4 text-gray-600 text-sm leading-relaxed line-clamp-4">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="font-bold text-slate-900">{review.name}</p>
                <p className="text-sm text-gray-500">{review.location}</p>
                <p className="text-xs text-amber-600 font-medium mt-1">{review.service}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={SOCIAL_LINKS.google}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white border-2 border-slate-200 rounded-full font-semibold hover:border-amber-400 hover:shadow-md transition-all"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Read All Reviews on Google
            </a>
            <a
              href="https://g.page/r/CaC0u5sFaCEdEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold hover:shadow-lg transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Leave Us a Review
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
