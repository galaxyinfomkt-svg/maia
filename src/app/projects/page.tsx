import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Hero, CTASection } from '@/components/sections';
import { JsonLd } from '@/components/seo';
import { SITE_NAME, SITE_URL, IMAGES } from '@/lib/constants';
import { projects, galleryPhotos } from '@/lib/projects';
import { CITY_GEO } from '@/lib/project-geo';

const BeforeAfter = dynamic(() => import('@/components/sections/BeforeAfter'), {
  loading: () => <div className="py-24 bg-slate-900" />,
});

// Leads with the widest transformation and puts the one door job second so the
// first row isn't all siding. Anything not listed still renders, appended in
// array order.
const DISPLAY_ORDER = [
  'atkinson-nh-siding', 'norfolk-ma-doors', 'reading-ma-cedar',
  'framingham-ma-siding', 'woburn-ma-siding-windows', 'natick-ma-siding',
  'worcester-ma-siding', 'marlborough-ma-siding', 'hudson-ma-siding',
];

const orderedProjects = [
  ...DISPLAY_ORDER.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is (typeof projects)[number] => Boolean(p)
  ),
  ...projects.filter((p) => !DISPLAY_ORDER.includes(p.id)),
];

export const metadata: Metadata = {
  title: '500+ Projects Completed | Before & After Photos | MA Contractor',
  description: `See 500+ real before & after transformations — siding, windows & doors across Massachusetts. ★5.0 rated craftsmanship. View our portfolio and get inspired for your home!`,
  alternates: {
    canonical: 'https://maiaconstruction.com/projects',
  },
};

export default function ProjectsPage() {
  const projectsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${SITE_NAME} Projects Portfolio`,
    description: 'View our completed home improvement projects across Massachusetts.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: orderedProjects.map((project, index) => {
        const geo = CITY_GEO[project.location];
        const [locality, region = 'MA'] = project.location.split(',').map((part) => part.trim());
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
                addressRegion: region,
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
            {orderedProjects.map((project) => {
              // Only jobs with real photography get a page; a card linking to one
              // stock photo and two sentences would just be thin content.
              const photoCount = (project.gallery?.length ?? 0) + (project.pairs?.length ?? 0) * 2;
              const cardClass =
                'group block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300';

              const content = (
                <>
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
                    {photoCount > 1 && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-slate-900/75 text-white rounded-full text-xs font-bold">
                        {photoCount} photos
                      </div>
                    )}
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
                    {project.slug && (
                      <p className="mt-3 text-sm font-bold text-slate-900 group-hover:text-amber-500 transition-colors">
                        View project &rarr;
                      </p>
                    )}
                  </div>
                </>
              );

              return project.slug ? (
                <Link key={project.id} href={`/projects/${project.slug}`} className={cardClass}>
                  {content}
                </Link>
              ) : (
                <div key={project.id} className={cardClass}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Loose job photography — real work, but not tied to a documented
          address, so it is shown as a gallery rather than as separate projects. */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">More of Our Work</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Windows, doors and exteriors from jobs across our Massachusetts service area.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {galleryPhotos.map((photo) => (
              <figure key={photo.src} className="group">
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-md">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-amber-400 text-slate-900 rounded-full text-[10px] font-bold">
                    {photo.service}
                  </span>
                </div>
                <figcaption className="mt-2 text-sm text-gray-600">{photo.caption}</figcaption>
              </figure>
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
        showAll
      />

      <CTASection
        title="Ready to Start Your Project?"
        subtitle="Contact us today for a free estimate on your home improvement project."
      />
    </>
  );
}
