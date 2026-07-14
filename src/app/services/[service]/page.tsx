import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { HeroWithForm, ServicesSection, CTASection, WhyChooseUs, ReviewsHighlight } from '@/components/sections';
import { JsonLd } from '@/components/seo';
import { services, getServiceBySlug } from '@/lib/services';
import { cities } from '@/lib/cities';
import { SITE_NAME, PHONE, SITE_URL, PHONE_LINK, HIC_NUMBER } from '@/lib/constants';

const BeforeAfter = dynamic(() => import('@/components/sections/BeforeAfter'), {
  loading: () => <div className="py-24 bg-slate-900" />,
});
const VideoGallery = dynamic(() => import('@/components/sections/VideoGallery'), {
  loading: () => <div className="py-24 bg-white" />,
});
const FAQ = dynamic(() => import('@/components/sections/FAQ'), {
  loading: () => <div className="py-24 bg-white" />,
});

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

const serviceMetadata: Record<string, { title: string; description: string; keywords: string[] }> = {
  siding: {
    title: 'Siding Installation MA (2026) | 500+ Homes | 25-50yr Warranty | Free Quote',
    description: `#1 siding contractor in Massachusetts ★5.0. Vinyl & James Hardie fiber cement. 500+ homes, 25-50yr warranties. Licensed HIC #${HIC_NUMBER}. Call ${PHONE} — FREE estimate!`,
    keywords: ['siding installation Massachusetts', 'vinyl siding contractor MA', 'James Hardie siding installer', 'siding contractor near me'],
  },
  windows: {
    title: 'Window Replacement MA (2026) | ENERGY STAR | Save 30% on Bills | Free Quote',
    description: `ENERGY STAR window contractor in MA ★5.0. Double & triple-pane windows — cut energy bills by 30%. Licensed HIC #${HIC_NUMBER}. Call ${PHONE} — FREE estimate!`,
    keywords: ['window replacement Massachusetts', 'energy efficient windows MA', 'window installation Boston', 'ENERGY STAR windows MA'],
  },
  doors: {
    title: 'Door Installation MA (2026) | Entry, Storm & Patio | 90%+ ROI | Free Quote',
    description: `Premium door contractor in MA ★5.0. Fiberglass, steel & wood entry doors. Storm & patio doors — 90%+ ROI. Licensed HIC #${HIC_NUMBER}. Call ${PHONE} — FREE estimate!`,
    keywords: ['door installation Massachusetts', 'entry door replacement MA', 'storm door installation', 'door contractor near me'],
  },
  'general-contractor': {
    title: 'Licensed General Contractor MA (2026) | HIC #204634 | 500+ Projects',
    description: `MA licensed general contractor ★5.0. Exterior renovations — siding, windows, doors & decks. 500+ projects. HIC #${HIC_NUMBER}. Call ${PHONE} — FREE estimate!`,
    keywords: ['exterior general contractor Massachusetts', 'exterior renovation contractor MA', 'siding and window contractor Boston'],
  },
};

