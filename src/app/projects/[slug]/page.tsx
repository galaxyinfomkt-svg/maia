import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CTASection } from '@/components/sections';
import { JsonLd } from '@/components/seo';
import { SITE_NAME, SITE_URL } from '@/lib/constants';
import { detailedProjects, getProject, projectPhotos } from '@/lib/projects';
import { CITY_GEO } from '@/lib/project-geo';

export const dynamicParams = false;

export function generateStaticParams() {
  return detailedProjects.map((p) => ({ slug: p.slug! }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    // The root layout appends "| Maia Construction" via its title template.
    title: `${project.title} in ${project.location}`,
    description: project.description,
    alternates: { canonical: `${SITE_URL}/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${project.location}`,
      description: project.description,
      images: [{ url: `${SITE_URL}${project.image}` }],
      type: 'article',
    },
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const [locality, region = 'MA'] = project.location.split(',').map((s) => s.trim());
  const geo = CITY_GEO[project.location];
  const photos = projectPhotos(project);

  const place = {
    '@type': 'Place',
    name: project.location,
    address: {
      '@type': 'PostalAddress',
      addressLocality: locality,
      addressRegion: region,
      addressCountry: 'US',
    },
    ...(geo ? { geo: { '@type': 'GeoCoordinates', latitude: geo[0], longitude: geo[1] } } : {}),
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${project.title} — ${project.location}`,
    description: project.description,
    url: `${SITE_URL}/projects/${project.slug}`,
    creator: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    locationCreated: place,
    about: project.service,
    image: photos.map((photo) => ({
      '@type': 'ImageObject',
      contentUrl: `${SITE_URL}${photo.src}`,
      caption: photo.caption,
      creator: { '@type': 'Organization', name: SITE_NAME },
      copyrightHolder: { '@type': 'Organization', name: SITE_NAME },
      contentLocation: place,
    })),
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` },
      { '@type': 'ListItem', position: 3, name: project.title, item: `${SITE_URL}/projects/${project.slug}` },
    ],
  };

  const others = detailedProjects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={breadcrumbs} />

      {/* Header */}
      <section className="bg-slate-900 pt-32 pb-16">
        <div className="container mx-auto px-4">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
            <Link href="/" className="hover:text-amber-400">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/projects" className="hover:text-amber-400">Projects</Link>
            <span className="mx-2">/</span>
            <span className="text-white/90">{project.title}</span>
          </nav>

          <div className="inline-block px-3 py-1 mb-4 bg-amber-400 text-slate-900 rounded-full text-xs font-bold">
            {project.service}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{project.title}</h1>
          <p className="text-xl text-amber-400 font-semibold flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {project.location}
          </p>
        </div>
      </section>

      {/* Before / after pairs */}
      {project.pairs && project.pairs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Before &amp; After</h2>
            <div className="w-20 h-1 bg-amber-400 mb-10" />

            <div className="space-y-12">
              {project.pairs.map((pair, i) => (
                <div key={pair.after + i}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <figure className="relative">
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                        <Image
                          src={pair.before}
                          alt={`${project.title} in ${project.location} — ${(pair.beforeLabel ?? 'before').toLowerCase()}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1 bg-slate-700 text-white rounded-full text-xs font-bold">
                          {pair.beforeLabel ?? 'BEFORE'}
                        </span>
                      </div>
                    </figure>
                    <figure className="relative">
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                        <Image
                          src={pair.after}
                          alt={`${project.title} in ${project.location} — finished by ${SITE_NAME}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-xs font-bold">
                          AFTER
                        </span>
                      </div>
                    </figure>
                  </div>
                  <p className="mt-3 text-gray-600">{pair.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Write-up */}
      {project.body && project.body.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">About this project</h2>
            <div className="w-20 h-1 bg-amber-400 mb-8" />
            {project.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-lg text-gray-700 leading-relaxed mb-5">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Project photos</h2>
            <div className="w-20 h-1 bg-amber-400 mb-10" />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((photo) => (
                <figure key={photo.src} className="group">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <figcaption className="mt-2 text-sm text-gray-600">{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other projects */}
      {others.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">More projects</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {others.map((other) => (
                <Link
                  key={other.id}
                  href={`/projects/${other.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="relative h-48">
                    <Image
                      src={other.image}
                      alt={`${other.title} in ${other.location} by ${SITE_NAME}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 group-hover:text-amber-500 transition-colors">
                      {other.title}
                    </h3>
                    <p className="text-amber-500 text-sm font-semibold">{other.location}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/projects"
                className="inline-block px-6 py-3 border-2 border-slate-900 text-slate-900 rounded-xl font-bold hover:bg-slate-900 hover:text-white transition-all"
              >
                View all projects
              </Link>
            </div>
          </div>
        </section>
      )}

      <CTASection
        title={`Want a result like this in ${locality}?`}
        subtitle="Tell us about your home and we'll come out and give you a free, no-pressure estimate."
      />
    </>
  );
}
