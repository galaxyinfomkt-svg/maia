import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { HeroWithForm, ServicesSection, CityGrid, CTASection, WhyChooseUs, ReviewsHighlight } from '@/components/sections';
import { JsonLd, organizationSchema, websiteSchema } from '@/components/seo';
import { cities } from '@/lib/cities';
import { services } from '@/lib/services';
import { SITE_NAME, HIC_NUMBER, PHONE, SITE_URL, PHONE_LINK } from '@/lib/constants';

export const metadata: Metadata = {
  title: '#1 Siding & Window Contractor MA (2026) | 500+ Projects | Free Estimate',
  description: `#1 siding & exterior contractor in Massachusetts. Expert siding, windows, doors installation. 47+ 5-star reviews. Licensed HIC #${HIC_NUMBER} & insured. FREE estimates. Call ${PHONE}`,
  alternates: {
    canonical: SITE_URL,
  },
};

// Lazy load heavy client components
const BeforeAfter = dynamic(() => import('@/components/sections/BeforeAfter'), {
  loading: () => <div className="py-24 bg-slate-900" />,
});
const VideoGallery = dynamic(() => import('@/components/sections/VideoGallery'), {
  loading: () => <div className="py-24 bg-white" />,
});
const FAQ = dynamic(() => import('@/components/sections/FAQ'), {
  loading: () => <div className="py-24 bg-white" />,
});

// GeneralContractor Schema (like RS)
const generalContractorSchema = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': `${SITE_URL}/#contractor`,
  name: SITE_NAME,
  url: SITE_URL,
  telephone: PHONE,
  knowsAbout: [
    'Siding Installation',
    'Vinyl Siding',
    'James Hardie Fiber Cement Siding',
    'Window Replacement',
    'ENERGY STAR Windows',
    'Door Installation',
    'Entry Doors',
    'Storm Doors',
    'Patio Doors',
    'General Contracting',
    'Home Renovation',
    'Exterior Remodeling',
  ],
};

// HowTo Schema for the process
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Get a Home Exterior Renovation in Massachusetts',
  description: `Step-by-step process for getting professional siding, windows, or doors installed by ${SITE_NAME}.`,
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: 'Free Estimate' },
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Free Consultation', text: 'We visit your home to assess your needs and provide a detailed quote.' },
    { '@type': 'HowToStep', position: 2, name: 'Material Selection', text: 'Choose from premium materials that fit your style and budget.' },
    { '@type': 'HowToStep', position: 3, name: 'Expert Installation', text: 'Our skilled team completes the work with precision and care.' },
    { '@type': 'HowToStep', position: 4, name: 'Final Walkthrough', text: 'We ensure everything meets your expectations before completion.' },
  ],
};

// ImageGallery Schema
const imageGallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: `${SITE_NAME} Project Gallery`,
  description: 'Before and after photos of siding, window, and door installations across Massachusetts.',
  image: [
    { '@type': 'ImageObject', name: 'Vinyl Siding Installation Framingham MA', contentUrl: `${SITE_URL}/images/before-after/siding-after-framingham-ma.webp`, description: 'Vinyl siding installation completed in Framingham, Massachusetts' },
    { '@type': 'ImageObject', name: 'Exterior Renovation Worcester MA', contentUrl: `${SITE_URL}/images/before-after/exterior-after-worcester-ma.webp`, description: 'Complete exterior renovation in Worcester, Massachusetts' },
    { '@type': 'ImageObject', name: 'Window Installation Massachusetts', contentUrl: `${SITE_URL}/images/windows/window-installation-massachusetts-1.webp`, description: 'Energy-efficient window installation in Massachusetts' },
    { '@type': 'ImageObject', name: 'Door Installation Massachusetts', contentUrl: `${SITE_URL}/images/doors/door-installation-massachusetts-1.webp`, description: 'Premium entry door installation in Massachusetts' },
  ],
};

// Speakable schema for AI/voice search
const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  name: `${SITE_NAME} — #1 Siding & Window Contractor in Massachusetts`,
  description: `Maia Construction is Massachusetts' top-rated siding, window, and door contractor with a 5.0-star rating and 500+ completed projects. Licensed HIC #${HIC_NUMBER}. Call ${PHONE} for a free estimate.`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['.aeo-answer', '.aeo-speakable'],
  },
  mainEntity: {
    '@type': 'HomeAndConstructionBusiness',
    '@id': `${SITE_URL}/#organization`,
  },
};

