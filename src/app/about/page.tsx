import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Hero, CTASection } from '@/components/sections';
import { JsonLd } from '@/components/seo';
import { SITE_NAME, IMAGES, PHONE, ADDRESS, LOGO_URL, HIC_NUMBER, SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: `About ${SITE_NAME} | Since 2015 | 500+ Projects | 5.0★ Google Rating`,
  description: `Meet Massachusetts' #1 rated home improvement team. Family-owned since 2015, 500+ projects, 100+ cities. Licensed HIC #${HIC_NUMBER} & insured. 19 5-star Google reviews. Call ${PHONE}`,
  keywords: [
    'about Maia Construction',
    'Massachusetts contractor history',
    'family owned contractor MA',
    'Marlborough home improvement company',
    'trusted contractor Massachusetts',
  ],
  alternates: {
    canonical: 'https://maiaconstruction.com/about',
  },
};

const milestones = [
  { year: '2015', title: 'Founded', description: 'Marcos Alves founded Maia Construction with a vision for quality craftsmanship.' },
  { year: '2017', title: 'Expanded Services', description: 'Added comprehensive window and door installation services.' },
  { year: '2020', title: '500+ Projects', description: 'Completed over 500 successful home improvement projects.' },
  { year: '2024', title: '100+ Cities', description: 'Now proudly serving over 100 communities across Massachusetts.' },
];

export default function AboutPage() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    image: LOGO_URL,
    url: 'https://maiaconstruction.com',
    telephone: PHONE,
    address: {
      '@type': 'PostalAddress',
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.state,
      postalCode: ADDRESS.zip,
      addressCountry: 'US',
    },
    founder: {
      '@type': 'Person',
      name: 'Marcos',
    },
    foundingDate: '2015',
    areaServed: 'Massachusetts',
  };

  return (
    <>
      <JsonLd data={organizationSchema} />

      <Hero
        title="About Maia Construction"
        subtitle="Your trusted partner for quality home improvement in Massachusetts"
        badge="Our Story"
        showCTA={false}
        size="inner"
      />

      {/* Our Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Building Trust, One Home at a Time
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mb-8" />
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  Founded by Marcos Alves in 2015, Maia Construction began with a simple mission:
                  to provide Massachusetts homeowners with quality craftsmanship they can trust.
                </p>
                <p>
                  What started as a small siding installation business has grown into a
                  comprehensive home improvement company serving over 100 communities
                  across the state.
                </p>
                <p>
                  Our team combines traditional craftsmanship with modern techniques and
                  materials, ensuring every project meets the highest standards of quality
                  and durability.
                </p>
                <p>
                  We take pride in our work and treat every home as if it were our own.
                  From the initial consultation to the final walkthrough, we&apos;re committed
                  to exceeding your expectations.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={IMAGES.hero}
                  alt="Maia Construction team completing a siding installation project in Marlborough Massachusetts - licensed contractor HIC #204634 serving 100+ MA cities"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-amber-400 text-slate-900 p-6 rounded-2xl shadow-lg">
                <p className="text-4xl font-bold">10+</p>
                <p className="font-semibold">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Values</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality First',
                description: 'We never compromise on materials or workmanship. Every project receives our full attention to detail.',
                icon: (
                  <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Integrity',
                description: 'Honest pricing, clear communication, and doing what we say. Your trust is our foundation.',
                icon: (
                  <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                title: 'Excellence',
                description: 'We continuously improve our skills and techniques to deliver the best results for your home.',
                icon: (
                  <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ),
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Journey</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto" />
          </div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex gap-8 mb-12 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-lg">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-amber-200 mt-4" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Projects Completed' },
              { number: '100+', label: 'Cities Served' },
              { number: '10+', label: 'Years Experience' },
              { number: '5.0', label: 'Star Rating' },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-5xl md:text-6xl font-bold text-amber-400 mb-2">{stat.number}</p>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AEO About Block */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto aeo-answer aeo-speakable">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              About {SITE_NAME} — Massachusetts Home Improvement Contractor
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              {SITE_NAME} is a family-owned home improvement company founded in 2015 by Marcos, based in
              Charlton, Massachusetts. Licensed under MA HIC #{HIC_NUMBER} and fully insured, we have
              completed over 500 projects across 100+ Massachusetts cities. Our services include{' '}
              <Link href="/services/siding" className="text-amber-600 hover:underline font-semibold">professional siding installation</Link>,{' '}
              <Link href="/services/windows" className="text-amber-600 hover:underline font-semibold">energy-efficient window replacement</Link>,{' '}
              <Link href="/services/doors" className="text-amber-600 hover:underline font-semibold">premium door installation</Link>, and{' '}
              <Link href="/services/general-contractor" className="text-amber-600 hover:underline font-semibold">general contracting</Link>.
            </p>
            <p className="text-gray-600 mb-6">
              We are certified installers for James Hardie, CertainTeed, and Alside, and all our window
              installations meet ENERGY STAR standards. With a perfect 5.0-star Google rating and 19 verified
              reviews, we are committed to quality craftsmanship and customer satisfaction. Call{' '}
              <a href="tel:+15088599880" className="text-amber-600 font-semibold">{PHONE}</a>{' '}
              or <Link href="/contact" className="text-amber-600 hover:underline font-semibold">request a free estimate online</Link>.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/services" className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-sm text-amber-700 hover:bg-amber-100 transition-colors">
                Our Services
              </Link>
              <Link href="/cities" className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-sm text-amber-700 hover:bg-amber-100 transition-colors">
                Cities We Serve
              </Link>
              <Link href="/blog" className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-sm text-amber-700 hover:bg-amber-100 transition-colors">
                Home Improvement Blog
              </Link>
              <Link href="/contact" className="px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-sm text-amber-700 hover:bg-amber-100 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Work With Us?"
        subtitle="Let's discuss your project and see how we can help transform your home."
      />
    </>
  );
}
