import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { srcSetFor } from '@/lib/heroImages';
import Link from 'next/link';
import { HeroWithForm, CTASection, WhyChooseUs, ReviewsHighlight } from '@/components/sections';
import { JsonLd, organizationSchema, websiteSchema } from '@/components/seo';
import { services } from '@/lib/services';
import { SITE_NAME, HIC_NUMBER, PHONE, SITE_URL, PHONE_LINK, SOCIAL_LINKS, ADDRESS, BUSINESS_HOURS, EMAIL, REAL_PHOTOS, SERVICE_PHOTOS } from '@/lib/constants';

export const metadata: Metadata = {
  title: `#1 Siding & Window Contractor MA (2026) | 500+ Projects | Free Estimate`,
  description: `#1 siding & exterior contractor in Massachusetts. Expert siding, windows, doors installation. 19 5-star reviews. Licensed HIC #${HIC_NUMBER} & insured. FREE estimates. Call ${PHONE}`,
  alternates: { canonical: SITE_URL },
};

const VideoGallery = dynamic(() => import('@/components/sections/VideoGallery'), {
  loading: () => <div className="py-24 bg-white" />,
});

const BeforeAfter = dynamic(() => import('@/components/sections/BeforeAfter'), {
  loading: () => <div className="py-24 bg-slate-900" />,
});

