import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { HeroWithForm, CTASection, WhyChooseUs, ReviewsHighlight } from '@/components/sections';
import { JsonLd, Breadcrumbs } from '@/components/seo';
import { services, getServiceBySlug } from '@/lib/services';
import { cities, getCityBySlug, getNearbyCities } from '@/lib/cities';
import { SITE_NAME, PHONE, SITE_URL, PHONE_LINK, HIC_NUMBER, REAL_PHOTOS } from '@/lib/constants';
import { getServiceContent, getUniqueFAQs, getUniqueMetaDescription, getUniqueTitle, getCityProfile, getRichParagraphs, getServiceChecklist } from '@/lib/content-engine';

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

  const title = getUniqueTitle(serviceSlug, city);
  const description = getUniqueMetaDescription(serviceSlug, city);

  return {
    title,
    description,
    keywords: [
      `${service.name.toLowerCase()} ${city.name}`,
      `${service.name.toLowerCase()} contractor ${city.name} MA`,
      `${service.name.toLowerCase()} installation ${city.name}`,
      `best ${service.name.toLowerCase()} company ${city.name}`,
      `${city.zip} ${service.name.toLowerCase()} contractor`,
      `${service.name.toLowerCase()} ${city.county} County`,
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
  const content = getServiceContent(serviceSlug, city);
  const faqs = getUniqueFAQs(serviceSlug, city);
  const profile = getCityProfile(city);
  const richText = getRichParagraphs(serviceSlug, city);
  const checklist = getServiceChecklist(serviceSlug);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: `${SITE_NAME} - ${service.name} in ${city.name}`,
    telephone: PHONE,
    address: { '@type': 'PostalAddress', addressLocality: city.name, addressRegion: 'MA', postalCode: city.zip, addressCountry: 'US' },
    areaServed: { '@type': 'City', name: city.name },
    priceRange: '$$',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', bestRating: '5', worstRating: '1', reviewCount: '19' },
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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Get ${service.name} in ${city.name}, MA`,
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: 'Free Estimate' },
    step: content.processSteps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.description,
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} in ${city.name}, MA`,
    description: content.intro,
    provider: { '@type': 'HomeAndConstructionBusiness', name: SITE_NAME, telephone: PHONE },
    areaServed: { '@type': 'City', name: city.name },
    serviceType: service.name,
    offers: { '@type': 'Offer', price: content.costRange, priceCurrency: 'USD' },
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={serviceSchema} />

      {/* Hero with Form */}
      <HeroWithForm
        badge={`${city.name}, MA • ${service.name} • 5-Star Rated`}
        title={
          <>
            Expert{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              {service.name}
            </span>{' '}
            in {city.name}, Massachusetts
          </>
        }
        subtitle={content.intro}
        backgroundImage={REAL_PHOTOS[(city.slug.length + service.slug.length) % REAL_PHOTOS.length]}
      />

      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[
            { label: 'Massachusetts', href: '/massachusetts' },
            { label: service.name, href: `/services/${service.slug}` },
            { label: city.name },
          ]} />
        </div>
      </div>

      {/* Why Choose Us */}
      <WhyChooseUs cityName={city.name} />

      {/* Rich Text Content — Expert Intro (like RS) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Expert {service.name} Services in {city.name}, MA
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mb-8" />
            <div className="prose prose-lg max-w-none text-gray-600 space-y-6">
              <p>{richText.expertIntro}</p>
              <p>{richText.trustedContractor}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Services Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Comprehensive {service.name} Services in {city.name}, MA
            </h3>
            <div className="prose prose-lg max-w-none text-gray-600 mb-8">
              <p>{richText.comprehensiveServices}</p>
            </div>

            {/* What We Offer Checklist */}
            <h3 className="text-2xl font-bold text-slate-900 mb-4">What We Offer</h3>
            <div className="grid md:grid-cols-2 gap-3 mb-8">
              {checklist.map((item, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-slate-200">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* Expert Solutions Box */}
            <div className="bg-slate-900 p-8 rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-4 text-amber-400">Why {city.name} Trusts {SITE_NAME}</h3>
              <p className="text-white/80 leading-relaxed">{richText.whyLocal}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Unique City+Service Content */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Common Challenges in This City */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Common {service.name} Challenges in {city.name}
              </h2>
              <div className="space-y-4">
                {content.challenges.map((challenge, i) => (
                  <div key={i} className="flex items-start space-x-3 p-4 bg-red-50 rounded-xl border border-red-100">
                    <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Solutions */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Our {service.name} Solutions for {city.name} Homes
              </h2>
              <div className="space-y-4">
                {content.solutions.map((solution, i) => (
                  <div key={i} className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl border border-green-100">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{solution}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Neighborhoods We Serve */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {city.name} Neighborhoods We Serve
              </h2>
              <p className="text-gray-600 mb-4">
                We provide {service.name.toLowerCase()} services to every neighborhood in {city.name}, {city.county} County,
                including ZIP code {city.zip}:
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.neighborhoods.map((neighborhood, i) => (
                  <span key={i} className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-sm font-medium">
                    {neighborhood}
                  </span>
                ))}
              </div>
            </div>

            {/* Housing Types */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {city.name} Housing Types We Work On
              </h2>
              <p className="text-gray-600 mb-4">
                Our team has extensive experience with the housing stock found throughout {city.name},
                with homes averaging {profile.avgHomeAge} old:
              </p>
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

            {/* Our Process */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Our {service.name} Process in {city.name}
              </h2>
              <div className="space-y-6">
                {content.processSteps.map((step, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full flex items-center justify-center flex-shrink-0 text-slate-900 font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{step.name}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost, Timeline, Warranty Box */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-amber-50 p-6 rounded-2xl text-center border border-amber-200">
                <p className="text-sm text-amber-700 font-semibold mb-2">Cost Range</p>
                <p className="text-lg font-bold text-slate-900">{content.costRange}</p>
              </div>
              <div className="bg-amber-50 p-6 rounded-2xl text-center border border-amber-200">
                <p className="text-sm text-amber-700 font-semibold mb-2">Timeline</p>
                <p className="text-lg font-bold text-slate-900">{content.timeline}</p>
              </div>
              <div className="bg-amber-50 p-6 rounded-2xl text-center border border-amber-200">
                <p className="text-sm text-amber-700 font-semibold mb-2">Warranty</p>
                <p className="text-lg font-bold text-slate-900">{content.warranty}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-slate-900 p-8 rounded-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-amber-400">5.0★</p>
                  <p className="text-white/80 text-sm">Google Rating</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-amber-400">500+</p>
                  <p className="text-white/80 text-sm">Projects Done</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-amber-400">{city.distance}mi</p>
                  <p className="text-white/80 text-sm">From {city.name}</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-amber-400">FREE</p>
                  <p className="text-white/80 text-sm">Estimates</p>
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

      {/* FAQ - Unique per city+service */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {service.name} FAQs — {city.name}, MA
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
            <p className="text-gray-600">Common questions from {city.name} homeowners about {service.name.toLowerCase()}</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 group">
                <summary className="px-6 py-5 cursor-pointer hover:bg-slate-100 transition-colors flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 pr-4">{faq.question}</h3>
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.answer}</p>
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
              <Link key={otherService.slug} href={`/services/${otherService.slug}/${city.slug}`}
                className="group p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all text-center">
                <span className="text-3xl">{otherService.icon}</span>
                <h3 className="font-bold text-slate-900 group-hover:text-amber-500 transition-colors mt-3">{otherService.name}</h3>
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
              <Link key={nearbyCity.slug} href={`/services/${service.slug}/${nearbyCity.slug}`}
                className="group p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all text-center">
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
        subtitle={`Ready for professional ${service.name.toLowerCase()}? We're just ${city.distance} miles away. Call now or request a free quote — no obligation.`}
        cityName={city.name}
      />
    </>
  );
}
