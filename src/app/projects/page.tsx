import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Hero, CTASection } from '@/components/sections';
import { JsonLd } from '@/components/seo';
import { SITE_NAME, SITE_URL, IMAGES } from '@/lib/constants';

const BeforeAfter = dynamic(() => import('@/components/sections/BeforeAfter'), {
  loading: () => <div className="py-24 bg-slate-900" />,
});

export const metadata: Metadata = {
  title: '500+ Projects Completed | Before & After Photos | MA Contractor',
  description: `See 500+ real before & after transformations — siding, windows & doors across Massachusetts. ★5.0 rated craftsmanship. View our portfolio and get inspired for your home!`,
  alternates: {
    canonical: 'https://maiaconstruction.com/projects',
  },
};

const projects = [
  {
    id: '1',
    title: 'Full Vinyl Siding Replacement',
    location: 'Framingham, MA',
    image: '/images/before-after/exterior-after-worcester-ma.webp',
    service: 'Siding',
    description: 'Complete vinyl siding replacement on a Cape-style home — a striking navy-blue exterior that dramatically improved curb appeal and energy efficiency.',
  },
  {
    id: '2',
    title: 'Cedar-to-Vinyl Siding Transformation',
    location: 'Worcester, MA',
    image: '/images/before-after/exterior-before-worcester-ma.webp',
    service: 'Siding',
    description: 'Worn cedar shingles replaced with fresh blue-gray vinyl siding and a rebuilt front porch — an outdated home transformed into a modern showpiece.',
  },
  {
    id: 'siding-marlborough',
    title: 'Carriage House Fiber-Cement Siding',
    location: 'Marlborough, MA',
    image: '/images/before-after/siding-after-marlborough-ma.webp',
    service: 'Siding',
    description: 'HardiePlank fiber-cement siding on a new carriage house — durable, low-maintenance protection built for New England weather.',
  },
  {
    id: 'siding-natick',
    title: 'Split-Level Siding Replacement',
    location: 'Natick, MA',
    image: '/images/before-after/siding-after-natick-ma.webp',
    service: 'Siding',
    description: 'Full siding tear-off and replacement with new gray vinyl over the brick base — a clean, modern exterior with lasting curb appeal.',
  },
  {
    id: 'siding-hudson',
    title: 'Complete Exterior Siding',
    location: 'Hudson, MA',
    image: '/images/before-after/siding-after-hudson-ma.webp',
    service: 'Siding',
    description: 'Full exterior siding installation in olive-green vinyl on a gambrel-roof home — weather-tight, energy-efficient, and beautifully finished.',
  },
  {
    id: '3',
    title: 'Window Installation',
    location: 'Natick, MA',
    image: IMAGES.windows,
    service: 'Windows',
    description: 'Energy-efficient window replacement throughout the home. New double-pane windows with Low-E coating for maximum insulation.',
  },
  {
    id: '4',
    title: 'Window Replacement',
    location: 'Sudbury, MA',
    image: IMAGES.windows2,
    service: 'Windows',
    description: 'Full house window replacement with modern vinyl frames and energy-efficient glass.',
  },
  {
    id: '5',
    title: 'Entry Door Installation',
    location: 'Marlborough, MA',
    image: IMAGES.doors,
    service: 'Doors',
    description: 'Premium fiberglass entry door installation with sidelights. Enhanced security and curb appeal with a beautiful new entrance.',
  },
  {
    id: '6',
    title: 'Door Upgrade',
    location: 'Hudson, MA',
    image: IMAGES.doors2,
    service: 'Doors',
    description: 'Custom door installation with decorative glass and premium hardware.',
  },
  {
    id: '7',
    title: 'Home Renovation',
    location: 'Westborough, MA',
    image: IMAGES.generalContractor,
    service: 'General Contractor',
    description: 'Comprehensive home renovation including siding, windows, and doors. A complete exterior makeover.',
  },
  {
    id: '8',
    title: 'Exterior Remodel',
    location: 'Northborough, MA',
    image: IMAGES.generalContractor2,
    service: 'General Contractor',
    description: 'Complete exterior remodeling with new siding, trim work, and updated landscaping.',
  },
  {
    id: '9',
    title: 'Window & Door Package',
    location: 'Shrewsbury, MA',
    image: IMAGES.windows3,
    service: 'Windows',
    description: 'Complete window and door replacement package. New energy-efficient windows throughout.',
  },
  {
    id: '10',
    title: 'Storm Door Installation',
    location: 'Grafton, MA',
    image: IMAGES.doors3,
    service: 'Doors',
    description: 'Quality storm door installation for enhanced protection and energy efficiency.',
  },
  {
    id: '11',
    title: 'Bay Window Installation',
    location: 'Concord, MA',
    image: IMAGES.windows4,
    service: 'Windows',
    description: 'Beautiful bay window installation creating more natural light and space.',
  },
  {
    id: '12',
    title: 'Patio Door Installation',
    location: 'Lexington, MA',
    image: IMAGES.doors4,
    service: 'Doors',
    description: 'Sliding patio door installation with energy-efficient glass and smooth operation.',
  },
];

