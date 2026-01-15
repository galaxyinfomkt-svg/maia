import { HeroWithForm, ServicesSection, Testimonials, CityGrid, CTASection, WhyChooseUs, BeforeAfter } from '@/components/sections';
import { JsonLd } from '@/components/seo';
import { cities } from '@/lib/cities';
import { SITE_NAME, PHONE, ADDRESS, LOGO_URL, SITE_URL } from '@/lib/constants';

export default function HomePage() {
  const featuredCities = cities.slice(0, 12);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: SITE_NAME,
    image: LOGO_URL,
    telephone: PHONE,
    url: SITE_URL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.state,
      postalCode: ADDRESS.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ADDRESS.lat,
      longitude: ADDRESS.lng,
    },
    areaServed: {
      '@type': 'State',
      name: 'Massachusetts',
    },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '15:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '47',
    },
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />

      {/* Hero Section with Form */}
      <HeroWithForm
        badge="Award-Winning Construction Services"
        title={
          <>
            Expert{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Siding, Door & Windows Installation
            </span>{' '}
            in Massachusetts
          </>
        }
        subtitle="Quality, Precision, and Durability in Every Project. Founded by Marcos, serving 100+ communities across New England."
      />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Services Section */}
      <ServicesSection
        title="Our Services"
        subtitle="Professional installation and repair services for your home"
      />

      {/* Before & After Gallery */}
      <BeforeAfter
        title="Our Transformations"
        subtitle="See the difference quality craftsmanship makes - drag to compare before and after"
      />

      {/* Testimonials */}
      <Testimonials />

      {/* Cities We Serve */}
      <CityGrid
        title="Cities We Serve"
        subtitle="Professional construction services throughout Massachusetts"
        cities={featuredCities}
        limit={12}
      />

      {/* CTA Section */}
      <CTASection
        title="Ready to Transform Your Home?"
        subtitle="Get your free estimate today! Professional service, quality materials, and expert installation."
      />
    </>
  );
}