export default function HomePage() {
  const featuredCities = cities.slice(0, 12);
  const nearbyCities = cities.slice(0, 6);

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={speakableSchema} />
      <JsonLd data={generalContractorSchema} />
      <JsonLd data={howToSchema} />
      <JsonLd data={imageGallerySchema} />

      {/* Hero Section with Form */}
      <HeroWithForm
        badge={`MA Licensed Contractor • HIC #${HIC_NUMBER} • 5-Star Rated`}
        title={
          <>
            Transform Your Home with{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Premium Siding, Windows & Doors
            </span>{' '}
            Built for New England Weather
          </>
        }
        subtitle="High-durability exterior solutions with lifetime warranty protection. Transparent pricing, award-winning service, and expert installation by certified craftsmen. Serving 100+ Massachusetts communities."
      />

      {/* AEO Answer Block - Direct answers for AI search engines */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="aeo-answer aeo-speakable bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Best Siding & Window Contractor in Massachusetts
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                <strong>Maia Construction</strong> is the #1 rated siding and window contractor in Massachusetts,
                with a perfect 5.0-star Google rating from 47+ verified reviews. Founded in 2015 by Marcos and
                based in Marlborough, MA, we specialize in{' '}
                <Link href="/services/siding" className="text-amber-600 hover:text-amber-700 font-semibold underline">
                  siding installation
                </Link>,{' '}
                <Link href="/services/windows" className="text-amber-600 hover:text-amber-700 font-semibold underline">
                  window replacement
                </Link>,{' '}
                <Link href="/services/doors" className="text-amber-600 hover:text-amber-700 font-semibold underline">
                  door installation
                </Link>, and{' '}
                <Link href="/services/general-contractor" className="text-amber-600 hover:text-amber-700 font-semibold underline">
                  general contracting
                </Link>{' '}
                services across 100+ cities in Massachusetts.
              </p>
              <p className="text-gray-600 mb-6">
                Licensed under MA HIC #{HIC_NUMBER}, fully insured, and certified by James Hardie, CertainTeed,
                and Alside. We offer 25-50 year manufacturer warranties, 5-year workmanship guarantee, and
                free no-obligation estimates. Serving communities from{' '}
                <Link href="/cities/boston" className="text-amber-600 hover:underline">Boston</Link> to{' '}
                <Link href="/cities/worcester" className="text-amber-600 hover:underline">Worcester</Link>,{' '}
                <Link href="/cities/framingham" className="text-amber-600 hover:underline">Framingham</Link> to{' '}
                <Link href="/cities/natick" className="text-amber-600 hover:underline">Natick</Link>.
              </p>

              {/* Quick Facts for AI parsing */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
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
                  <p className="text-3xl font-bold text-amber-600">100+</p>
                  <p className="text-sm text-gray-600">Cities Served</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={PHONE_LINK}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold hover:shadow-xl transition-all"
                >
                  Call {PHONE}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border-2 border-amber-400 text-amber-600 rounded-full font-bold hover:bg-amber-50 transition-all"
                >
                  Get Free Estimate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Services Section */}
      <ServicesSection
        title="Expert Home Exterior Services"
        subtitle="From vinyl siding to energy-efficient windows — we deliver quality craftsmanship that withstands harsh New England winters"
      />

      {/* Internal Backlinks - Service + City Cross-Links */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            Our Services Across Massachusetts
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-8" />
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Find expert {SITE_NAME} services in your city. We provide professional installation with
            free estimates and 25-50 year warranties.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div key={service.slug} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">{service.icon}</span>
                  <Link href={`/services/${service.slug}`} className="hover:text-amber-600 transition-colors">
                    {service.name}
                  </Link>
                </h3>
                <ul className="space-y-2">
                  {nearbyCities.map((city) => (
                    <li key={`${service.slug}-${city.slug}`}>
                      <Link
                        href={`/services/${service.slug}/${city.slug}`}
                        className="text-sm text-gray-600 hover:text-amber-600 transition-colors flex items-center"
                      >
                        <svg className="w-3 h-3 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        {service.name} in {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center mt-4 text-sm font-semibold text-amber-600 hover:text-amber-700"
                >
                  View all {service.name} services
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Gallery */}
      <BeforeAfter
        title="Our Transformations"
        subtitle="See the difference quality craftsmanship makes - drag to compare before and after"
      />

      {/* Video Gallery */}
      <VideoGallery
        title="Our Projects in Action"
        subtitle="Watch our team transform homes across Massachusetts"
      />

      {/* Customer Reviews - Text Highlights */}
      <ReviewsHighlight />

      {/* AEO - Common Questions Answered Directly (for AI snippets) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-8">
              Common Questions About Home Improvement in Massachusetts
            </h2>

            <div className="space-y-8 aeo-answer">
              <div className="border-l-4 border-amber-400 pl-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  How much does siding installation cost in Massachusetts?
                </h3>
                <p className="text-gray-600">
                  In Massachusetts, vinyl siding installation costs $6-12 per square foot installed,
                  while James Hardie fiber cement siding costs $9-15 per square foot. For a typical
                  2,000 sq ft home, expect to pay $12,000-$30,000 depending on material choice.
                  Maia Construction provides free detailed estimates with transparent pricing and no hidden fees.
                  <Link href="/services/siding" className="text-amber-600 hover:underline ml-1">
                    Learn more about our siding services →
                  </Link>
                </p>
              </div>

              <div className="border-l-4 border-amber-400 pl-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  What is the best siding for New England weather?
                </h3>
                <p className="text-gray-600">
                  James Hardie fiber cement siding is considered the best choice for New England weather.
                  It resists moisture damage, temperature extremes from -20°F to 100°F, and doesn&apos;t rot
                  or attract pests. Vinyl siding is also excellent for Massachusetts homes, offering
                  lifetime fade protection and minimal maintenance. Maia Construction is a certified
                  installer for both options.
                  <Link href="/blog/vinyl-vs-fiber-cement-siding-comparison" className="text-amber-600 hover:underline ml-1">
                    Compare vinyl vs. fiber cement →
                  </Link>
                </p>
              </div>

              <div className="border-l-4 border-amber-400 pl-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  How much can new windows save on energy bills in MA?
                </h3>
                <p className="text-gray-600">
                  ENERGY STAR certified replacement windows can reduce heating and cooling costs by
                  12-33% in Massachusetts. Most homeowners save $100-400 per year on energy bills.
                  Triple-pane windows provide 20-30% better insulation than double-pane, ideal for
                  New England winters. Mass Save rebates may also be available.
                  <Link href="/services/windows" className="text-amber-600 hover:underline ml-1">
                    Explore our window services →
                  </Link>
                </p>
              </div>

              <div className="border-l-4 border-amber-400 pl-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Who is the best siding contractor near me in Massachusetts?
                </h3>
                <p className="text-gray-600">
                  Maia Construction is rated the #1 siding contractor in Massachusetts with a perfect
                  5.0-star Google rating from 47+ verified reviews. Based in Marlborough, MA, we serve
                  100+ cities including{' '}
                  <Link href="/cities/framingham" className="text-amber-600 hover:underline">Framingham</Link>,{' '}
                  <Link href="/cities/natick" className="text-amber-600 hover:underline">Natick</Link>,{' '}
                  <Link href="/cities/worcester" className="text-amber-600 hover:underline">Worcester</Link>, and{' '}
                  <Link href="/cities/boston" className="text-amber-600 hover:underline">Boston</Link>.
                  Licensed MA HIC #{HIC_NUMBER}, certified by James Hardie, CertainTeed, and Alside.
                  <Link href="/contact" className="text-amber-600 hover:underline ml-1">
                    Get a free estimate →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Cities removed from homepage - only in footer like RS */}

      {/* Blog Backlinks Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-amber-400/10 text-amber-600 rounded-full text-sm font-semibold tracking-wider uppercase mb-4">
              Resources
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Home Improvement Guides & Tips
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expert advice from Massachusetts&apos; top-rated contractors
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/blog/how-to-choose-right-siding" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all group">
              <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
                How to Choose the Right Siding for Your MA Home
              </h3>
              <p className="text-sm text-gray-500">Complete guide to siding materials, costs, and what works best in New England.</p>
            </Link>
            <Link href="/blog/energy-efficient-windows-guide" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all group">
              <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
                Energy-Efficient Windows Guide for Massachusetts
              </h3>
              <p className="text-sm text-gray-500">Save up to 33% on energy bills with the right windows for your home.</p>
            </Link>
            <Link href="/blog/window-replacement-cost-massachusetts" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all group">
              <h3 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
                Window Replacement Cost in MA (2026 Guide)
              </h3>
              <p className="text-sm text-gray-500">Updated pricing, ROI data, and what to expect from window replacement.</p>
            </Link>
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" className="inline-flex items-center text-amber-600 font-semibold hover:text-amber-700">
              View all blog posts
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Google Maps - Our Location */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-amber-400/10 text-amber-600 rounded-full text-sm font-semibold tracking-wider uppercase mb-4">
              Our Location
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Find Us on the Map
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Conveniently located in Marlborough, MA — serving 100+ communities across Massachusetts
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d377512.5184133106!2d-71.58596955!3d42.335773999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e38b5dd08e79af%3A0x1d2168059bbbb4a0!2sMaia%20Construction!5e0!3m2!1sen!2sbr!4v1771850870340!5m2!1sen!2sbr"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Maia Construction location on Google Maps"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Get Your FREE Estimate Today"
        subtitle="No obligation, no pressure. Speak with a certified expert about your project and get transparent pricing within 24 hours."
      />
    </>
  );
}