const serviceFAQs: Record<string, { question: string; answer: string }[]> = {
  siding: [
    { question: 'How long does vinyl siding last in Massachusetts?', answer: 'Quality vinyl siding typically lasts 30-50 years in Massachusetts when properly installed. James Hardie fiber cement siding can last 50+ years. We use premium materials designed to withstand New England\'s harsh winters, humid summers, and coastal salt air.' },
    { question: 'What type of siding is best for New England weather?', answer: 'For Massachusetts homes, we recommend insulated vinyl siding or James Hardie fiber cement. Both withstand temperature extremes (-20°F to 100°F), resist moisture damage, and won\'t crack or warp. Insulated siding also provides up to 20% energy savings.' },
    { question: 'How much does new siding cost in Massachusetts?', answer: 'Siding costs vary by material: vinyl runs $6-12 per sq ft installed, while premium James Hardie fiber cement costs $9-15 per sq ft. A typical 2,000 sq ft home ranges from $12,000-30,000. We provide free, detailed written estimates with no hidden fees.' },
    { question: 'Can you install siding over existing siding?', answer: 'In some cases, yes. However, we typically recommend full tear-off to inspect sheathing for moisture damage and ensure proper moisture barrier installation. This approach provides better long-term results and maintains manufacturer warranties.' },
  ],
  windows: [
    { question: 'How much can I save on energy bills with new windows?', answer: 'ENERGY STAR certified windows can reduce heating and cooling costs by 12-33%. Most Massachusetts homeowners save $100-400 annually. Our double and triple-pane windows with Low-E coatings provide maximum insulation for New England winters.' },
    { question: 'What\'s the difference between double and triple-pane windows?', answer: 'Double-pane windows have two glass layers with insulating argon gas between them. Triple-pane adds a third layer for 20-30% better insulation. Triple-pane costs about 10-15% more but offers superior energy efficiency and noise reduction.' },
    { question: 'How long does window replacement take?', answer: 'Most window replacements take 1-3 days depending on the number of windows. A typical home with 10-15 windows takes 2 days. We work efficiently while ensuring proper installation, flashing, and weatherstripping.' },
    { question: 'Are your windows ENERGY STAR certified?', answer: 'Yes! All our windows are ENERGY STAR certified for the Northern climate zone, meeting strict efficiency requirements for Massachusetts. Many qualify for Mass Save rebates and federal energy tax credits.' },
  ],
  doors: [
    { question: 'What\'s the best entry door material for Massachusetts?', answer: 'For Massachusetts homes, we recommend fiberglass entry doors. They won\'t crack, warp, or rot like wood, provide excellent insulation (R-value up to 7.0), and resist New England\'s temperature swings. Steel doors offer maximum security but may dent.' },
    { question: 'How much does a new entry door cost?', answer: 'Entry door costs range from $1,500-5,000+ installed depending on material and features. Basic fiberglass starts around $1,500, while premium Therma-Tru or ProVia doors with sidelights can reach $4,000-6,000. All our doors include professional installation.' },
    { question: 'Do you install storm doors?', answer: 'Yes! Storm doors add an extra layer of protection and can reduce energy loss by 50%. We install retractable screen storm doors, full-view glass doors, and traditional models. Storm doors typically cost $400-1,200 installed.' },
    { question: 'Can you install smart locks with new doors?', answer: 'Absolutely! We install smart locks, keypad locks, and multi-point locking systems with all door installations. Smart home integration options are available with Schlage, Yale, and August systems.' },
  ],
  'general-contractor': [
    { question: 'What types of projects do you handle?', answer: 'We specialize exclusively in exterior renovations — complete siding replacements, window and door packages, deck construction, trim work, and structural repairs. Our work is focused entirely on your home\'s exterior envelope.' },
    { question: 'Are you licensed for general contracting in Massachusetts?', answer: `Yes! Maia Construction holds Massachusetts Home Improvement Contractor license #${HIC_NUMBER}. We're fully licensed, bonded, and insured for all residential construction work throughout the state.` },
    { question: 'How do you handle permits and inspections?', answer: 'We manage all permit applications and inspections as part of our service. Our team coordinates with local building departments, schedules required inspections, and ensures all work meets Massachusetts building codes.' },
    { question: 'What warranty do you offer on general contracting work?', answer: 'All our work includes a 5-year workmanship warranty plus manufacturer warranties on materials (25-50 years). We use fixed-price contracts with detailed project timelines.' },
  ],
};

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) return {};

  const meta = serviceMetadata[serviceSlug] || {
    title: `${service.name} Services Massachusetts | ${SITE_NAME}`,
    description: `Professional ${service.name.toLowerCase()} services in Massachusetts. Call ${PHONE} for a free estimate.`,
    keywords: [`${service.name.toLowerCase()} Massachusetts`],
  };

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: { title: meta.title, description: meta.description, type: 'website' },
    alternates: { canonical: `${SITE_URL}/services/${serviceSlug}` },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) notFound();

  const nearbyCities = cities.slice(0, 6);
  const faqs = serviceFAQs[serviceSlug] || [];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} Services`,
    description: service.fullDescription,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: SITE_NAME,
      telephone: PHONE,
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', bestRating: '5', worstRating: '1', reviewCount: '47' },
    },
    areaServed: { '@type': 'State', name: 'Massachusetts' },
    serviceType: service.name,
  };

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  } : null;

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Get ${service.name} in Massachusetts`,
    description: `Step-by-step process for getting professional ${service.name.toLowerCase()} installed by ${SITE_NAME}.`,
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: 'Free Estimate' },
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Free Consultation', text: 'Contact us for a free in-home consultation and detailed estimate.' },
      { '@type': 'HowToStep', position: 2, name: 'Material Selection', text: 'Choose from premium materials that fit your style and budget.' },
      { '@type': 'HowToStep', position: 3, name: 'Professional Installation', text: 'Our certified team completes the installation with precision.' },
      { '@type': 'HowToStep', position: 4, name: 'Final Inspection', text: 'We walk through the completed project to ensure your satisfaction.' },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <JsonLd data={howToSchema} />

      {/* Hero with Form - Same as Homepage */}
      <HeroWithForm
        badge={`${service.name} • MA Licensed HIC #${HIC_NUMBER} • 5-Star Rated`}
        title={
          <>
            Professional{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              {service.name}
            </span>{' '}
            Services in Massachusetts
          </>
        }
        subtitle={`${service.shortDescription} Licensed & insured contractor serving Marlborough and 75+ cities across Massachusetts.`}
        backgroundImage={service.image}
      />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Service Details + Features */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Expert {service.name} Installation in Massachusetts
              </h2>
              <p className="text-lg text-gray-700 mb-8">{service.fullDescription}</p>

              {/* Features Grid */}
              <h3 className="text-2xl font-bold text-slate-900 mb-4">What We Offer</h3>
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

              {/* Benefits */}
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Benefits</h3>
              <div className="flex flex-wrap gap-3 mb-8">
                {service.benefits.map((benefit, index) => (
                  <span key={index} className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-sm font-medium">
                    {benefit}
                  </span>
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
                  <p className="text-3xl font-bold text-amber-600">10+</p>
                  <p className="text-sm text-gray-600">Years Experience</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl text-center">
                  <p className="text-3xl font-bold text-amber-600">75+</p>
                  <p className="text-sm text-gray-600">Cities Served</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Across MA */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            {service.name} Across Massachusetts
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {nearbyCities.map((city) => (
              <Link
                key={city.slug}
                href={`/services/${service.slug}/${city.slug}`}
                className="group p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all text-center"
              >
                <svg className="w-8 h-8 text-amber-500 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <h3 className="font-bold text-slate-900 group-hover:text-amber-500 transition-colors">
                  {service.name} in {city.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{city.distance} miles away</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/massachusetts" className="inline-flex items-center text-amber-600 font-semibold hover:text-amber-700">
              View All 75+ Cities →
            </Link>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <BeforeAfter
        title={`${service.name} Transformations`}
        subtitle={`See the difference quality ${service.name.toLowerCase()} makes - drag to compare before and after`}
      />

      {/* Video Gallery */}
      <VideoGallery
        title={`${service.name} Projects in Action`}
        subtitle={`Watch our team install ${service.name.toLowerCase()} across Massachusetts`}
      />

      {/* Reviews */}
      <ReviewsHighlight />

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Frequently Asked Questions
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
              <p className="text-xl text-gray-600">
                Common questions about {service.name.toLowerCase()} in Massachusetts
              </p>
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
      )}

      {/* Other Services */}
      <ServicesSection
        title="Our Other Services"
        subtitle="Complete exterior renovation solutions for your Massachusetts home"
      />

      {/* CTA */}
      <CTASection
        title="Get Your FREE Estimate Today"
        subtitle={`Ready for professional ${service.name.toLowerCase()}? Call now or request a free quote — no obligation.`}
      />
    </>
  );
}
