import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CompareFigure, PhotoGallery } from '@/components/projects';
import type { GalleryItem } from '@/components/projects';
import { JsonLd } from '@/components/seo';
import { cities } from '@/lib/cities';
import { HIC_NUMBER, PHONE, PHONE_LINK, SITE_NAME, SITE_URL } from '@/lib/constants';
import { editorial } from '@/lib/fonts';
import { directionToProjectTown, milesToProjectTown } from '@/lib/geo';
import {
  detailedProjects,
  getProject,
  locationParts,
  projectPhotoCount,
  projectPhotos,
  projectPlace,
  type Project,
  type ServiceName,
} from '@/lib/projects';

/* /projects/<slug> — one job, from the day we arrived to the day we left.
 *
 * The folder a card on /projects opens: the before and afters at full width,
 * the write-up, every photograph from that address, and the towns we serve
 * around it. Same ink-and-bone language as the portfolio index.
 *
 * Statically rendered for the jobs in src/lib/projects.ts and nothing else
 * (dynamicParams = false), so a guessed URL 404s instead of generating an
 * empty page. */

export const dynamicParams = false;

export function generateStaticParams() {
  return detailedProjects.map((p) => ({ slug: p.slug! }));
}

/** Which of the nine service pages this job belongs under. */
const SERVICE_PAGE: Record<ServiceName, string> = {
  Siding: 'siding',
  Windows: 'windows',
  Doors: 'doors',
  'General Contractor': 'siding',
};

/** The towns we serve closest to this job, nearest first. The point is the
 *  homeowner two towns over: the job is 6 miles from them, and the link takes
 *  them to the page about their own town. */
