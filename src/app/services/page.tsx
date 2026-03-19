import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Hero, CTASection } from '@/components/sections';
import { JsonLd } from '@/components/seo';
import { services } from '@/lib/services';
import { cities } from '@/lib/cities';
import { SITE_NAME, IMAGES, SITE_URL, HIC_NUMBER, PHONE } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Expert Home Exterior Services MA | #1 Rated Contractor | ${SITE_NAME}`,
  description: `Professional siding, windows, doors & general contracting in Massachusetts. #1 rated with 47+ 5-star reviews. Licensed HIC #${HIC_NUMBER}. FREE estimates. Call ${PHONE}`,
  keywords: [
    'siding installation Massachusetts',
    'window replacement MA',
    'door installation Boston',
    'home exterior services MA',
    'energy efficient windows MA',
    'vinyl siding contractor Massachusetts',
  ],
  alternates: {
    canonical: 'https://maiaconstruction.com/services',
  },
};

export default function ServicesPage() {
  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.shortDescription,
        provider: {
          '@type': 'HomeAndConstructionBusiness',
          name: SITE_NAME,
        },
      },
    })),
  };

  return (
    <>
      <JsonLd data={servicesSchema} />

      <Hero
        title="Expert Home Exterior Services"
        subtitle="Transform your home with premium siding, energy-efficient windows, and secure doors — backed by industry-leading warranties"
        badge="MA Licensed & Insured"
        backgroundImage={IMAGES.generalContractor2}
        showCTA={false}
        size="inner"
      />

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={service.image}
                      alt={`Professional ${service.name.toLowerCase()} installation in Massachusetts by Maia Construction - licensed contractor serving Marlborough, Framingham, Worcester MA`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-400 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-10 h-10 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <h2 className="text-4xl font-bold text-slate-900 mb-4">{service.name}</h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mb-6" />
                  <p className="text-lg text-gray-600 mb-8">{service.fullDescription}</p>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="font-bold text-slate-900 mb-4">What We Offer:</h3>
                    <ul className="grid grid-cols-2 gap-3">
                      {service.features.slice(0, 6).map((feature, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="mb-8">
                    <h3 className="font-bold text-slate-900 mb-4">Benefits:</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.benefits.slice(0, 4).map((benefit, i) => (
                        <span key={i} className="px-4 py-2 bg-slate-100 rounded-full text-sm text-slate-700">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Get FREE {service.name} Estimate
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Process</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From initial consultation to final inspection, we ensure a smooth experience
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Free Consultation', description: 'We visit your home to assess your needs and provide a detailed quote.' },
              { step: '2', title: 'Material Selection', description: 'Choose from premium materials that fit your style and budget.' },
              { step: '3', title: 'Expert Installation', description: 'Our skilled team completes the work with precision and care.' },
              { step: '4', title: 'Final Walkthrough', description: 'We ensure everything meets your expectations before completion.' },
            ].map((process, index) => (
              <div key={index} className="relative text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-300 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-slate-900">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-amber-400 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AEO Answer Block for AI Search */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto aeo-answer">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Home Improvement Services in Massachusetts
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              <strong>{SITE_NAME}</strong> offers comprehensive home exterior services across Massachusetts.
              As a licensed contractor (MA HIC #{HIC_NUMBER}) with a perfect 5.0-star rating, we specialize
              in <Link href="/services/siding" className="text-amber-600 hover:underline font-semibold">siding installation</Link> (vinyl and James Hardie fiber cement),{' '}
              <Link href="/services/windows" className="text-amber-600 hover:underline font-semibold">ENERGY STAR window replacement</Link>,{' '}
              <Link href="/services/doors" className="text-amber-600 hover:underline font-semibold">premium door installation</Link>, and{' '}
              <Link href="/services/general-contractor" className="text-amber-600 hover:underline font-semibold">general contracting</Link>.
              Every project includes free estimates, transparent pricing, and 25-50 year manufacturer warranties.
            </p>
          </div>
        </div>
      </section>

      {/* Internal Backlinks - Services by City */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            Find Our Services Near You
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div key={service.slug} className="bg-white rounded-xl p-5 shadow-md">
                <h3 className="font-bold text-lg text-slate-900 mb-3">
                  <Link href={`/services/${service.slug}`} className="hover:text-amber-600">
                    {service.name}
                  </Link>
                </h3>
                <ul className="space-y-1.5">
                  {cities.slice(0, 8).map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={`/services/${service.slug}/${city.slug}`}
                        className="text-sm text-gray-500 hover:text-amber-600 transition-colors"
                      >
                        {service.name} in {city.name} →
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Blog Backlinks */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Related Guides</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/blog/how-to-choose-right-siding" className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm hover:border-amber-400 hover:text-amber-600 transition-colors">
                How to Choose Siding
              </Link>
              <Link href="/blog/energy-efficient-windows-guide" className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm hover:border-amber-400 hover:text-amber-600 transition-colors">
                Energy-Efficient Windows Guide
              </Link>
              <Link href="/blog/vinyl-vs-fiber-cement-siding-comparison" className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm hover:border-amber-400 hover:text-amber-600 transition-colors">
                Vinyl vs. Fiber Cement
              </Link>
              <Link href="/blog/window-replacement-cost-massachusetts" className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm hover:border-amber-400 hover:text-amber-600 transition-colors">
                Window Costs MA 2026
              </Link>
              <Link href="/blog/sliding-vs-french-vs-bifold-patio-doors" className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm hover:border-amber-400 hover:text-amber-600 transition-colors">
                Patio Door Comparison
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
