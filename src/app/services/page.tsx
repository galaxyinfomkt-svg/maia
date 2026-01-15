import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Hero, CTASection } from '@/components/sections';
import { JsonLd } from '@/components/seo';
import { services } from '@/lib/services';
import { SITE_NAME, IMAGES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Services',
  description: `${SITE_NAME} offers professional siding, door, window installation, and general contracting services throughout Massachusetts. Quality workmanship guaranteed.`,
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
        title="Our Services"
        subtitle="Professional home improvement services tailored to your needs"
        backgroundImage={IMAGES.hero}
        badge="What We Offer"
        showCTA={false}
        size="small"
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
                      alt={service.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-amber-400 rounded-2xl flex items-center justify-center text-5xl shadow-lg">
                    {service.icon}
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
                    Learn More About {service.name}
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
              { step: '1', title: 'Free Consultation', description: 'We visit your home to assess your needs and provide a detailed quote.', icon: '📋' },
              { step: '2', title: 'Material Selection', description: 'Choose from premium materials that fit your style and budget.', icon: '🎨' },
              { step: '3', title: 'Expert Installation', description: 'Our skilled team completes the work with precision and care.', icon: '🔧' },
              { step: '4', title: 'Final Walkthrough', description: 'We ensure everything meets your expectations before completion.', icon: '✅' },
            ].map((process, index) => (
              <div key={index} className="relative text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-yellow-300 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-slate-900">
                  {process.step}
                </div>
                <div className="text-4xl mb-4">{process.icon}</div>
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

      <CTASection />
    </>
  );
}
