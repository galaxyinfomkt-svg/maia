import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { HeroWithForm, CTASection, WhyChooseUs, ReviewsHighlight } from '@/components/sections';
import { JsonLd, Breadcrumbs } from '@/components/seo';
import { services } from '@/lib/services';
import { cities, getCityBySlug, getNearbyCities } from '@/lib/cities';
import { SITE_NAME, SITE_URL, PHONE, PHONE_LINK, HIC_NUMBER, LOGO_URL, REAL_PHOTOS, SERVICE_PHOTOS } from '@/lib/constants';
import { getCityProfile, getCityPageParagraphs } from '@/lib/content-engine';

const VideoGallery = dynamic(() => import('@/components/sections/VideoGallery'), {
  loading: () => <div className="py-24 bg-white" />,
});

const BeforeAfter = dynamic(() => import('@/components/sections/BeforeAfter'), {
  loading: () => <div className="py-24 bg-slate-900" />,
});

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

  const title = `Siding, Window & Door Contractor in ${city.name}, MA`;
  const description = `#1 rated contractor in ${city.name}, MA ★5.0. Expert siding, windows & doors. 500+ projects in ${city.county} County. Licensed HIC #${HIC_NUMBER}. FREE estimate. Call ${PHONE}`;

  return {
    title, description,
    keywords: [`contractor ${city.name} MA`, `siding ${city.name} MA`, `windows ${city.name} MA`, `doors ${city.name} MA`],
    openGraph: { title, description },
    alternates: { canonical: `${SITE_URL}/cities/${city.slug}` },
    ...(city.distance > 50 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function MACityPage({ params }: MACityPageProps) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const nearbyCities = getNearbyCities(city.slug, 6);
  const profile = getCityProfile(city);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${SITE_NAME} - ${city.name}`,
    image: LOGO_URL, telephone: PHONE, url: SITE_URL,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      telephone: PHONE,
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: { '@type': 'State', name: 'Massachusetts' },
    },
    // The rating belongs to the organization entity, declared once on the
    // homepage — not repeated on every city page.
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Massachusetts', item: `${SITE_URL}/massachusetts` },
      { '@type': 'ListItem', position: 3, name: `${city.name}, MA` },
    ],
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Hero with Form */}
      <HeroWithForm
        title={<>Professional <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">Home Improvement</span> Contractor in {city.name}, MA</>}
        subtitle={`Professional siding, windows, doors & general contracting in ${city.name}. ${city.distance} miles from our office. Serving all of ${city.county} County.`}
        badge={`${city.name}, MA • 5.0 Stars • Licensed HIC #${HIC_NUMBER}`}
        backgroundImage={REAL_PHOTOS[Math.abs(city.slug.length) % REAL_PHOTOS.length]}
      />

      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Massachusetts', href: '/massachusetts' },
            { label: `${city.name}, MA` },
          ]} />
        </div>
      </div>

      {/* Trust Bar */}
      <section className="py-4 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-white text-sm">
            <span className="flex items-center gap-2"><span className="text-amber-400">★★★★★</span> 5.0 Google Rating</span>
            <span className="w-px h-4 bg-white/20 hidden md:block" />
            <span>500+ Projects</span>
            <span className="w-px h-4 bg-white/20 hidden md:block" />
            <span>Licensed HIC #{HIC_NUMBER}</span>
            <span className="w-px h-4 bg-white/20 hidden md:block" />
            <span>FREE Estimates</span>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs cityName={city.name} />

      {/* Expert Services - Rich Text */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Expert Home Improvement Services in {city.name}, MA
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mb-8" />
            {/* Was three fixed paragraphs, identical on all 343 of these pages
                (and rendering "40-80 years-old construction"). Now composed
                per city by the content engine. */}
            <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
              {getCityPageParagraphs(city).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services in This City */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Our <span className="text-amber-500">Services</span> in {city.name}, MA
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional home improvement services for {city.name} homeowners. Licensed, insured, and rated 5.0 stars.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Link key={service.slug} href={`/services/${service.slug}/${city.slug}`}
                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all ${index === 0 ? 'ring-2 ring-amber-400' : 'border border-slate-200'}`}>
                <div className="relative h-48 overflow-hidden">
                  <Image src={SERVICE_PHOTOS[service.slug] || REAL_PHOTOS[index]} alt={`${service.name} in ${city.name}, MA`}
                    fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {index === 0 && <span className="absolute top-4 right-4 bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">Featured</span>}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-500 transition-colors mb-2">{service.name} in {city.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.shortDescription}</p>
                  <span className="text-amber-500 font-semibold text-sm flex items-center">
                    Get FREE Estimate <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods & Housing Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{city.name} Neighborhoods We Serve</h3>
              <p className="text-gray-600 mb-4 text-sm">We serve all areas of {city.name}, {city.county} County, ZIP {city.zip}:</p>
              <div className="flex flex-wrap gap-2">
                {profile.neighborhoods.map((n, i) => (
                  <span key={i} className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-sm font-medium">{n}</span>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{city.name} Housing Types</h3>
              <p className="text-gray-600 mb-4 text-sm">Our team has experience with homes averaging {profile.avgHomeAge} old:</p>
              <div className="space-y-2">
                {profile.housingTypes.map((type, i) => (
                  <div key={i} className="flex items-center space-x-2 p-2 bg-white rounded-lg">
                    <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                    <span className="text-gray-700 text-sm">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why City Trusts Us - Dark Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Why {city.name} Chooses <span className="text-amber-400">{SITE_NAME}</span></h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              {SITE_NAME} is the #1 rated home improvement contractor serving {city.name}, Massachusetts.
              Based in Charlton (just {city.distance} miles away), we provide expert{' '}
              <Link href={`/services/siding/${city.slug}`} className="text-amber-400 hover:underline">siding</Link>,{' '}
              <Link href={`/services/windows/${city.slug}`} className="text-amber-400 hover:underline">window</Link>,{' '}
              <Link href={`/services/doors/${city.slug}`} className="text-amber-400 hover:underline">door</Link>, and{' '}
              <Link href={`/services/general-contractor/${city.slug}`} className="text-amber-400 hover:underline">general contracting</Link>{' '}
              services throughout {city.county} County. With a 5.0-star Google rating, MA HIC #{HIC_NUMBER} license,
              and 500+ completed projects, we deliver results that last.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center"><p className="text-3xl font-bold text-amber-400">5.0★</p><p className="text-sm text-gray-400">Google Rating</p></div>
              <div className="text-center"><p className="text-3xl font-bold text-amber-400">500+</p><p className="text-sm text-gray-400">Projects</p></div>
              <div className="text-center"><p className="text-3xl font-bold text-amber-400">{city.distance}mi</p><p className="text-sm text-gray-400">From HQ</p></div>
              <div className="text-center"><p className="text-3xl font-bold text-amber-400">FREE</p><p className="text-sm text-gray-400">Estimates</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <BeforeAfter
        title={`Before & After — ${city.name} Area`}
        subtitle="Real exterior transformations across Massachusetts — drag to compare"
      />

      {/* Video Gallery */}
      <VideoGallery title={`Our Projects in ${city.county} County`} subtitle={`Watch our team transform homes across Massachusetts`} />

      {/* Reviews */}
      <ReviewsHighlight />

      {/* Nearby Cities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">We Also Serve Nearby Cities</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {nearbyCities.map((nearbyCity) => (
              <Link key={nearbyCity.slug} href={`/cities/${nearbyCity.slug}/`}
                className="group p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all text-center">
                <svg className="w-6 h-6 text-amber-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
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
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">Service Area: {city.name}, MA</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-8" />
          <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 max-w-4xl mx-auto">
            <iframe src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY ?? ''}&q=${encodeURIComponent(city.name + ', MA')}&zoom=13`}
              width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" title={`${city.name} MA map`} />
          </div>
        </div>
      </section>

      {/* Gold CTA Banner */}
      <section className="py-8 bg-gradient-to-r from-amber-400 to-yellow-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Ready to Start Your Project in {city.name}?</h2>
              <p className="text-slate-700 mt-1">Expert siding, windows, doors — free estimates, no obligation.</p>
            </div>
            <a href={PHONE_LINK} className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all whitespace-nowrap">
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
