import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { HeroWithForm, Testimonials, CTASection, WhyChooseUs, ServicesSection, ReviewsHighlight } from '@/components/sections';
import dynamic from 'next/dynamic';

const BeforeAfter = dynamic(() => import('@/components/sections/BeforeAfter'), {
  loading: () => <div className="py-24 bg-slate-900" />,
});
const VideoGallery = dynamic(() => import('@/components/sections/VideoGallery'), {
  loading: () => <div className="py-24 bg-white" />,
});
const FAQ = dynamic(() => import('@/components/sections/FAQ'), {
  loading: () => <div className="py-24 bg-white" />,
});
import { JsonLd, Breadcrumbs } from '@/components/seo';
import { services, getServiceBySlug } from '@/lib/services';
import { cities, getCityBySlug, getNearbyCities } from '@/lib/cities';
import { SITE_NAME, SITE_URL, PHONE, PHONE_LINK, HIC_NUMBER, IMAGES, LOGO_URL } from '@/lib/constants';

interface MACityServicePageProps {
  params: Promise<{ city: string; service: string }>;
}

export async function generateStaticParams() {
  const params: { city: string; service: string }[] = [];
  for (const service of services) {
    for (const city of cities) {
      params.push({ city: city.slug, service: service.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: MACityServicePageProps): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) return {};

  const title = `${service.name} Contractor ${city.name} MA | Expert ${service.name} | Call Now | ${SITE_NAME}`;
  const description = `#1 rated ${service.name.toLowerCase()} contractor in ${city.name}, MA ★5.0. 500+ projects in ${city.county} County. Licensed HIC #${HIC_NUMBER} & insured. FREE estimate. Call ${PHONE}`;

  return {
    title,
    description,
    keywords: [
      `${service.name.toLowerCase()} contractor ${city.name} MA`,
      `${service.name.toLowerCase()} ${city.name} Massachusetts`,
      `${service.name.toLowerCase()} installation ${city.name}`,
      `best ${service.name.toLowerCase()} company ${city.name}`,
      `${city.zip} ${service.name.toLowerCase()} contractor`,
      `${service.name.toLowerCase()} near me ${city.name}`,
      `${city.county} county ${service.name.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      images: [{ url: service.image }],
    },
    alternates: {
      canonical: `${SITE_URL}/services/${service.slug}/${city.slug}`,
    },
    ...(city.distance > 50 ? { robots: { index: false, follow: true } } : {}),
  };
}

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
      return [IMAGES.generalContractor, IMAGES.generalContractor2, IMAGES.generalContractor3, IMAGES.generalContractor4];
    default:
      return [IMAGES.hero, IMAGES.siding, IMAGES.windows, IMAGES.doors];
  }
}

// City-specific neighborhoods data
function getCityNeighborhoods(cityName: string): string[] {
  const neighborhoods: Record<string, string[]> = {
    'Marlborough': ['East Marlborough', 'West Marlborough', 'Downtown Marlborough', 'Lincoln Street area', 'Bolton Street area'],
    'Framingham': ['Nobscot Village', 'Saxonville', 'Farm Pond', 'Downtown Framingham', 'South Framingham'],
    'Natick': ['Natick Center', 'South Natick', 'East Natick', 'West Natick', 'Walnut Hill'],
    'Hudson': ['Hudson Center', 'South Hudson', 'Gleasondale', 'Maynard Road area', 'Cox Street area'],
    'Worcester': ['Shrewsbury Street', 'Canal District', 'Burncoat', 'Tatnuck', 'Greendale', 'Indian Lake'],
    'Boston': ['Back Bay', 'Beacon Hill', 'South End', 'Charlestown', 'Jamaica Plain', 'West Roxbury'],
    'Newton': ['Newton Corner', 'Chestnut Hill', 'West Newton', 'Newtonville', 'Auburndale', 'Waban'],
    'Wellesley': ['Wellesley Hills', 'Wellesley Farms', 'Wellesley Square', 'Babson Park', 'Linden Street area'],
    'Sudbury': ['Sudbury Center', 'South Sudbury', 'North Sudbury', 'Wayside Inn area', 'Willis Hill'],
    'Concord': ['Concord Center', 'West Concord', 'Nine Acre Corner', 'Thoreau Street area', 'Monument Square'],
  };
  return neighborhoods[cityName] || [`Downtown ${cityName}`, `North ${cityName}`, `South ${cityName}`, `East ${cityName}`, `West ${cityName}`];
}

// City-specific housing types
function getCityHousingTypes(cityName: string): string[] {
  const housingTypes: Record<string, string[]> = {
    'Marlborough': ['1950s-1970s colonials', 'Split-level homes', 'Newer construction townhouses', 'Raised ranches'],
    'Framingham': ['Vintage colonials', 'Ranches', 'Condominiums', 'Multi-family homes', 'Cape Cod style'],
    'Worcester': ['Triple-deckers', 'Victorian homes', 'Colonials', 'Ranches', 'Multi-family units'],
    'Boston': ['Brownstones', 'Row houses', 'Triple-deckers', 'Condominiums', 'Victorian homes'],
    'Newton': ['Large colonials', 'Tudor homes', 'Contemporary builds', 'Victorian estates', 'Split-levels'],
  };
  return housingTypes[cityName] || ['Colonials', 'Cape Cod style', 'Ranches', 'Split-levels', 'Contemporary homes'];
}

export default async function MACityServicePage({ params }: MACityServicePageProps) {
  const { city: citySlug, service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);

  if (!service || !city) {
    notFound();
  }

  const nearbyCities = getNearbyCities(city.slug, 6);
  const galleryImages = getServiceImages(serviceSlug);
  const neighborhoods = getCityNeighborhoods(city.name);
  const housingTypes = getCityHousingTypes(city.name);

  // Schemas - 6+ per page like RS
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE_URL}/#organization`,
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
    geo: { '@type': 'GeoCoordinates', latitude: 42.3459, longitude: -71.5526 },
    areaServed: { '@type': 'City', name: city.name },
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      reviewCount: '47',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '19:00',
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} Services in ${city.name}`,
    description: `Professional ${service.name.toLowerCase()} installation and repair in ${city.name}, Massachusetts. Licensed contractor serving ${city.county} County.`,
    provider: { '@type': 'HomeAndConstructionBusiness', name: SITE_NAME, telephone: PHONE },
    areaServed: { '@type': 'City', name: city.name },
    serviceType: service.name,
    alternateName: service.features.slice(0, 4).join(', '),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Massachusetts', item: `${SITE_URL}/massachusetts` },
      { '@type': 'ListItem', position: 3, name: service.name, item: `${SITE_URL}/services/${service.slug}` },
      { '@type': 'ListItem', position: 4, name: `${city.name}, MA`, item: `${SITE_URL}/massachusetts/${city.slug}/${service.slug}` },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Get ${service.name} Installation in ${city.name}, MA`,
    description: `Step-by-step process for getting professional ${service.name.toLowerCase()} installed in ${city.name} by ${SITE_NAME}.`,
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: 'Free Estimate' },
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Free Consultation', text: `We visit your ${city.name} home to assess your needs and provide a detailed quote.` },
      { '@type': 'HowToStep', position: 2, name: 'Material Selection', text: 'Choose from premium materials that fit your style and budget.' },
      { '@type': 'HowToStep', position: 3, name: 'Preparation', text: 'We prepare your home, protect landscaping, and set up the work area.' },
      { '@type': 'HowToStep', position: 4, name: 'Professional Installation', text: `Our skilled team completes the ${service.name.toLowerCase()} work with precision.` },
      { '@type': 'HowToStep', position: 5, name: 'Quality Inspection', text: 'Thorough inspection to ensure everything meets our high standards.' },
      { '@type': 'HowToStep', position: 6, name: 'Final Walkthrough', text: 'We walk through the completed project with you to ensure satisfaction.' },
    ],
  };

  const faqItems = [
    {
      question: `How much does ${service.name.toLowerCase()} cost in ${city.name}?`,
      answer: `${service.name} costs in ${city.name} vary by project scope and materials. We provide free, detailed estimates with transparent pricing. Call ${PHONE} for a no-obligation quote specific to your ${city.name} home.`,
    },
    {
      question: `Do you serve all neighborhoods in ${city.name}?`,
      answer: `Yes! We serve all areas of ${city.name} including ${neighborhoods.slice(0, 3).join(', ')}, and surrounding ${city.county} County communities. We're just ${city.distance} miles away.`,
    },
    {
      question: `Are you licensed to do ${service.name.toLowerCase()} work in ${city.name}?`,
      answer: `Absolutely. ${SITE_NAME} holds MA Home Improvement Contractor License #${HIC_NUMBER}. We're fully licensed, bonded, and insured for all ${service.name.toLowerCase()} work in ${city.name} and throughout Massachusetts.`,
    },
    {
      question: `How quickly can you start a ${service.name.toLowerCase()} project in ${city.name}?`,
      answer: `We typically provide same-day or next-day free estimates for ${city.name} residents. Project timelines depend on scope, but we pride ourselves on prompt scheduling and efficient completion.`,
    },
    {
      question: `What warranty do you offer on ${service.name.toLowerCase()} in ${city.name}?`,
      answer: `All our ${service.name.toLowerCase()} installations in ${city.name} include a 5-year workmanship warranty plus 25-50 year manufacturer warranties on materials. We stand behind every project.`,
    },
    {
      question: `Why should I choose ${SITE_NAME} for ${service.name.toLowerCase()} in ${city.name}?`,
      answer: `${SITE_NAME} is rated 5.0 stars with 47+ verified Google reviews. We're locally based, MA licensed (HIC #${HIC_NUMBER}), and have completed 500+ projects. We offer transparent pricing with no hidden fees.`,
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      {/* 6 Schemas like RS */}
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={faqSchema} />

      <HeroWithForm
        title={
          <>
            Expert {service.name} in{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              {city.name}, Massachusetts
            </span>
          </>
        }
        subtitle={`Professional ${service.name.toLowerCase()} installation in ${city.name}. ${city.distance} miles from our office. Serving ${city.zip} and all of ${city.county} County. Licensed HIC #${HIC_NUMBER}. Call ${PHONE} for FREE estimate.`}
        badge={`${service.icon} ${city.name}, MA • 5.0★ Rated • Licensed & Insured`}
        backgroundImage={service.image}
      />

      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Massachusetts', href: '/massachusetts' },
              { label: service.name, href: `/services/${service.slug}` },
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
              <span className="text-amber-400">★★★★★</span> 5.0 Google Rating (47+ Reviews)
            </span>
            <span className="w-px h-4 bg-white/20 hidden md:block" />
            <span>Licensed HIC #{HIC_NUMBER}</span>
            <span className="w-px h-4 bg-white/20 hidden md:block" />
            <span>Same Day Estimates</span>
            <span className="w-px h-4 bg-white/20 hidden md:block" />
            <span>FREE Estimates</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Professional {service.name} in {city.name}, MA
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mb-8" />

              <div className="prose prose-lg max-w-none mb-12">
                <p>
                  Looking for a reliable {service.name.toLowerCase()} contractor in {city.name}, Massachusetts?{' '}
                  <strong>{SITE_NAME}</strong> is your trusted local expert, providing premium {service.name.toLowerCase()}{' '}
                  installation, repair, and replacement services throughout {city.name} and {city.county} County.
                  With a perfect 5.0-star Google rating and 500+ completed projects, we deliver results that
                  last decades.
                </p>
                <p>{service.fullDescription}</p>
              </div>

              {/* Credentials Box */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-12">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Your Trusted {city.name} Contractor</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <p className="font-bold text-slate-900">5.0★ Rating</p>
                      <p className="text-sm text-gray-600">47+ Google Reviews</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📋</span>
                    <div>
                      <p className="font-bold text-slate-900">MA Licensed</p>
                      <p className="text-sm text-gray-600">HIC #{HIC_NUMBER}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🛡️</span>
                    <div>
                      <p className="font-bold text-slate-900">Fully Insured</p>
                      <p className="text-sm text-gray-600">Liability & Workers Comp</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Neighborhoods Section - City specific */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {city.name} Neighborhoods We Serve
                </h3>
                <div className="flex flex-wrap gap-2">
                  {neighborhoods.map((neighborhood, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-100 rounded-full text-sm text-slate-700">
                      {neighborhood}
                    </span>
                  ))}
                </div>
              </div>

              {/* Housing Types Section - City specific */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {city.name} Housing Types We Work On
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {housingTypes.map((type, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                      <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comprehensive Services */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Comprehensive {service.name} Services in {city.name}, MA
                </h3>
                <p className="text-gray-600 mb-6">
                  As {city.name} residents, you understand the unique challenges that New England weather
                  brings to your home. Our {service.name.toLowerCase()} solutions are specifically engineered
                  to withstand harsh winters, humid summers, and coastal conditions common in {city.county} County.
                </p>
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

                {/* Trust Box with Stats */}
                <div className="mt-8 bg-slate-900 rounded-2xl p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-3xl font-bold text-amber-400">500+</p>
                      <p className="text-white/80 text-sm">Projects Done</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-amber-400">5.0★</p>
                      <p className="text-white/80 text-sm">Google Rating</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-amber-400">10+</p>
                      <p className="text-white/80 text-sm">Years Experience</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-amber-400">FREE</p>
                      <p className="text-white/80 text-sm">Estimates</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6-Step Process */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Our {service.name} Process in {city.name}
                </h3>
                <div className="space-y-4">
                  {[
                    { step: '01', title: 'Free Consultation', desc: `We visit your ${city.name} home to assess your needs and provide a detailed quote.` },
                    { step: '02', title: 'Material Selection', desc: 'Choose from premium materials that fit your style, budget, and New England climate needs.' },
                    { step: '03', title: 'Preparation', desc: 'We prepare the work area, protect your landscaping and property.' },
                    { step: '04', title: 'Expert Installation', desc: `Our skilled team completes your ${service.name.toLowerCase()} with precision and care.` },
                    { step: '05', title: 'Quality Inspection', desc: 'Thorough quality check to ensure every detail meets our high standards.' },
                    { step: '06', title: 'Final Walkthrough', desc: 'We review the completed work with you to ensure 100% satisfaction.' },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-slate-900 font-bold text-sm">{item.step}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Area Map */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Service Area: {city.name}, MA
                </h3>
                <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                  <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(city.name + ', MA')}&zoom=13`}
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${service.name} service area in ${city.name}, MA`}
                  />
                </div>
              </div>

              {/* Gallery */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  {service.name} Projects in {city.county} County
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {galleryImages.slice(0, 4).map((img, index) => (
                    <div key={index} className="relative h-48 rounded-xl overflow-hidden shadow-lg">
                      <Image
                        src={img}
                        alt={`${service.name} installation project ${index + 1} in ${city.name}, ${city.county} County Massachusetts by ${SITE_NAME}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - like homepage */}
      <ServicesSection
        title={`Expert Home Exterior Services in ${city.name}`}
        subtitle={`From vinyl siding to energy-efficient windows — quality craftsmanship for ${city.name} homeowners`}
      />

      {/* Before & After */}
      <BeforeAfter
        title={`Our ${service.name} Transformations`}
        subtitle="See the difference quality craftsmanship makes"
      />

      {/* Video Gallery */}
      <VideoGallery
        title="Our Projects in Action"
        subtitle={`Watch our team transform homes in ${city.name} and across Massachusetts`}
      />

      {/* Reviews */}
      <ReviewsHighlight />

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions — {service.name} in {city.name}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto" />
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((faq, index) => (
              <details key={index} className="bg-white rounded-xl overflow-hidden border border-slate-200 group">
                <summary className="px-6 py-5 cursor-pointer hover:bg-slate-50 transition-colors flex items-center justify-between">
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

      {/* Why City Chooses Us */}
      <WhyChooseUs cityName={city.name} />

      {/* Other Services in This Area */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            Other Services in {city.name}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-12" />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {services.filter(s => s.slug !== service.slug).map((otherService) => (
              <Link
                key={otherService.slug}
                href={`/massachusetts/${city.slug}/${otherService.slug}`}
                className="group p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all text-center"
              >
                <span className="text-4xl block mb-3">{otherService.icon}</span>
                <h3 className="font-bold text-slate-900 group-hover:text-amber-500 transition-colors">
                  {otherService.name} in {city.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2">{otherService.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Cities - Same Service */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            {service.name} Nearby
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-12" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {nearbyCities.map((nearbyCity) => (
              <Link
                key={nearbyCity.slug}
                href={`/massachusetts/${nearbyCity.slug}/${service.slug}`}
                className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all text-center"
              >
                <svg className="w-8 h-8 text-amber-500 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <h3 className="font-bold text-slate-900 group-hover:text-amber-500 transition-colors text-sm">
                  {nearbyCity.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{nearbyCity.distance} miles</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonials cityName={city.name} />

      <CTASection cityName={city.name} />
    </>
  );
}