function townsNear(project: Project, limit = 6) {
  return cities
    .map((city) => {
      const miles = milesToProjectTown(city.slug, project.location);
      return miles === null
        ? null
        : {
            city,
            miles,
            direction: directionToProjectTown(city.slug, project.location) ?? '',
          };
    })
    .filter((row): row is { city: (typeof cities)[number]; miles: number; direction: string } =>
      Boolean(row)
    )
    .sort((a, b) => a.miles - b.miles)
    .slice(0, limit);
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  const photos = projectPhotoCount(project);
  return {
    // The root layout appends "| Maia Construction" via its title template.
    title: `${project.title} in ${project.location}`,
    description: `${project.description} ${photos} photographs from the job, before and after. Licensed HIC #${HIC_NUMBER}.`,
    alternates: { canonical: `${SITE_URL}/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${project.location}`,
      description: project.description,
      url: `${SITE_URL}/projects/${project.slug}`,
      images: [{ url: `${SITE_URL}${project.image}` }],
      type: 'article',
    },
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  // Jobs still waiting on a confirmed town carry just the state; everything
  // below reads the location through locationParts so neither the page nor the
  // schema invents one.
  const { town, label: where } = locationParts(project.location);
  const photos = projectPhotos(project);
  const pairs = project.pairs ?? [];
  const nearby = townsNear(project);
  const servicePage = SERVICE_PAGE[project.service];

  const index = detailedProjects.findIndex((p) => p.slug === project.slug);
  const next = detailedProjects[(index + 1) % detailedProjects.length];
  const previous =
    detailedProjects[(index - 1 + detailedProjects.length) % detailedProjects.length];

  const galleryItems: GalleryItem[] = (project.gallery ?? []).map((photo) => ({
    src: photo.src,
    alt: photo.alt,
    caption: photo.caption,
  }));

  const place = projectPlace(project.location);

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
      {
        '@type': 'ListItem',
        position: 3,
        name: `${project.title} — ${project.location}`,
        item: `${SITE_URL}/projects/${project.slug}`,
      },
    ],
  };

  return (
    <div className={`${editorial.variable} bg-bone`}>
      <JsonLd data={schema} />
      <JsonLd data={breadcrumbs} />

      {/* ──────────────────────────── Cover ──────────────────────────────── */}
      <section className="relative min-h-[82vh] overflow-hidden bg-ink">
        <Image
          src={project.image}
          alt={`${project.title} in ${project.location}, finished by ${SITE_NAME}`}
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-[0.55]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/70"
        />

        <div className="relative mx-auto flex min-h-[82vh] max-w-[1400px] flex-col justify-end px-5 pb-14 pt-32 lg:px-10 lg:pb-20">
          <nav
            aria-label="Breadcrumb"
            className="work-rise font-mono text-[10px] uppercase tracking-[0.3em] text-bone/45"
          >
            <Link href="/" className="transition-colors hover:text-amber-400">
              Home
            </Link>
            <span className="mx-3 text-bone/20">/</span>
            <Link href="/projects" className="transition-colors hover:text-amber-400">
              Portfolio
            </Link>
            <span className="mx-3 text-bone/20">/</span>
            <span className="text-bone/75">{town ?? where}</span>
          </nav>

          <p
            className="work-rise mt-10 font-mono text-[11px] uppercase tracking-[0.3em] text-amber-400"
            style={{ animationDelay: '80ms' }}
          >
            {project.service}
            <span className="mx-3 text-bone/25">/</span>
            <span className="text-bone/70">{where}</span>
          </p>

          <h1
            className="work-rise mt-5 max-w-4xl font-editorial text-[clamp(2.6rem,7.5vw,5.75rem)] leading-[0.94] text-bone"
            style={{ animationDelay: '140ms' }}
          >
            {project.title}
          </h1>

          <div
            className="work-wipe mt-9 h-px w-full max-w-xl bg-amber-400"
            style={{ animationDelay: '320ms' }}
          />

          <dl
            className="work-rise mt-8 flex flex-wrap gap-x-12 gap-y-5"
            style={{ animationDelay: '240ms' }}
          >
            {[
              [town ? 'Town' : 'Where', where],
              ['Trade', project.service],
              ['Photographs', String(photos.length)],
              ...(pairs.length > 0
                ? ([['Before / after', `${pairs.length} pairs`]] as [string, string][])
                : []),
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-[9px] uppercase tracking-[0.26em] text-bone/35">
                  {label}
                </dt>
                <dd className="mt-1.5 font-editorial text-[24px] leading-none text-bone">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ───────────────────── Write-up and the facts rail ────────────────── */}
      {project.body && project.body.length > 0 && (
        <section className="bg-bone py-20 lg:py-28">
          <div className="mx-auto grid max-w-[1180px] gap-14 px-5 lg:grid-cols-[1fr_300px] lg:gap-16 lg:px-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-clay">
                What the job was
              </p>
              <div className="work-prose mt-8 max-w-[62ch]">
                {project.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mb-7 text-[18px] leading-[1.7] text-ink/80 lg:text-[19px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <aside className="lg:sticky lg:top-[120px] lg:self-start">
              <div className="border-t border-ink/20 pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink/40">
                  This job
                </p>
                <dl className="mt-5 space-y-4 text-[13.5px]">
                  <div className="flex justify-between gap-4 border-b border-ink/10 pb-3">
                    <dt className="text-ink/50">Where</dt>
                    <dd className="text-right font-semibold text-ink">{where}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-ink/10 pb-3">
                    <dt className="text-ink/50">Trade</dt>
                    <dd className="text-right font-semibold text-ink">
                      <Link href={`/services/${servicePage}`} className="hover:text-amber-700">
                        {project.service} →
                      </Link>
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-ink/10 pb-3">
                    <dt className="text-ink/50">Photographs</dt>
                    <dd className="text-right font-semibold text-ink">{photos.length}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-ink/10 pb-3">
                    <dt className="text-ink/50">Licence</dt>
                    <dd className="text-right font-semibold text-ink">HIC #{HIC_NUMBER}</dd>
                  </div>
                </dl>

                <a
                  href={PHONE_LINK}
                  className="mt-7 flex items-center justify-between gap-4 bg-ink px-5 py-5 text-bone transition-colors hover:bg-amber-400 hover:text-ink"
                >
                  <span>
                    <span className="block font-mono text-[9px] uppercase tracking-[0.24em] opacity-60">
                      Free estimate
                    </span>
                    <span className="mt-1 block font-editorial text-[22px] leading-none">
                      {PHONE}
                    </span>
                  </span>
                  <span>→</span>
                </a>
              </div>
            </aside>
          </div>
        </section>
      )}

      {/* ──────────────────────── Before and after ───────────────────────── */}
      {pairs.length > 0 && (
        <section className="border-y border-ink/10 bg-bone-deep py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
            <div className="flex flex-col gap-4 border-b border-ink/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="font-editorial text-[38px] leading-[1.05] text-ink lg:text-[52px]">
                Before, and after
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink/40">
                {pairs.length} {pairs.length === 1 ? 'pair' : 'pairs'} · drag the handle
              </p>
            </div>

            <div className="mt-14 space-y-16 lg:space-y-24">
              {pairs.map((pair, i) => (
                <div key={pair.after + i} className="mx-auto max-w-5xl">
                  <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.26em] text-clay">
                    {String(i + 1).padStart(2, '0')} / {String(pairs.length).padStart(2, '0')}
                  </p>
                  <CompareFigure
                    before={pair.before}
                    after={pair.after}
                    beforeLabel={pair.beforeLabel ?? 'Before'}
                    alt={`${project.title} in ${project.location}`}
                    caption={pair.caption}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───────────────────────────── Photo set ─────────────────────────── */}
      {galleryItems.length > 0 && (
        <section className="bg-bone py-20 lg:py-28">
          <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
            <div className="flex flex-col gap-4 border-b border-ink/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-clay">
                  The photo set
                </p>
                <h2 className="mt-4 font-editorial text-[38px] leading-[1.05] text-ink lg:text-[52px]">
                  Every elevation we shot
                </h2>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink/40">
                {galleryItems.length} photographs · click to enlarge
              </p>
            </div>

            <div className="mt-10">
              <PhotoGallery photos={galleryItems} feature columns={3} />
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────── Towns we serve around this job ───────────────── */}
      {nearby.length > 0 && (
        <section className="grain relative bg-ink py-20 lg:py-24">
          <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-400">
                  Around this job
                </p>
                <h2 className="mt-4 font-editorial text-[34px] leading-[1.05] text-bone lg:text-[46px]">
                  Towns we serve nearest to {town}
                </h2>
                <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-bone/55">
                  Distances are straight-line miles from {town}. Each town has
                  its own page: the housing stock, the weather loads the exterior
                  has to take, and what {project.service.toLowerCase()} normally
                  means there.
                </p>
              </div>

              <ul className="grid gap-px bg-ink-line sm:grid-cols-2">
                {nearby.map(({ city, miles, direction }) => (
                  <li key={city.slug} className="bg-ink">
                    <div className="flex items-center justify-between gap-4 px-5 py-5">
                      <div>
                        <Link
                          href={`/cities/${city.slug}`}
                          className="font-editorial text-[25px] leading-none text-bone transition-colors hover:text-amber-400"
                        >
                          {city.name}, {city.state}
                        </Link>
                        <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-bone/35">
                          {miles <= 1 ? 'Same town' : `${miles} mi ${direction}`}
                        </p>
                      </div>
                      <Link
                        href={`/services/${servicePage}/${city.slug}`}
                        className="shrink-0 border border-bone/20 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-bone/60 transition-colors hover:border-amber-400 hover:text-amber-400"
                      >
                        {project.service} here
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* ────────────────────── Previous / next folder ────────────────────── */}
      <section className="border-b border-ink/10 bg-bone">
        <div className="mx-auto grid max-w-[1400px] gap-px bg-ink/10 sm:grid-cols-2">
          {[
            { label: 'Previous job', project: previous },
            { label: 'Next job', project: next },
          ].map(({ label, project: other }) => (
            <Link
              key={label}
              href={`/projects/${other.slug}`}
              className="group relative flex min-h-[260px] items-end overflow-hidden bg-ink p-7 lg:p-10"
            >
              <Image
                src={other.image}
                alt={`${other.title} in ${other.location} by ${SITE_NAME}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover opacity-30 transition-all duration-[1400ms] ease-out group-hover:scale-[1.04] group-hover:opacity-45"
              />
              <div className="relative">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber-400">
                  {label}
                </p>
                <p className="mt-3 font-editorial text-[30px] leading-[1.08] text-bone lg:text-[38px]">
                  {other.title}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/45">
                  {other.location} · {projectPhotoCount(other)} photos
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-7 lg:px-10">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-ink"
          >
            <span className="relative block h-px w-9 bg-ink/30">
              <span className="absolute inset-y-0 right-0 w-0 bg-amber-500 transition-all duration-500 group-hover:w-full" />
            </span>
            Back to the whole portfolio
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/35">
            {String(index + 1).padStart(2, '0')} / {String(detailedProjects.length).padStart(2, '0')}
          </p>
        </div>
      </section>

      {/* ───────────────────────────── Closing ───────────────────────────── */}
      <section className="grain relative overflow-hidden bg-bone-deep py-20 lg:py-28">
        <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-clay">
                Your house next
              </p>
              <h2 className="mt-5 max-w-2xl font-editorial text-[40px] leading-[1.02] text-ink lg:text-[60px]">
                Want a result like this {town ? `in ${town}` : 'on your house'}?
              </h2>
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink/60">
                Tell us about your home and we will come out, walk the exterior
                with you and leave you a free written estimate — the full scope,
                the material spec and an agreed rate for anything we find behind
                the old wall.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={PHONE_LINK}
                className="flex items-center justify-between gap-6 bg-ink px-7 py-6 text-bone transition-colors hover:bg-amber-400 hover:text-ink"
              >
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.26em] opacity-60">
                    Call the shop
                  </span>
                  <span className="mt-1 block font-editorial text-[30px] leading-none">
                    {PHONE}
                  </span>
                </span>
                <span className="text-xl">→</span>
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-between gap-6 border border-ink/25 px-7 py-6 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bone"
              >
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.26em] opacity-60">
                    Rather type it
                  </span>
                  <span className="mt-1 block font-editorial text-[30px] leading-none">
                    Request an estimate
                  </span>
                </span>
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
