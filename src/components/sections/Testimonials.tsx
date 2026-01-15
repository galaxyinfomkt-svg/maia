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
