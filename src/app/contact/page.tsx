import { Metadata } from 'next';
import { Hero } from '@/components/sections';
import { ContactForm } from '@/components/forms';
import { JsonLd } from '@/components/seo';
import { SITE_NAME, PHONE, PHONE_LINK, ADDRESS, BUSINESS_HOURS, IMAGES, LOGO_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us | FREE Estimate - Same Day Response | Maia Construction',
  description: `Get your FREE home improvement estimate! Call ${PHONE} or fill out our form. MA HIC licensed, 5-star rated. Siding, windows, doors in 100+ MA cities. Response within 24 hours guaranteed.`,
  keywords: [
    'free estimate siding Massachusetts',
    'contact window contractor MA',
    'home improvement quote Boston',
    'siding contractor phone number',
  ],
};

export default function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    mainEntity: {
      '@type': 'HomeAndConstructionBusiness',
      name: SITE_NAME,
      image: LOGO_URL,
      telephone: PHONE,
      address: {
        '@type': 'PostalAddress',
        streetAddress: ADDRESS.street,
        addressLocality: ADDRESS.city,
        addressRegion: ADDRESS.state,
        postalCode: ADDRESS.zip,
        addressCountry: 'US',
      },
    },
  };

  return (
    <>
      <JsonLd data={contactSchema} />

      <Hero
        title="Contact Us"
        subtitle="Get in touch for a free estimate on your home improvement project"
        badge="Get In Touch"
        showCTA={false}
        size="inner"
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Let&apos;s Discuss Your Project
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mb-8" />
              <p className="text-lg text-gray-600 mb-8">
                Whether you&apos;re looking to replace your siding, install new windows, or update
                your doors, we&apos;re here to help. Contact us today for a free, no-obligation
                estimate.
              </p>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-amber-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Phone</h3>
                    <a href={PHONE_LINK} className="text-lg text-amber-500 hover:text-amber-600 font-semibold">
                      {PHONE}
                    </a>
                    <p className="text-gray-500 text-sm mt-1">Call us for immediate assistance</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-amber-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Location</h3>
                    <p className="text-gray-600">{ADDRESS.full}</p>
                    <p className="text-gray-500 text-sm mt-1">Serving all of Massachusetts</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-amber-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">Mon-Fri: {BUSINESS_HOURS.weekdays}</p>
                    <p className="text-gray-600">Saturday: {BUSINESS_HOURS.saturday}</p>
                    <p className="text-gray-600">Sunday: {BUSINESS_HOURS.sunday}</p>
                  </div>
                </div>
              </div>

              {/* Service Area Map Placeholder */}
              <div className="mt-12 bg-slate-100 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Service Area</h3>
                <p className="text-gray-600 mb-4">
                  We proudly serve over 100 cities throughout Massachusetts, including:
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Marlborough', 'Framingham', 'Worcester', 'Natick', 'Hudson', 'Shrewsbury'].map((city) => (
                    <span key={city} className="px-3 py-1 bg-white rounded-full text-sm text-slate-700 border border-slate-200">
                      {city}
                    </span>
                  ))}
                  <span className="px-3 py-1 bg-amber-400 rounded-full text-sm text-slate-900 font-semibold">
                    + 100 more
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto" />
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'How long does a typical project take?',
                a: 'Project timelines vary based on scope. Siding installation typically takes 3-7 days, window replacement 1-3 days, and door installation usually completed in a single day.',
              },
              {
                q: 'Do you offer free estimates?',
                a: 'Yes! We provide free, no-obligation estimates for all projects. Contact us to schedule a convenient time for your consultation.',
              },
              {
                q: 'Are you licensed and insured?',
                a: 'Absolutely. Maia Construction is fully licensed and insured to work throughout Massachusetts. We carry comprehensive liability and workers\' compensation insurance.',
              },
              {
                q: 'What warranty do you offer?',
                a: 'We stand behind our work with a comprehensive warranty on both materials and labor. Specific warranty terms vary by product and are detailed in your contract.',
              },
              {
                q: 'Do you handle permits?',
                a: 'Yes, we handle all necessary permits and inspections as part of our service. This ensures your project meets all local building codes.',
              },
            ].map((faq, index) => (
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
    </>
  );
}
