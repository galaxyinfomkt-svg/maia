import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Hero, Testimonials, CityGrid, CTASection, WhyChooseUs } from '@/components/sections';
import { ContactForm } from '@/components/forms';
import { JsonLd, Breadcrumbs } from '@/components/seo';
import { services, getServiceBySlug } from '@/lib/services';
import { cities, getCityBySlug, getNearbyCities } from '@/lib/cities';
import { SITE_NAME, PHONE, ADDRESS, LOGO_URL, IMAGES } from '@/lib/constants';

// Get different images based on service type
function getServiceImages(serviceSlug: string): string[] {
  switch (serviceSlug) {
    case 'siding':
      return [
        '/images/before-after/siding-after-framingham-ma.webp',
        '/images/before-after/exterior-after-worcester-ma.webp',
        '/images/before-after/siding-before-framingham-ma.webp',
        '/images/before-after/exterior-before-worcester-ma.webp',
      ];
    case 'windows':
      return [IMAGES.windows, IMAGES.windows2, IMAGES.windows3, IMAGES.windows4];
    case 'doors':
      return [IMAGES.doors, IMAGES.doors2, IMAGES.doors3, IMAGES.doors4];
    case 'general-contractor':
      return [
        IMAGES.generalContractor,
        IMAGES.generalContractor2,
        IMAGES.generalContractor3,
        IMAGES.generalContractor4,
      ];
    default:
      return [IMAGES.hero, IMAGES.siding, IMAGES.windows, IMAGES.doors];
  }
}

interface ServiceCityPageProps {
  params: Promise<{ service: string; city: string }>;
}

export async function generateStaticParams() {
  const params: { service: string; city: string }[] = [];

  for (const service of services) {
    for (const city of cities) {
      params.push({
        service: service.slug,
        city: city.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: ServiceCityPageProps): Promise<Metadata> {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);

  if (!service || !city) return {};

  const title = `${service.name} Contractor in ${city.name}, MA`;
  const description = `Professional ${service.name.toLowerCase()} installation and repair in ${city.name}, Massachusetts. Licensed contractor serving ${city.county} County. Call ${PHONE} for a free estimate!`;

  return {
    title,
    description,
    keywords: [
      `${service.name.toLowerCase()} ${city.name}`,
      `${service.name.toLowerCase()} installation ${city.name} MA`,
      `${service.name.toLowerCase()} contractor ${city.name}`,
      `best ${service.name.toLowerCase()} ${city.name}`,
      `${city.zip} ${service.name.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      images: [{ url: service.image }],
    },
    alternates: {
      canonical: `https://maiaconstruction.com/services/${service.slug}/${city.slug}`,
    },
  };
}

export default async function ServiceCityPage({ params }: ServiceCityPageProps) {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);

  if (!service || !city) {
    notFound();
  }

  const nearbyCities = getNearbyCities(city.slug, 6);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: `${SITE_NAME} - ${city.name}`,
    image: LOGO_URL,
    telephone: PHONE,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: 'MA',
      postalCode: city.zip,
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
    },
    priceRange: '$$',
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} Services in ${city.name}`,
    description: `Professional ${service.name.toLowerCase()} installation and repair in ${city.name}, Massachusetts.`,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: SITE_NAME,
      telephone: PHONE,
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
    },
    serviceType: service.name,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://maiaconstruction.com' },
      { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://maiaconstruction.com/services' },
      { '@type': 'ListItem', position: 3, name: service.name, item: `https://maiaconstruction.com/services/${service.slug}` },
      { '@type': 'ListItem', position: 4, name: city.name, item: `https://maiaconstruction.com/services/${service.slug}/${city.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <Hero
        title={`${service.name} Installation in ${city.name}, Massachusetts`}
        subtitle={`Professional ${service.name.toLowerCase()} services just ${city.distance} miles from our Marlborough office. Serving ${city.zip} and surrounding ${city.county} County areas.`}
        badge={`${service.icon} ${city.name}, MA`}
        size="inner"
      />

      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: service.name, href: `/services/${service.slug}` },
              { label: city.name },
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Expert {service.name} Contractor in {city.name}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mb-8" />

              <div className="prose prose-lg max-w-none mb-12">
                <p>
                  Looking for professional {service.name.toLowerCase()} services in {city.name}, Massachusetts?
                  Maia Construction is your trusted local contractor, providing expert {service.name.toLowerCase()}{' '}
                  installation, repair, and replacement throughout {city.county} County.
                </p>
                <p>
                  {service.fullDescription}
                </p>
                <p>
                  As {city.name} residents, you know the challenges that New England weather brings.
                  Our {service.name.toLowerCase()} solutions are specifically designed to withstand harsh winters,
                  humid summers, and everything in between. We use only premium materials from trusted
                  manufacturers to ensure decades of protection for your home.
                </p>
              </div>

              {/* Features */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Our {service.name} Services in {city.name}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-slate-50 rounded-xl">
                      <svg className="w-6 h-6 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Benefits for {city.name} Homeowners
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-amber-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-amber-500 font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{benefit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  {service.name} Projects in {city.county} County
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {getServiceImages(serviceSlug).slice(0, 4).map((img, index) => (
                    <div key={index} className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={img}
                        alt={`${service.name} project in ${city.name}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <ContactForm service={service.slug} city={city.slug} />

                {/* Quick Info */}
                <div className="bg-slate-900 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Quick Facts</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>Distance: {city.distance} miles</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                      <span>County: {city.county}</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span>ZIP: {city.zip}</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>Same-day estimates</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs cityName={city.name} />

      <Testimonials cityName={city.name} />

      {/* Nearby Cities */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {service.name} Services Near {city.name}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {nearbyCities.map((nearbyCity) => (
              <Link
                key={nearbyCity.slug}
                href={`/services/${service.slug}/${nearbyCity.slug}`}
                className="group p-6 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all text-center"
              >
                <svg className="w-8 h-8 text-amber-500 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <h3 className="font-bold text-slate-900 group-hover:text-amber-500 transition-colors">
                  {nearbyCity.name}
                </h3>
                <p className="text-sm text-gray-500">{nearbyCity.distance} miles</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href={`/services/${service.slug}`}
              className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all"
            >
              View All {service.name} Locations
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {service.name} FAQs - {city.name}, MA
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto" />
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: `Do you provide ${service.name.toLowerCase()} services in all of ${city.name}?`,
                a: `Yes! We proudly serve all neighborhoods throughout ${city.name}, ${city.county} County, including ${city.zip} and surrounding zip codes. We're just ${city.distance} miles from your location.`,
              },
              {
                q: `How quickly can you start a ${service.name.toLowerCase()} project in ${city.name}?`,
                a: `We typically provide free estimates within 24-48 hours for ${city.name} residents. Project start times vary by season, but we always work with your schedule.`,
              },
              {
                q: `Are you licensed and insured to work in ${city.name}?`,
                a: `Absolutely. Maia Construction is fully licensed and insured to provide ${service.name.toLowerCase()} services throughout ${city.county} County, including ${city.name}.`,
              },
              {
                q: `What warranty do you offer on ${service.name.toLowerCase()} work in ${city.name}?`,
                a: `All our ${service.name.toLowerCase()} installations in ${city.name} come with comprehensive warranties on both materials and workmanship. We stand behind every project.`,
              },
            ].map((faq, index) => (
              <details key={index} className="bg-white p-6 rounded-xl shadow-md group">
                <summary className="font-bold text-lg text-slate-900 cursor-pointer hover:text-amber-500 transition-colors flex items-center justify-between">
                  {faq.q}
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTASection cityName={city.name} />
    </>
  );
}
