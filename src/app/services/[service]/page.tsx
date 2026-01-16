import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Hero, Testimonials, CTASection } from '@/components/sections';
import { ContactForm } from '@/components/forms';
import { JsonLd } from '@/components/seo';
import { services, getServiceBySlug } from '@/lib/services';
import { cities, getCitiesByCounty } from '@/lib/cities';
import { SITE_NAME, PHONE, IMAGES, HIC_NUMBER } from '@/lib/constants';

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    service: service.slug,
  }));
}

// SEO metadata by service type
const serviceMetadata: Record<string, { title: string; description: string; keywords: string[] }> = {
  siding: {
    title: 'Siding Installation Massachusetts | Vinyl & Fiber Cement Experts',
    description: `Premium siding installation in MA. Vinyl, James Hardie fiber cement & insulated options. 25-50 year warranties. MA HIC #${HIC_NUMBER}. FREE estimate: ${PHONE}`,
    keywords: [
      'siding installation Massachusetts',
      'vinyl siding contractor MA',
      'James Hardie siding installer',
      'fiber cement siding Boston',
      'siding replacement Worcester',
      'best siding company Massachusetts',
      'insulated siding installation',
      'siding contractor near me',
    ],
  },
  windows: {
    title: 'Window Replacement Massachusetts | ENERGY STAR Certified',
    description: `Save up to 30% on energy bills with ENERGY STAR windows. Double & triple-pane, Low-E glass. MA HIC #${HIC_NUMBER}. FREE estimate: ${PHONE}`,
    keywords: [
      'window replacement Massachusetts',
      'energy efficient windows MA',
      'window installation Boston',
      'replacement windows Worcester',
      'double pane windows Massachusetts',
      'window contractor near me',
      'ENERGY STAR windows MA',
      'best window company Massachusetts',
    ],
  },
  doors: {
    title: 'Door Installation Massachusetts | Entry, Storm & Patio Doors',
    description: `Premium door installation - fiberglass, steel & wood. Entry doors, storm doors, patio doors. 90%+ ROI. MA HIC #${HIC_NUMBER}. FREE estimate: ${PHONE}`,
    keywords: [
      'door installation Massachusetts',
      'entry door replacement MA',
      'front door installation Boston',
      'storm door installation Worcester',
      'patio door replacement MA',
      'door contractor near me',
      'fiberglass door installer',
      'best door company Massachusetts',
    ],
  },
  'general-contractor': {
    title: 'General Contractor Massachusetts | Licensed Home Renovations',
    description: `MA HIC #${HIC_NUMBER} licensed general contractor. Exterior renovations, remodeling, additions. 5-year warranty. FREE estimate: ${PHONE}`,
    keywords: [
      'general contractor Massachusetts',
      'home renovation contractor MA',
      'licensed contractor Boston',
      'home remodeling Worcester',
      'exterior renovation MA',
      'contractor near me Massachusetts',
      'home improvement contractor',
      'best general contractor MA',
    ],
  },
};

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) return {};

  const meta = serviceMetadata[serviceSlug] || {
    title: `${service.name} Services Massachusetts`,
    description: `Professional ${service.name.toLowerCase()} services in Massachusetts. ${service.shortDescription} Call ${PHONE} for a free estimate.`,
    keywords: [`${service.name.toLowerCase()} Massachusetts`],
  };

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
    },
  };
}

// Get gallery images based on service
function getServiceGallery(serviceSlug: string): string[] {
  switch (serviceSlug) {
    case 'siding':
      return [
        '/images/before-after/siding-after-framingham-ma.webp',
        '/images/before-after/siding-before-framingham-ma.webp',
        '/images/before-after/exterior-after-worcester-ma.webp',
        '/images/before-after/exterior-before-worcester-ma.webp',
      ];
    case 'windows':
      return [
        IMAGES.windows,
        IMAGES.windows2,
        IMAGES.windows3,
        IMAGES.windows4,
      ];
    case 'doors':
      return [
        IMAGES.doors,
        IMAGES.doors2,
        IMAGES.doors3,
        IMAGES.doors4,
      ];
    case 'general-contractor':
      return [
        IMAGES.generalContractor,
        IMAGES.generalContractor2,
        IMAGES.generalContractor3,
        IMAGES.generalContractor4,
      ];
    default:
      return [IMAGES.hero, IMAGES.hero, IMAGES.hero, IMAGES.hero];
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  const galleryImages = getServiceGallery(serviceSlug);
  const counties = ['Middlesex', 'Worcester', 'Norfolk', 'Essex', 'Suffolk'];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} Services`,
    description: service.fullDescription,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: SITE_NAME,
      telephone: PHONE,
    },
    areaServed: {
      '@type': 'State',
      name: 'Massachusetts',
    },
    serviceType: service.name,
  };

  return (
    <>
      <JsonLd data={serviceSchema} />

      <Hero
        title={`Professional ${service.name} Services`}
        subtitle={service.shortDescription}
        badge={`${service.icon} ${service.name}`}
        size="inner"
      />

      {/* Service Details */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Content */}
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Expert {service.name} Installation in Massachusetts
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mb-8" />

              <p className="text-lg text-gray-600 mb-8">{service.fullDescription}</p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">What We Offer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Benefits</h3>
                <div className="flex flex-wrap gap-3">
                  {service.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-sm font-medium"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:sticky lg:top-24">
              <ContactForm service={service.slug} />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Work</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
            <p className="text-xl text-gray-600">Examples of our {service.name.toLowerCase()} projects</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((img, index) => (
              <div key={index} className="relative h-64 rounded-xl overflow-hidden shadow-lg group">
                <Image
                  src={img}
                  alt={`${service.name} project ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all"
            >
              View All Projects
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* ALL Cities for this Service - By County */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {service.name} Services - All {cities.length}+ Cities
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
            <p className="text-xl text-gray-600">
              Professional {service.name.toLowerCase()} installation in every city we serve
            </p>
          </div>

          {/* Cities by County */}
          <div className="space-y-12">
            {counties.map((county) => {
              const countyCities = getCitiesByCounty(county);
              if (countyCities.length === 0) return null;

              return (
                <div key={county}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-slate-900">
                      {county} County
                    </h3>
                    <span className="px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
                      {countyCities.length} cities
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {countyCities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/services/${service.slug}/${city.slug}`}
                        className="group p-3 bg-gradient-to-br from-slate-50 to-white rounded-lg border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all text-center"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium text-slate-900 group-hover:text-amber-500 transition-colors text-sm">
                            {city.name}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{city.distance} mi</p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="mt-16 p-8 bg-slate-900 rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-amber-400 mb-2">{cities.length}+</p>
                <p className="text-white/80">Cities Served</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-amber-400 mb-2">5</p>
                <p className="text-white/80">Counties Covered</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-amber-400 mb-2">Same Day</p>
                <p className="text-white/80">Free Estimates</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-amber-400 mb-2">5.0</p>
                <p className="text-white/80">Star Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
