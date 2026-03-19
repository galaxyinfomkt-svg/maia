import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { HeroWithForm, CTASection, WhyChooseUs, ReviewsHighlight } from '@/components/sections';
import { JsonLd, Breadcrumbs } from '@/components/seo';
import { services, getServiceBySlug } from '@/lib/services';
import { cities, getCityBySlug, getNearbyCities } from '@/lib/cities';
import { SITE_NAME, PHONE, SITE_URL, PHONE_LINK, HIC_NUMBER, IMAGES } from '@/lib/constants';

const BeforeAfter = dynamic(() => import('@/components/sections/BeforeAfter'), {
  loading: () => <div className="py-24 bg-slate-900" />,
});
const VideoGallery = dynamic(() => import('@/components/sections/VideoGallery'), {
  loading: () => <div className="py-24 bg-white" />,
});

interface ServiceCityPageProps {
  params: Promise<{ service: string; city: string }>;
}

export async function generateStaticParams() {
  const params: { service: string; city: string }[] = [];
  for (const service of services) {
    for (const city of cities) {
      params.push({ service: service.slug, city: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: ServiceCityPageProps): Promise<Metadata> {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) return {};

  const title = `${service.name} Contractor ${city.name} MA | Expert ${service.name} | Call Now | ${SITE_NAME}`;
  const description = `#1 ${service.name.toLowerCase()} contractor in ${city.name}, MA ★5.0. 500+ projects in ${city.county} County. Licensed HIC #${HIC_NUMBER} & insured. FREE estimates. Call ${PHONE}`;

  return {
    title,
    description,
    keywords: [
      `${service.name.toLowerCase()} ${city.name}`,
      `${service.name.toLowerCase()} contractor ${city.name} MA`,
      `${service.name.toLowerCase()} installation ${city.name}`,
      `best ${service.name.toLowerCase()} ${city.name}`,
    ],
    openGraph: { title, description, images: [{ url: service.image }] },
    alternates: { canonical: `${SITE_URL}/services/${service.slug}/${city.slug}` },
    ...(city.distance > 50 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function ServiceCityPage({ params }: ServiceCityPageProps) {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) notFound();

  const nearbyCities = getNearbyCities(city.slug, 6);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: `${SITE_NAME} - ${city.name}`,
    telephone: PHONE,
    address: { '@type': 'PostalAddress', addressLocality: city.name, addressRegion: 'MA', postalCode: city.zip, addressCountry: 'US' },
    areaServed: { '@type': 'City', name: city.name },
    priceRange: '$$',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', bestRating: '5', worstRating: '1', reviewCount: '47' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Massachusetts', item: `${SITE_URL}/massachusetts` },
      { '@type': 'ListItem', position: 3, name: service.name, item: `${SITE_URL}/services/${service.slug}` },
      { '@type': 'ListItem', position: 4, name: `${city.name}, MA`, item: `${SITE_URL}/services/${service.slug}/${city.slug}` },
    ],
  };

  const faqItems = [
    { q: `How much does ${service.name.toLowerCase()} cost in ${city.name}?`, a: `${service.name} costs in ${city.name} vary by project size and materials. Vinyl siding runs $6-12/sq ft, windows $300-1,200 each, and doors $1,500-5,000+. Contact us for a free, detailed estimate specific to your ${city.name} home.` },
    { q: `Do you serve all neighborhoods in ${city.name}?`, a: `Yes! We serve all areas of ${city.name}, ${city.county} County, including ZIP code ${city.zip} and surrounding neighborhoods. We're just ${city.distance} miles from your location.` },
    { q: `How quickly can you start in ${city.name}?`, a: `We typically provide free estimates within 24-48 hours for ${city.name} residents. Most projects begin within 1-2 weeks of contract signing, depending on season and material availability.` },
    { q: `Are you licensed to work in ${city.name}, MA?`, a: `Absolutely. ${SITE_NAME} holds Massachusetts HIC #${HIC_NUMBER}. We're fully licensed, bonded, and insured for all residential ${service.name.toLowerCase()} work in ${city.county} County.` },
    { q: `What warranty do you offer in ${city.name}?`, a: `All ${service.name.toLowerCase()} installations in ${city.name} include a 5-year workmanship warranty plus 25-50 year manufacturer warranties on materials. We stand behind every project.` },
    { q: `Why choose ${SITE_NAME} for ${service.name.toLowerCase()} in ${city.name}?`, a: `We're rated 5.0 stars on Google with 47+ reviews, have completed 500+ projects, and are ${city.distance} miles from ${city.name}. Licensed HIC #${HIC_NUMBER}, certified installers, free estimates, and transparent pricing.` },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Get ${service.name} in ${city.name}, MA`,
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: 'Free Estimate' },
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Free Consultation', text: `We visit your ${city.name} home to assess needs and provide a detailed quote.` },
      { '@type': 'HowToStep', position: 2, name: 'Material Selection', text: 'Choose from premium materials that fit your style and budget.' },
      { '@type': 'HowToStep', position: 3, name: 'Expert Installation', text: `Our certified team completes the ${service.name.toLowerCase()} installation with precision.` },
      { '@type': 'HowToStep', position: 4, name: 'Final Walkthrough', text: 'We inspect everything and ensure your complete satisfaction.' },
    ],
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={howToSchema} />

      {/* Hero with Form - Same layout as Homepage */}
      <HeroWithForm
        badge={`📍 ${city.name}, MA • ${service.icon} ${service.name} • 5-Star Rated`}
        title={
          <>
            Expert{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              {service.name}
            </span>{' '}
            in {city.name}, Massachusetts
          </>
        }
        subtitle={`Professional ${service.name.toLowerCase()} installation in ${city.name}, ${city.county} County. Just ${city.distance} miles from our office. Licensed HIC #${HIC_NUMBER} & insured. FREE estimates.`}
        backgroundImage={service.image}
      />

      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: 'Massachusetts', href: '/massachusetts' },
              { label: service.name, href: `/services/${service.slug}` },
              { label: city.name },
            ]}
          />
        </div>
      </div>

      {/* Why Choose Us */}
      <WhyChooseUs cityName={city.name} />

      {/* Service Details */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Your Trusted {service.name} Contractor in {city.name}
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Looking for professional {service.name.toLowerCase()} in {city.name}, Massachusetts?
                {SITE_NAME} is your trusted local contractor, providing expert {service.name.toLowerCase()} installation,
                repair, and replacement throughout {city.county} County.
              </p>
              <p className="text-gray-600 mb-6">
                {service.fullDescription} As {city.name} residents know, New England weather demands quality exterior
                solutions. Our {service.name.toLowerCase()} products are specifically chosen to withstand harsh winters,
                humid summers, and everything in between.
              </p>

              {/* Features */}
              <h3 className="text-2xl font-bold text-slate-900 mb-4">What We Offer in {city.name}</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl">
                    <svg className="w-6 h-6 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-amber-50 p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold text-amber-600">5.0★</p>
                  <p className="text-sm text-gray-600">Google Rating</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold text-amber-600">500+</p>
                  <p className="text-sm text-gray-600">Projects Done</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold text-amber-600">{city.distance}mi</p>
                  <p className="text-sm text-gray-600">From {city.name}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold text-amber-600">FREE</p>
                  <p className="text-sm text-gray-600">Estimates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <BeforeAfter
        title={`${service.name} Transformations`}
        subtitle={`See the quality of our ${service.name.toLowerCase()} work in ${city.county} County`}
      />

      {/* Video Gallery */}
      <VideoGallery
        title={`${service.name} Projects in Action`}
        subtitle={`Watch our team install ${service.name.toLowerCase()} across Massachusetts`}
      />

      {/* Reviews */}
      <ReviewsHighlight />

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {service.name} FAQs — {city.name}, MA
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqItems.map((faq, index) => (
              <details key={index} className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 group">
                <summary className="px-6 py-5 cursor-pointer hover:bg-slate-100 transition-colors flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 pr-4">{faq.q}</h3>
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services in this City */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            Other Services in {city.name}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-8" />
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {services.filter(s => s.slug !== service.slug).map((otherService) => (
              <Link
                key={otherService.slug}
                href={`/services/${otherService.slug}/${city.slug}`}
                className="group p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all text-center"
              >
                <span className="text-3xl">{otherService.icon}</span>
                <h3 className="font-bold text-slate-900 group-hover:text-amber-500 transition-colors mt-3">
                  {otherService.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">in {city.name}, MA</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Cities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            {service.name} Near {city.name}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {nearbyCities.map((nearbyCity) => (
              <Link
                key={nearbyCity.slug}
                href={`/services/${service.slug}/${nearbyCity.slug}`}
                className="group p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all text-center"
              >
                <svg className="w-6 h-6 text-amber-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-500 transition-colors">{nearbyCity.name}</h3>
                <p className="text-xs text-gray-500">{nearbyCity.distance} mi</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            Service Area: {city.name}, MA
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-8" />
          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 max-w-4xl mx-auto">
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(city.name + ', MA')}&zoom=13`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title={`${city.name} MA service area map`}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title={`Get Your FREE ${service.name} Estimate in ${city.name}`}
        subtitle={`Ready for professional ${service.name.toLowerCase()}? Call now or request a free quote — no obligation.`}
        cityName={city.name}
      />
    </>
  );
}
