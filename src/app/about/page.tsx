import { Metadata } from 'next';
import Image from 'next/image';
import { Hero, CTASection } from '@/components/sections';
import { JsonLd } from '@/components/seo';
import { SITE_NAME, IMAGES, PHONE, ADDRESS, LOGO_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn about ${SITE_NAME}, your trusted siding, door, and windows contractor in Massachusetts. Family-owned business with over a decade of experience serving 100+ communities.`,
};

const milestones = [
  { year: '2015', title: 'Founded', description: 'Marcos founded Maia Construction with a vision for quality craftsmanship.' },
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
        backgroundImage={IMAGES.hero}
        badge="Our Story"
        showCTA={false}
        size="small"
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
                  Founded by Marcos in 2015, Maia Construction began with a simple mission:
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
                  alt="Maia Construction Team"
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
                icon: '🎯',
                title: 'Quality First',
                description: 'We never compromise on materials or workmanship. Every project receives our full attention to detail.',
              },
              {
                icon: '🤝',
                title: 'Integrity',
                description: 'Honest pricing, clear communication, and doing what we say. Your trust is our foundation.',
              },
              {
                icon: '⭐',
                title: 'Excellence',
                description: 'We continuously improve our skills and techniques to deliver the best results for your home.',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
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

      <CTASection
        title="Ready to Work With Us?"
        subtitle="Let's discuss your project and see how we can help transform your home."
      />
    </>
  );
}
