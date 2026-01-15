import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Hero, ServicesSection, Testimonials, CTASection, WhyChooseUs } from '@/components/sections';
import { ContactForm } from '@/components/forms';
import { JsonLd, Breadcrumbs } from '@/components/seo';
import { cities, getCityBySlug, getNearbyCities } from '@/lib/cities';
import { services } from '@/lib/services';
import { SITE_NAME, PHONE, LOGO_URL } from '@/lib/constants';

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return cities.map((city) => ({
    slug: city.slug,
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) return {};

  const title = `Siding, Door & Windows Installation in ${city.name}, MA`;
  const description = `Professional construction services in ${city.name}, Massachusetts. Licensed & insured contractor serving ${city.county} County. Call ${PHONE} for a free estimate!`;

  return {
    title,
    description,
    keywords: [
      `contractor ${city.name}`,
      `siding installation ${city.name} MA`,
      `window replacement ${city.name}`,
      `door installation ${city.name}`,
      `home improvement ${city.name}`,
      `${city.zip} contractor`,
    ],
    openGraph: {
      title,
      description,
    },
    alternates: {
      canonical: `https://maiaconstruction.com/cities/${city.slug}`,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) {
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '47',
    },
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />

      <Hero
        title={`Professional Construction Services in ${city.name}, Massachusetts`}
        subtitle={`Expert siding, door & windows installation just ${city.distance} miles from our Marlborough office. Serving ${city.zip} and surrounding areas in ${city.county} County.`}
        badge={`Serving ${city.name}, ${city.county} County`}
        size="inner"
      />

      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: 'Cities', href: '/cities' },
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
                Why {city.name} Homeowners Choose Maia Construction
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mb-8" />

              <div className="prose prose-lg max-w-none mb-12">
                <p>
                  {city.name} homeowners deserve the best when it comes to home improvement.
                  At Maia Construction, we bring over a decade of experience and expert craftsmanship
                  to every project in {city.county} County.
                </p>
                <p>
                  Located just {city.distance} miles from our headquarters in Marlborough, we provide
                  fast response times and personalized service to {city.name} residents. Whether you need
                  new siding to protect against harsh New England winters, energy-efficient windows to
                  reduce your heating bills, or a beautiful new entry door to enhance your curb appeal,
                  we have you covered.
                </p>
                <p>
                  Our team understands the unique challenges that homes in {city.name} and {city.county} County
                  face. From coastal humidity to winter snow loads, we select materials and installation
                  techniques specifically suited to your local conditions.
                </p>
              </div>

              {/* Services in City */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Our Services in {city.name}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}/${city.slug}`}
                      className="group p-6 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="text-4xl">{service.icon}</div>
                        <div>
                          <h4 className="text-xl font-bold text-slate-900 group-hover:text-amber-500 transition-colors mb-2">
                            {service.name}
                          </h4>
                          <p className="text-gray-600 text-sm mb-3">
                            {service.shortDescription}
                          </p>
                          <span className="text-amber-500 font-semibold flex items-center text-sm">
                            Learn More
                            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Local Info */}
              <div className="bg-slate-900 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">About {city.name}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-amber-400 mb-2">Location Details</h4>
                    <ul className="space-y-2 text-white/80">
                      <li>County: {city.county}</li>
                      <li>State: Massachusetts</li>
                      <li>ZIP Code: {city.zip}</li>
                      <li>Distance from HQ: {city.distance} miles</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-400 mb-2">Service Highlights</h4>
                    <ul className="space-y-2 text-white/80">
                      <li>Same-day estimates available</li>
                      <li>Licensed & insured contractors</li>
                      <li>Local expertise since 2015</li>
                      <li>100% satisfaction guarantee</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ContactForm city={city.slug} />
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
              We Also Serve Communities Near {city.name}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {nearbyCities.map((nearbyCity) => (
              <Link
                key={nearbyCity.slug}
                href={`/cities/${nearbyCity.slug}`}
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
              href="/cities"
              className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all"
            >
              View All {cities.length}+ Cities We Serve
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
              Frequently Asked Questions - {city.name}, MA
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto" />
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: `Do you serve all of ${city.name}, Massachusetts?`,
                a: `Yes! We proudly serve all neighborhoods throughout ${city.name}, ${city.county} County, including ${city.zip} and surrounding zip codes. We're just ${city.distance} miles from your location.`,
              },
              {
                q: `How quickly can you start a project in ${city.name}?`,
                a: `We typically provide free estimates within 24-48 hours for ${city.name} residents. Project start times vary by season, but we always work with your schedule to find convenient dates.`,
              },
              {
                q: `Are you licensed and insured to work in ${city.name}?`,
                a: `Absolutely. Maia Construction is fully licensed and insured to provide siding, door, and window installation services throughout ${city.county} County, including ${city.name}.`,
              },
              {
                q: `What makes your services different in ${city.name}?`,
                a: `We understand ${city.name}'s specific climate challenges and architectural styles. Our materials and techniques are specifically chosen for optimal performance in ${city.county} County's weather conditions.`,
              },
              {
                q: `Do you offer warranties on work done in ${city.name}?`,
                a: `Yes! All our installations in ${city.name} come with comprehensive warranties on both materials and workmanship. We stand behind every project.`,
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