export default function ProjectsPage() {
  // Approximate town-center coordinates for the Massachusetts service-area
  // cities, used to geotag each project image via schema.org contentLocation.
  const CITY_GEO: Record<string, [number, number]> = {
    'Concord, MA': [42.4604, -71.3489],
    'Framingham, MA': [42.2793, -71.4162],
    'Grafton, MA': [42.2070, -71.6856],
    'Hudson, MA': [42.3918, -71.5662],
    'Lexington, MA': [42.4473, -71.2245],
    'Marlborough, MA': [42.3459, -71.5523],
    'Natick, MA': [42.2775, -71.3468],
    'Northborough, MA': [42.3195, -71.6412],
    'Shrewsbury, MA': [42.2959, -71.7128],
    'Sudbury, MA': [42.3834, -71.4162],
    'Westborough, MA': [42.2695, -71.6162],
    'Worcester, MA': [42.2626, -71.8023],
  };

  const projectsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${SITE_NAME} Projects Portfolio`,
    description: 'View our completed home improvement projects across Massachusetts.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => {
        const geo = CITY_GEO[project.location];
        const locality = project.location.replace(/,\s*MA$/, '');
        return {
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'ImageObject',
            name: project.title,
            description: project.description,
            contentUrl: project.image.startsWith('http') ? project.image : `${SITE_URL}${project.image}`,
            creator: { '@type': 'Organization', name: SITE_NAME },
            copyrightHolder: { '@type': 'Organization', name: SITE_NAME },
            contentLocation: {
              '@type': 'Place',
              name: project.location,
              address: {
                '@type': 'PostalAddress',
                addressLocality: locality,
                addressRegion: 'MA',
                addressCountry: 'US',
              },
              ...(geo ? { geo: { '@type': 'GeoCoordinates', latitude: geo[0], longitude: geo[1] } } : {}),
            },
          },
        };
      }),
    },
  };

  return (
    <>
      <JsonLd data={projectsSchema} />

      <Hero
        title="Our Projects"
        subtitle="See the quality of our work through our completed projects"
        badge="Portfolio"
        showCTA={false}
        size="inner"
      />

      {/* Stats */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-amber-400 mb-2">500+</p>
              <p className="text-white/80">Projects Completed</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-amber-400 mb-2">100+</p>
              <p className="text-white/80">Cities Served</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-amber-400 mb-2">10+</p>
              <p className="text-white/80">Years Experience</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-amber-400 mb-2">5.0</p>
              <p className="text-white/80">Star Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Recent Work</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every project tells a story of quality craftsmanship. See how we&apos;ve helped Massachusetts homeowners improve their homes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative h-56">
                  <Image
                    src={project.image}
                    alt={`${project.title} in ${project.location} - professional ${project.service.toLowerCase()} project by Maia Construction licensed Massachusetts contractor`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Service Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-bold shadow-lg">
                    {project.service}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-amber-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-amber-500 font-semibold text-sm mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {project.location}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
            <p className="text-xl text-gray-600">
              Professional installation services for every home improvement need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Siding', slug: 'siding', image: IMAGES.siding },
              { name: 'Windows', slug: 'windows', image: IMAGES.windows },
              { name: 'Doors', slug: 'doors', image: IMAGES.doors },
              { name: 'General Contractor', slug: 'general-contractor', image: IMAGES.generalContractor },
            ].map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-lg"
              >
                <Image
                  src={service.image}
                  alt={`${service.name} installation services in Marlborough Massachusetts - Maia Construction professional ${service.name.toLowerCase()} contractor serving 100+ MA cities`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {service.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BeforeAfter
        title="Before & After Transformations"
        subtitle="Drag the slider to see real Maia Construction projects, before and after"
      />

      <CTASection
        title="Ready to Start Your Project?"
        subtitle="Contact us today for a free estimate on your home improvement project."
      />
    </>
  );
}
