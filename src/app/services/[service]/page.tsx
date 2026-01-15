import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Hero, Testimonials, CityGrid, CTASection } from '@/components/sections';
import { ContactForm } from '@/components/forms';
import { JsonLd } from '@/components/seo';
import { services, getServiceBySlug } from '@/lib/services';
import { cities } from '@/lib/cities';
import { SITE_NAME, PHONE } from '@/lib/constants';

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    service: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) return {};

  return {
    title: `${service.name} Services`,
    description: `Professional ${service.name.toLowerCase()} services in Massachusetts. ${service.shortDescription} Call ${PHONE} for a free estimate.`,
    keywords: [
      `${service.name.toLowerCase()} installation`,
      `${service.name.toLowerCase()} Massachusetts`,
      `${service.name.toLowerCase()} contractor`,
      `best ${service.name.toLowerCase()} company MA`,
    ],
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  const featuredCities = cities.slice(0, 12);

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

          <div className="grid md:grid-cols-3 gap-6">
            {[service.image, service.image, service.image].map((img, index) => (
              <div key={index} className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={img}
                  alt={`${service.name} project ${index + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Cities for this Service */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {service.name} Services by City
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
            <p className="text-xl text-gray-600">
              Find {service.name.toLowerCase()} services in your area
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {featuredCities.map((city) => (
              <Link
                key={city.slug}
                href={`/services/${service.slug}/${city.slug}`}
                className="group p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all text-center"
              >
                <svg className="w-8 h-8 text-amber-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold text-slate-900 group-hover:text-amber-500 transition-colors">
                  {city.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/cities"
              className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all"
            >
              View All {cities.length}+ Cities
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