const generalContractorSchema = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  '@id': `${SITE_URL}/#contractor`,
  name: SITE_NAME,
  url: SITE_URL,
  telephone: PHONE,
  knowsAbout: ['Siding Installation', 'Vinyl Siding', 'James Hardie Fiber Cement Siding', 'Window Replacement', 'ENERGY STAR Windows', 'Door Installation', 'Entry Doors', 'Storm Doors', 'Patio Doors', 'General Contracting', 'Home Renovation', 'Exterior Remodeling'],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Get a Home Exterior Renovation in Massachusetts',
  description: `Step-by-step process for getting professional siding, windows, or doors installed by ${SITE_NAME}.`,
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: 'Free Estimate' },
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Free Consultation', text: 'We visit your home to assess your needs and provide a detailed quote.' },
    { '@type': 'HowToStep', position: 2, name: 'Detailed Estimate', text: 'You receive a comprehensive written estimate with transparent pricing.' },
    { '@type': 'HowToStep', position: 3, name: 'Expert Installation', text: 'Our skilled team completes the work with precision and care.' },
    { '@type': 'HowToStep', position: 4, name: 'Final Walkthrough', text: 'We ensure everything meets your expectations before completion.' },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={generalContractorSchema} />

      {/* ========== SECTION 1: HERO WITH FORM ========== */}
      <HeroWithForm
        badge={`Serving 75+ MA Cities • 5-Star Rated • HIC #${HIC_NUMBER}`}
        title={
          <>
            Professional{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              Siding, Windows & Doors
            </span>{' '}
            Contractor in Massachusetts
          </>
        }
        subtitle={`Expert siding installation, window replacement, door installation, and general contracting services. Licensed and insured, working out of Charlton and serving 75+ cities across Massachusetts.`}
      />

      {/* ========== SECTION 2: GOOGLE REVIEWS BAR ========== */}
      <section className="py-4 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-white text-sm">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-amber-400">★★★★★</span>
            <span className="font-semibold">5.0</span>
            <span className="text-gray-400">(19 reviews)</span>
            <a href={SOCIAL_LINKS.google} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 font-semibold underline">
              See Our Reviews
            </a>
          </div>
        </div>
      </section>

      {/* ========== SECTION 3: OUR SERVICES (like RS - 4 cards with images) ========== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Our <span className="text-amber-500">Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From expert siding installation to energy-efficient windows and doors, we deliver quality craftsmanship on every project.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mt-6" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Link key={service.slug} href={`/services/${service.slug}`}
                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all ${index === 0 ? 'ring-2 ring-amber-400' : 'border border-slate-200'}`}>
                <div className="relative h-52 overflow-hidden">
                  {/* Card art in a 52-unit-tall box was loading the same
                      full-size photograph the hero uses — up to 253 KB each,
                      four of them below the fold. */}
                  <img
                    src={SERVICE_PHOTOS[service.slug] || REAL_PHOTOS[index % REAL_PHOTOS.length]}
                    srcSet={srcSetFor(SERVICE_PHOTOS[service.slug] || REAL_PHOTOS[index % REAL_PHOTOS.length])}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    alt={`${service.name} services in Massachusetts by ${SITE_NAME}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {index === 0 && (
                    <span className="absolute top-4 right-4 bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full">Featured</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-500 transition-colors mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{service.shortDescription}</p>
                  <span className="text-amber-500 font-semibold text-sm flex items-center">
                    Learn More
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: ABOUT MAIA CONSTRUCTION (like RS - text + photo) ========== */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                About <span className="text-amber-400">{SITE_NAME}</span>
              </h2>
              <div className="space-y-5 text-gray-300 leading-relaxed">
                <p>
                  Founded by <strong className="text-amber-400">Marcos</strong>, {SITE_NAME} is a premier siding, window, and door contractor based in Charlton, Massachusetts. With over a decade of hands-on experience in the construction industry, Marcos and his team have built a reputation for delivering exceptional craftsmanship, honest pricing, and reliable service to homeowners across the state.
                </p>
                <p>
                  Under Marcos&apos;s leadership, our team specializes in <strong>exterior home improvement</strong> — the first line of defense for every Massachusetts home. From complete siding replacements to energy-efficient window upgrades, we ensure that every installation is precise, durable, and built to withstand New England&apos;s demanding climate for decades.
                </p>
                <p>
                  Beyond our core services, we offer comprehensive general contracting including structural repairs, trim work, and full exterior renovations. Whether you&apos;re protecting your family from harsh winters, boosting your home&apos;s curb appeal, or increasing property value, Marcos and the {SITE_NAME} team have the expertise to get the job done right.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-400">75+</p>
                  <p className="text-sm text-gray-400">Cities Served</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-400">19</p>
                  <p className="text-sm text-gray-400">5-Star Reviews</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-400">100%</p>
                  <p className="text-sm text-gray-400">Licensed & Insured</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-400">24hr</p>
                  <p className="text-sm text-gray-400">Response Time</p>
                </div>
              </div>
              <div className="mt-8 inline-flex items-center gap-3 bg-amber-400/10 border border-amber-400/30 rounded-xl px-6 py-3">
                <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-amber-400 font-semibold">Trusted Contractor — Massachusetts Licensed HIC #{HIC_NUMBER}</span>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image src={REAL_PHOTOS[4]} alt={`${SITE_NAME} team - professional siding and window contractors in Massachusetts`}
                fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 5: OUR PROCESS (like RS - 4 steps) ========== */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Our <span className="text-amber-500">Process</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From initial consultation to project completion, we make the home improvement process simple and stress-free.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mt-6" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: '01', title: 'Free Consultation', desc: 'Call us or fill out our form. We discuss your project needs and schedule a site visit at your convenience.', icon: 'M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' },
              { step: '02', title: 'Detailed Estimate', desc: 'We provide a comprehensive written estimate with transparent pricing. No hidden fees, no surprises.', icon: 'M9 2a1 1 0 000 2h2a1 1 0 100-2H9z M4 5a2 2 0 012-2h8a2 2 0 012 2v6h-4a1 1 0 00-1 1v4H6a2 2 0 01-2-2V5z' },
              { step: '03', title: 'Expert Installation', desc: 'Our skilled team executes your project with precision, keeping you informed every step of the way.', icon: 'M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' },
              { step: '04', title: 'Final Walkthrough', desc: 'We walk through the completed project together, ensuring everything meets your expectations.', icon: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
                <span className="text-4xl font-bold text-amber-400/30">{item.step}</span>
                <div className="w-14 h-14 bg-amber-400/10 rounded-full flex items-center justify-center mx-auto my-4">
                  <svg className="w-7 h-7 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 6: WHY CHOOSE US (like RS - 4 cards) ========== */}
      <WhyChooseUs />

      {/* ========== SECTION 6b: BEFORE & AFTER TRANSFORMATIONS ========== */}
      <BeforeAfter
        title="Our Transformations"
        subtitle="Real Massachusetts homes we've transformed — drag to compare before and after"
      />

      {/* ========== SECTION 7: VIDEO GALLERY (like RS) ========== */}
      <VideoGallery
        title="See Our Work in Action"
        subtitle="Watch our expert team tackle siding, windows, doors, and more across Massachusetts."
      />

      {/* ========== SECTION 8: CUSTOMER REVIEWS (like RS) ========== */}
      <ReviewsHighlight />

      {/* ========== SECTION 9: CONTACT SECTION (like RS - form + contact info) ========== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Get Your <span className="text-amber-500">Free Estimate</span> Today
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to start your project? Contact us for a free, no-obligation estimate. We respond within 24 hours.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mt-6" />
          </div>
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-slate-900 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6">Contact Us Directly</h3>
                <div className="space-y-4">
                  <a href={PHONE_LINK} className="flex items-center gap-3 text-white hover:text-amber-400 transition-colors">
                    <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                    <span className="font-semibold">{PHONE}</span>
                  </a>
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-white hover:text-amber-400 transition-colors">
                    <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                    <span>{EMAIL}</span>
                  </a>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                    <span className="text-gray-300">{ADDRESS.full}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                    <span className="text-gray-300">Mon-Sat: {BUSINESS_HOURS.weekdays}</span>
                  </div>
                </div>
              </div>

              {/* Social + Trust */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Follow Us</h3>
                <div className="flex gap-3 mb-6">
                  <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Maia Construction on Facebook" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-white transition-colors text-slate-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>
                  </a>
                  <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Maia Construction on Instagram" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-white transition-colors text-slate-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2.16c3.2,0,3.58.01,4.85.07,1.17.05,1.97.24,2.44.41.61.24,1.05.52,1.51.98s.74.9.98,1.51c.17.47.36,1.27.41,2.44.06,1.27.07,1.65.07,4.85s-.01,3.58-.07,4.85c-.05,1.17-.24,1.97-.41,2.44a4.09,4.09,0,0,1-.98,1.51,4.09,4.09,0,0,1-1.51.98c-.47.17-1.27.36-2.44.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.44-.41a4.09,4.09,0,0,1-1.51-.98,4.09,4.09,0,0,1-.98-1.51c-.17-.47-.36-1.27-.41-2.44-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.97.41-2.44a4.09,4.09,0,0,1,.98-1.51,4.09,4.09,0,0,1,1.51-.98c.47-.17,1.27-.36,2.44-.41,1.27-.06,1.65-.07,4.85-.07M12,0C8.74,0,8.33.01,7.05.07,5.78.13,4.9.33,4.14.63A5.89,5.89,0,0,0,2,2,5.89,5.89,0,0,0,.63,4.14C.33,4.9.13,5.78.07,7.05.01,8.33,0,8.74,0,12s.01,3.67.07,4.95c.06,1.27.26,2.15.56,2.91A5.89,5.89,0,0,0,2,22a5.89,5.89,0,0,0,2.14,1.37c.76.3,1.64.5,2.91.56,1.28.06,1.69.07,4.95.07s3.67-.01,4.95-.07c1.27-.06,2.15-.26,2.91-.56A6.14,6.14,0,0,0,22,20.14c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91A5.89,5.89,0,0,0,22,2a5.89,5.89,0,0,0-2.14-1.37C19.1.33,18.22.13,16.95.07,15.67.01,15.26,0,12,0Z"/><path d="M12,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Z"/><circle cx="18.41" cy="5.59" r="1.44"/></svg>
                  </a>
                  <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="Maia Construction on YouTube" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-white transition-colors text-slate-600">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <p className="font-bold text-slate-900">Licensed</p>
                    <p className="text-xs text-gray-500">HIC #{HIC_NUMBER}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <p className="font-bold text-slate-900">5-Star</p>
                    <p className="text-xs text-gray-500">19 Reviews</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <p className="font-bold text-slate-900">Free</p>
                    <p className="text-xs text-gray-500">Estimates</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg text-center">
                    <p className="font-bold text-slate-900">Warranty</p>
                    <p className="text-xs text-gray-500">25-50 Years</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="space-y-8">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2956.63953798694!2d-71.9693511!3d42.1793914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e38b5dd08e79af%3A0x1d2168059bbbb4a0!2sMaia%20Construction!5e0!3m2!1sen!2sbr!4v1785546800349!5m2!1sen!2sbr"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Maia Construction location on Google Maps"
                />
              </div>
              <p className="text-center text-gray-500 text-sm">
                Serving all of Central Massachusetts — We come to you for free estimates!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 10: GOLD CTA BANNER (like RS) ========== */}
      <section className="py-8 bg-gradient-to-r from-amber-400 to-yellow-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Ready to Start Your Home Improvement Project?
              </h2>
              <p className="text-slate-700 mt-1">
                Expert siding, windows, doors, and more. Free estimates, no obligation.
              </p>
            </div>
            <a href={PHONE_LINK} className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all whitespace-nowrap">
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
