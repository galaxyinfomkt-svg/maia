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

      {/* CTA Section */}
      <CTASection
        title="Get Your FREE Estimate Today"
        subtitle="No obligation, no pressure. Speak with a certified expert about your project and get transparent pricing within 24 hours."
      />
    </>
  );
}
