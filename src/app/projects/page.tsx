import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Hero, CTASection } from '@/components/sections';
import { JsonLd } from '@/components/seo';
import { SITE_NAME, IMAGES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Projects',
  description: `View our portfolio of completed siding, window, door, and home improvement projects across Massachusetts. Before & after transformations by ${SITE_NAME}.`,
};

const projects = [
  {
    id: '1',
    title: 'Vinyl Siding Transformation',
    location: 'Framingham, MA',
    beforeImage: '/images/before-after/siding-before-framingham-ma.webp',
    afterImage: '/images/before-after/siding-after-framingham-ma.webp',
    service: 'Siding',
    description: 'Complete vinyl siding replacement with insulation upgrade. This project dramatically improved the home\'s curb appeal and energy efficiency.',
  },
  {
    id: '2',
    title: 'Complete Exterior Renovation',
    location: 'Worcester, MA',
    beforeImage: '/images/before-after/exterior-before-worcester-ma.webp',
    afterImage: '/images/before-after/exterior-after-worcester-ma.webp',
    service: 'General Contractor',
    description: 'Full exterior renovation including siding, trim, and landscaping. Transformed an outdated home into a modern masterpiece.',
  },
  {
    id: '3',
    title: 'Window Installation',
    location: 'Natick, MA',
    beforeImage: IMAGES.windows,
    afterImage: IMAGES.windows2,
    service: 'Windows',
    description: 'Energy-efficient window replacement throughout the home. New double-pane windows with Low-E coating for maximum insulation.',
  },
  {
    id: '4',
    title: 'Entry Door Upgrade',
    location: 'Marlborough, MA',
    beforeImage: IMAGES.doors,
    afterImage: IMAGES.doors2,
    service: 'Doors',
    description: 'Premium fiberglass entry door installation with sidelights. Enhanced security and curb appeal with a beautiful new entrance.',
  },
  {
    id: '5',
    title: 'Home Renovation',
    location: 'Hudson, MA',
    beforeImage: IMAGES.generalContractor,
    afterImage: IMAGES.generalContractor2,
    service: 'General Contractor',
    description: 'Comprehensive home renovation including siding, windows, and doors. A complete exterior makeover.',
  },
  {
    id: '6',
    title: 'Window & Door Package',
    location: 'Sudbury, MA',
    beforeImage: IMAGES.windows3,
    afterImage: IMAGES.doors3,
    service: 'Windows & Doors',
    description: 'Complete window and door replacement package. New energy-efficient windows and a stunning entry door.',
  },
];

export default function ProjectsPage() {
  const projectsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${SITE_NAME} Projects Portfolio`,
    description: 'View our completed home improvement projects across Massachusetts.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.description,
          locationCreated: {
            '@type': 'Place',
            name: project.location,
          },
        },
      })),
    },
  };

  return (
    <>
      <JsonLd data={projectsSchema} />

      <Hero
        title="Our Projects"
        subtitle="See the quality of our work through our completed transformations"
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
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Before & After Transformations</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every project tells a story of transformation. See how we&apos;ve helped Massachusetts homeowners improve their homes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Before/After Images */}
                <div className="relative">
                  <div className="grid grid-cols-2">
                    <div className="relative h-48">
                      <Image
                        src={project.beforeImage}
                        alt={`${project.title} - Before`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                        BEFORE
                      </div>
                    </div>
                    <div className="relative h-48">
                      <Image
                        src={project.afterImage}
                        alt={`${project.title} - After`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                        AFTER
                      </div>
                    </div>
                  </div>
                  {/* Service Badge */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 px-4 py-2 bg-amber-400 text-slate-900 rounded-full text-sm font-bold shadow-lg">
                    {project.service}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-amber-500 font-semibold text-sm mb-3">
                    {project.location}
                  </p>
                  <p className="text-gray-600 text-sm">
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
              { name: 'Siding', slug: 'siding', icon: '🏠', image: IMAGES.siding },
              { name: 'Windows', slug: 'windows', icon: '🪟', image: IMAGES.windows },
              { name: 'Doors', slug: 'doors', icon: '🚪', image: IMAGES.doors },
              { name: 'General Contractor', slug: 'general-contractor', icon: '🔨', image: IMAGES.generalContractor },
            ].map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-lg"
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-4xl mb-2">{service.icon}</div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {service.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Start Your Project?"
        subtitle="Contact us today for a free estimate on your home improvement project."
      />
    </>
  );
}
