const testimonials = [
  {
    name: 'John M.',
    location: 'Framingham, MA',
    rating: 5,
    text: 'Maia Construction did an amazing job on our siding. Professional from start to finish. The crew was punctual, clean, and the quality of work exceeded our expectations.',
    service: 'Siding Installation',
  },
  {
    name: 'Sarah T.',
    location: 'Natick, MA',
    rating: 5,
    text: 'We had all our windows replaced and couldn\'t be happier. Our energy bills have dropped significantly, and the house feels so much more comfortable now.',
    service: 'Window Replacement',
  },
  {
    name: 'Michael R.',
    location: 'Worcester, MA',
    rating: 5,
    text: 'Outstanding service! They installed a beautiful new front door and it completely transformed the look of our home. Highly recommend Maia Construction.',
    service: 'Door Installation',
  },
  {
    name: 'Jennifer L.',
    location: 'Hudson, MA',
    rating: 5,
    text: 'From the initial quote to the final walkthrough, everything was handled professionally. Marcos and his team are true craftsmen. Will definitely use them again.',
    service: 'General Contracting',
  },
];

interface TestimonialsProps {
  title?: string;
  cityName?: string;
}

export default function Testimonials({
  title = 'What Our Customers Say',
  cityName,
}: TestimonialsProps) {
  const displayTestimonials = cityName
    ? testimonials.map((t, i) => i === 0 ? { ...t, location: `${cityName}, MA` } : t)
    : testimonials;

  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
          <div className="flex justify-center items-center space-x-2 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-white/80 mt-2">5.0 Star Rating on Google</p>

          {/* Leave a Review Button */}
          <a
            href="https://g.page/r/CaC0u5sFaCEdEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-6 px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-[length:200%_100%] animate-shimmer text-slate-900 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:scale-105 transition-all duration-300"
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Leave Us a Review
            <svg className="w-5 h-5 ml-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/90 mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>
              <div>
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-white/60 text-sm">{testimonial.location}</p>
                <p className="text-amber-400 text-sm mt-1">{testimonial.service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
