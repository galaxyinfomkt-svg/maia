import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { HeroWithForm, ServicesSection, CityGrid, CTASection, WhyChooseUs, ReviewsHighlight } from '@/components/sections';
import { JsonLd, organizationSchema, websiteSchema } from '@/components/seo';
import { cities } from '@/lib/cities';
import { SITE_NAME, HIC_NUMBER, PHONE, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: `#1 Siding & Window Contractor MA (2026) | 5.0★ 500+ Projects | ${SITE_NAME}`,
  description: `Massachusetts' top-rated exterior contractor ★5.0. 500+ homes transformed, 25-50yr warranties. James Hardie siding, ENERGY STAR windows, premium doors. Licensed HIC #${HIC_NUMBER}. Call ${PHONE} — FREE estimate!`,
  alternates: {
    canonical: SITE_URL,
  },
};

// Lazy load heavy client components
const BeforeAfter = dynamic(() => import('@/components/sections/BeforeAfter'), {
  loading: () => <div className="py-24 bg-slate-900" />,
});
const VideoGallery = dynamic(() => import('@/components/sections/VideoGallery'), {
  loading: () => <div className="py-24 bg-white" />,
});
const FAQ = dynamic(() => import('@/components/sections/FAQ'), {
  loading: () => <div className="py-24 bg-white" />,
});

export default function HomePage() {
  const featuredCities = cities.slice(0, 12);

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />

      {/* Hero Section with Form */}
      <HeroWithForm
        badge={`MA Licensed Contractor • HIC #${HIC_NUMBER} • 5-Star Rated`}
        title={
          <>
            Transform Your Home with{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Premium Siding, Windows & Doors
            </span>{' '}
            Built for New England Weather
          </>
        }
        subtitle="High-durability exterior solutions with lifetime warranty protection. Transparent pricing, award-winning service, and expert installation by certified craftsmen. Serving 100+ Massachusetts communities."
      />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Services Section */}
      <ServicesSection
        title="Expert Home Exterior Services"
        subtitle="From vinyl siding to energy-efficient windows — we deliver quality craftsmanship that withstands harsh New England winters"
      />

      {/* Before & After Gallery */}
      <BeforeAfter
        title="Our Transformations"
        subtitle="See the difference quality craftsmanship makes - drag to compare before and after"
      />

      {/* Video Gallery */}
      <VideoGallery
        title="Our Projects in Action"
        subtitle="Watch our team transform homes across Massachusetts"
      />

      {/* Customer Reviews - Text Highlights */}
      <ReviewsHighlight />

      {/* FAQ Section */}
      <FAQ />

      {/* Cities We Serve */}
      <CityGrid
        title="Serving 100+ Massachusetts Communities"
        subtitle="From Boston to Worcester, Framingham to Springfield — we're your local exterior renovation experts"
        cities={featuredCities}
        limit={12}
      />

      {/* Google Maps - Our Location */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-amber-400/10 text-amber-600 rounded-full text-sm font-semibold tracking-wider uppercase mb-4">
              Our Location
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Find Us on the Map
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conveniently located in Marlborough, MA — serving 100+ communities across Massachusetts
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d377512.5184133106!2d-71.58596955!3d42.335773999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e38b5dd08e79af%3A0x1d2168059bbbb4a0!2sMaia%20Construction!5e0!3m2!1sen!2sbr!4v1771850870340!5m2!1sen!2sbr"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Maia Construction location on Google Maps"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Get Your FREE Estimate Today"
        subtitle="No obligation, no pressure. Speak with a certified expert about your project and get transparent pricing within 24 hours."
      />
    </>
  );
}
