import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { HeroWithForm, ServicesSection, Testimonials, CTASection, WhyChooseUs, ReviewsHighlight } from '@/components/sections';
import { ContactForm } from '@/components/forms';
import { JsonLd, Breadcrumbs } from '@/components/seo';
import { cities, getCityBySlug, getNearbyCities } from '@/lib/cities';
import { services } from '@/lib/services';
import { getCityProfile } from '@/lib/content-engine';
import { SITE_NAME, PHONE, LOGO_URL, REAL_PHOTOS, HIC_NUMBER } from '@/lib/constants';

const VideoGallery = dynamic(() => import('@/components/sections/VideoGallery'), {
  loading: () => <div className="py-24 bg-white" />,
});

const BeforeAfter = dynamic(() => import('@/components/sections/BeforeAfter'), {
  loading: () => <div className="py-24 bg-slate-900" />,
});

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (!city) return {};

  const title = `#1 Contractor in ${city.name}, MA (2026) | Siding, Windows & Doors | 5.0★`;
  const description = `${city.name}'s top-rated contractor ★5.0. Expert siding, window & door installation. 500+ projects in ${city.county} County. Licensed HIC #204634. Call ${PHONE} — FREE estimate!`;

  return {
    title,
    description,
    keywords: [
      `contractor ${city.name} MA`,
      `siding installation ${city.name} MA`,
      `window replacement ${city.name} MA`,
      `door installation ${city.name} MA`,
      `home improvement ${city.name} Massachusetts`,
      `${city.zip} contractor`,
      `best contractor ${city.name}`,
    ],
    openGraph: {
      title,
      description,
    },
    alternates: {
      canonical: `https://maiaconstruction.com/cities/${city.slug}`,
    },
    // Noindex distant cities to avoid thin content penalty — focus authority on nearby areas
    ...(city.distance > 50 ? { robots: { index: false, follow: true } } : {}),
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
      reviewCount: '19',
    },
  };

  const cityFaqs = [
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
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cityFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={faqSchema} />

      <HeroWithForm
        title={<>Professional <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">Construction Services</span> in {city.name}, MA</>}
        subtitle={`Expert siding, door & windows installation just ${city.distance} miles from our Charlton office. Serving ${city.zip} and surrounding areas in ${city.county} County.`}
        badge={`${city.name}, MA • 5.0 Stars • Licensed HIC #${HIC_NUMBER}`}
        backgroundImage={REAL_PHOTOS[Math.abs(city.slug.length + 3) % REAL_PHOTOS.length]}
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
                  Located just {city.distance} miles from our headquarters in Charlton, we provide
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
                      <div>
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
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs cityName={city.name} />

      {/* City Profile: Neighborhoods & Housing Types */}
      {(() => {
        const profile = getCityProfile(city);
        return (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  About {city.name} Homes &amp; Neighborhoods
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mb-8" />
                <p className="text-lg text-gray-600 mb-6">
                  {city.name} features {profile.localFlavor}. Homes in this area average {profile.avgHomeAge} old,
                  dating from the {profile.foundedEra} period. Our team has extensive experience working on the
                  diverse housing stock found throughout {city.name} and {city.county} County.
                </p>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {city.name} Neighborhoods We Serve
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.neighborhoods.map((neighborhood, i) => (
                      <span key={i} className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-sm font-medium">
                        {neighborhood}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {city.name} Housing Types We Work On
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {profile.housingTypes.map((type, i) => (
                      <div key={i} className="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg">
                        <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        <span className="text-gray-700 text-sm font-medium">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {profile.commonIssues.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      Common Home Improvement Challenges in {city.name}
                    </h3>
                    <div className="space-y-3">
                      {profile.commonIssues.map((issue, i) => (
                        <div key={i} className="flex items-start space-x-3 p-3 bg-red-50 rounded-xl border border-red-100">
                          <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700 text-sm">{issue}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })()}

      <BeforeAfter
        title={`${city.name} Before & After Transformations`}
        subtitle={`Real exterior transformations near ${city.name} — drag to compare before and after`}
      />

      <VideoGallery
        title={`Our Projects in ${city.name}`}
        subtitle={`Watch our team transform homes in ${city.name} and across Massachusetts`}
      />

      <ReviewsHighlight />

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
            {cityFaqs.map((faq, index) => (
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

      {/* AEO Block + Blog Backlinks */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="aeo-answer aeo-speakable bg-slate-50 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Home Improvement Contractor in {city.name}, Massachusetts
              </h2>
              <p className="text-gray-600 mb-4">
                {SITE_NAME} is the top-rated home improvement contractor serving {city.name}, {city.county} County,
                Massachusetts. With a 5.0-star Google rating and 500+ completed projects, we provide professional{' '}
                <Link href={`/services/siding/${city.slug}`} className="text-amber-600 hover:underline">siding installation</Link>,{' '}
                <Link href={`/services/windows/${city.slug}`} className="text-amber-600 hover:underline">window replacement</Link>,{' '}
                <Link href={`/services/doors/${city.slug}`} className="text-amber-600 hover:underline">door installation</Link>, and{' '}
                <Link href={`/services/general-contractor/${city.slug}`} className="text-amber-600 hover:underline">general contracting</Link>{' '}
                services. Licensed MA HIC #204634. Call {PHONE} for a free estimate.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Link href="/blog/how-to-choose-right-siding" className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-gray-600 hover:border-amber-400 hover:text-amber-600">
                  Siding Guide
                </Link>
                <Link href="/blog/energy-efficient-windows-guide" className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-gray-600 hover:border-amber-400 hover:text-amber-600">
                  Window Guide
                </Link>
                <Link href="/blog/window-replacement-cost-massachusetts" className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-gray-600 hover:border-amber-400 hover:text-amber-600">
                  Cost Guide
                </Link>
                <Link href="/about" className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-gray-600 hover:border-amber-400 hover:text-amber-600">
                  About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection cityName={city.name} />
    </>
  );
}
