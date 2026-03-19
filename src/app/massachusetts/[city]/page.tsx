import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Hero, CTASection, WhyChooseUs } from '@/components/sections';
import { JsonLd, Breadcrumbs } from '@/components/seo';
import { services } from '@/lib/services';
import { cities, getCityBySlug, getNearbyCities } from '@/lib/cities';
import { SITE_NAME, SITE_URL, PHONE, PHONE_LINK, HIC_NUMBER, LOGO_URL } from '@/lib/constants';

interface MACityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: MACityPageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  const title = `Siding & Window Contractor ${city.name} MA | Expert Installation | Call Now | ${SITE_NAME}`;
  const description = `#1 rated contractor in ${city.name}, MA ★5.0. Expert siding, windows & doors. 500+ projects in ${city.county} County. Licensed HIC #${HIC_NUMBER}. FREE estimate. Call ${PHONE}`;

  return {
    title,
    description,
    keywords: [
      `contractor ${city.name} MA`,
      `siding ${city.name} MA`,
      `windows ${city.name} MA`,
      `doors ${city.name} MA`,
      `home improvement ${city.name}`,
      `best contractor ${city.name}`,
    ],
    openGraph: { title, description },
    alternates: { canonical: `${SITE_URL}/massachusetts/${city.slug}` },
    ...(city.distance > 50 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function MACityPage({ params }: MACityPageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const nearbyCities = getNearbyCities(city.slug, 6);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: `${SITE_NAME} - ${city.name}`,
    image: LOGO_URL,
    telephone: PHONE,
    url: SITE_URL,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: 'MA',
      postalCode: city.zip,
      addressCountry: 'US',
    },
    areaServed: { '@type': 'City', name: city.name },
    priceRange: '$$',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '47' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Massachusetts', item: `${SITE_URL}/massachusetts` },
      { '@type': 'ListItem', position: 3, name: `${city.name}, MA`, item: `${SITE_URL}/massachusetts/${city.slug}` },
    ],
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />

      <Hero
        title={`Home Improvement Contractor in ${city.name}, MA`}
        subtitle={`Professional siding, windows, doors & general contracting in ${city.name}. ${city.distance} miles from our office. Serving all of ${city.county} County.`}
        badge={`${city.name}, MA • 5.0★ • Licensed HIC #${HIC_NUMBER}`}
        size="inner"
      />

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Massachusetts', href: '/massachusetts' },
              { label: `${city.name}, MA` },
            ]}
          />
        </div>
      </div>

      {/* Trust Bar */}
      <section className="py-4 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-white text-sm">
            <span className="flex items-center gap-2">
              <span className="text-amber-400">★★★★★</span> 5.0 Google Rating
            </span>
            <span className="w-px h-4 bg-white/20 hidden md:block" />
            <span>500+ Projects</span>
            <span className="w-px h-4 bg-white/20 hidden md:block" />
            <span>Licensed HIC #{HIC_NUMBER}</span>
            <span className="w-px h-4 bg-white/20 hidden md:block" />
            <span>FREE Estimates</span>
          </div>
        </div>
      </section>

      {/* Services in This City */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Our Services in {city.name}, MA
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional home improvement services for {city.name} homeowners.
              Licensed, insured, and rated 5.0 stars.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/massachusetts/${city.slug}/${service.slug}`}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.name} installation in ${city.name}, Massachusetts by ${SITE_NAME}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-4xl">{service.icon}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-500 transition-colors mb-2">
                    {service.name} in {city.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{service.shortDescription}</p>
                  <span className="text-amber-500 font-semibold text-sm flex items-center">
                    Get FREE Estimate
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About This City */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="aeo-answer aeo-speakable bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Why {city.name} Homeowners Choose {SITE_NAME}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {SITE_NAME} is the #1 rated home improvement contractor serving {city.name}, Massachusetts.
                Based in Marlborough (just {city.distance} miles away), we provide expert{' '}
                <Link href={`/massachusetts/${city.slug}/siding`} className="text-amber-600 hover:underline font-semibold">siding</Link>,{' '}
                <Link href={`/massachusetts/${city.slug}/windows`} className="text-amber-600 hover:underline font-semibold">window</Link>,{' '}
                <Link href={`/massachusetts/${city.slug}/doors`} className="text-amber-600 hover:underline font-semibold">door</Link>, and{' '}
                <Link href={`/massachusetts/${city.slug}/general-contractor`} className="text-amber-600 hover:underline font-semibold">general contracting</Link>{' '}
                services throughout {city.county} County. With a 5.0-star Google rating, MA HIC #{HIC_NUMBER} license,
                and 500+ completed projects, we deliver results that last.
              </p>

              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-amber-50 p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold text-amber-600">5.0★</p>
                  <p className="text-sm text-gray-600">Google Rating</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold text-amber-600">500+</p>
                  <p className="text-sm text-gray-600">Projects</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold text-amber-600">{city.distance}mi</p>
                  <p className="text-sm text-gray-600">From HQ</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold text-amber-600">FREE</p>
                  <p className="text-sm text-gray-600">Estimates</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={PHONE_LINK}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold hover:shadow-xl transition-all"
                >
                  Call {PHONE}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border-2 border-amber-400 text-amber-600 rounded-full font-bold hover:bg-amber-50 transition-all"
                >
                  Get Free Estimate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs cityName={city.name} />

      {/* Nearby Cities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            We Also Serve Nearby Cities
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {nearbyCities.map((nearbyCity) => (
              <Link
                key={nearbyCity.slug}
                href={`/massachusetts/${nearbyCity.slug}`}
                className="group p-6 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all text-center"
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
        </div>
      </section>

      <CTASection cityName={city.name} />
    </>
  );
}
