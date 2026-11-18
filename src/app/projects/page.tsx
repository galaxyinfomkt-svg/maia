import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CompareFigure, PhotoGallery, ProjectsExplorer } from '@/components/projects';
import type { ExplorerItem, GalleryItem } from '@/components/projects';
import { JsonLd } from '@/components/seo';
import { cities } from '@/lib/cities';
import { HIC_NUMBER, PHONE, PHONE_LINK, SITE_NAME, SITE_URL } from '@/lib/constants';
import { editorial } from '@/lib/fonts';
import {
  allProjectPairs,
  galleryPhotos,
  locationParts,
  portfolioStats,
  projectPhotoCount,
  projectPlace,
  projectTowns,
  projects,
} from '@/lib/projects';
import { AVERAGE_RATING, GOOGLE_REVIEW_COUNT } from '@/lib/reviews';
import { services } from '@/lib/services';

/* /projects — the portfolio.
 *
 * Treated as the one page on this site that is selling craft rather than
 * availability, so it has its own visual language: ink and bone instead of
 * slate and white, an editorial serif for display type, hairline rules, paper
 * grain, and photographs given room to be looked at. Everything on it is real
 * Maia photography and every count is computed from the data, so the page
 * cannot promise a number it does not show.
 *
 * Each card opens /projects/<slug> — that job's full folder: the before and
 * afters, the write-up, the whole photo set, and the towns we serve around it. */

// Leads with the widest transformation and puts the one door job third so the
// first row is not all siding. Anything not listed still renders, appended.
const DISPLAY_ORDER = [
  'ma-cape-siding-harvey-windows', 'ma-ranch-sage-siding', 'atkinson-nh-siding',
  'norfolk-ma-doors', 'ma-colonial-blue-siding', 'manchester-nh-siding',
  'woburn-ma-siding-windows', 'reading-ma-cedar', 'framingham-ma-siding',
  'natick-ma-siding', 'worcester-ma-siding', 'marlborough-ma-siding', 'hudson-ma-siding',
];

const ordered = [
  ...DISPLAY_ORDER.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is (typeof projects)[number] => Boolean(p)
  ),
  ...projects.filter((p) => !DISPLAY_ORDER.includes(p.id)),
];

const explorerItems: ExplorerItem[] = ordered
  .filter((p) => p.slug)
  .map((p) => ({
    id: p.id,
    slug: p.slug!,
    title: p.title,
    location: p.location,
    where: locationParts(p.location).label,
    service: p.service,
    image: p.image,
    description: p.description,
    photos: projectPhotoCount(p),
    pairs: p.pairs?.length ?? 0,
  }));

/* The town index doubles as internal linking: where a portfolio town is one of
 * the 109 we serve, its row links to that town's page. The two New Hampshire
 * jobs have no town page here, and are shown without a link rather than
 * pointed at something that does not exist. */
const townRows = projectTowns.map((row) => ({
  ...row,
  citySlug:
    row.state === 'MA'
      ? cities.find((c) => c.name.toLowerCase() === row.town.toLowerCase())?.slug ?? null
      : null,
}));

const galleryItems: GalleryItem[] = galleryPhotos.map((photo) => ({
  src: photo.src,
  alt: photo.alt,
  caption: photo.caption,
  tag: photo.service,
}));

// Three finished elevations for the opening collage, picked for frame and sky.
const COLLAGE = [
  {
    src: '/images/before-after/siding-woburn-ma-front.webp',
    alt: 'Finished vinyl siding, replacement windows and a bay window on a ranch in Woburn, MA by Maia Construction',
  },
  {
    src: '/images/before-after/cedar-siding-reading-ma-4.webp',
    alt: 'Western red cedar shingle siding on a gambrel addition in Reading, MA by Maia Construction',
  },
  {
    src: '/images/before-after/siding-after-manchester-nh.webp',
    alt: 'Grey vinyl siding and white trim on a two-family in Manchester, NH by Maia Construction',
  },
];

export const metadata: Metadata = {
  title: 'Project Portfolio | Before & After Photos | Siding, Windows & Doors',
  description: `Walk through real Maia Construction jobs: ${portfolioStats.photos} photographs from ${portfolioStats.jobs} documented projects in ${portfolioStats.towns} towns — siding, windows, doors and custom trim, before and after. Licensed HIC #${HIC_NUMBER}.`,
  alternates: { canonical: `${SITE_URL}/projects` },
  openGraph: {
    title: `The Work — ${SITE_NAME} Project Portfolio`,
    description: `${portfolioStats.jobs} documented jobs, ${portfolioStats.photos} photographs, before and after.`,
    url: `${SITE_URL}/projects`,
    images: [{ url: `${SITE_URL}${COLLAGE[0].src}` }],
  },
};

export default function ProjectsPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${SITE_NAME} Project Portfolio`,
    url: `${SITE_URL}/projects`,
    description:
      'Documented siding, window, door and exterior trim projects by Maia Construction, with before and after photography from each address.',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: explorerItems.length,
      itemListElement: ordered
        .filter((p) => p.slug)
        .map((project, index) => {
          const place = projectPlace(project.location);
          return {
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'CreativeWork',
              name: `${project.title} — ${project.location}`,
              description: project.description,
              url: `${SITE_URL}/projects/${project.slug}`,
              about: project.service,
              locationCreated: place,
              creator: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
              image: {
                '@type': 'ImageObject',
                contentUrl: `${SITE_URL}${project.image}`,
                creator: { '@type': 'Organization', name: SITE_NAME },
                copyrightHolder: { '@type': 'Organization', name: SITE_NAME },
                contentLocation: place,
              },
            },
          };
        }),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` },
    ],
  };

  return (
    <div className={`${editorial.variable} bg-bone`}>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ───────────────────────────── Opening ───────────────────────────── */}
      <section className="grain relative overflow-hidden bg-ink pb-16 pt-28 lg:pb-24 lg:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #f3efe7 1px, transparent 1px), linear-gradient(to bottom, #f3efe7 1px, transparent 1px)',
            backgroundSize: '110px 110px',
          }}
        />

        <div className="relative mx-auto grid max-w-[1400px] items-end gap-14 px-5 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:px-10">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="work-rise font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40"
            >
              <Link href="/" className="transition-colors hover:text-amber-400">
                {SITE_NAME}
              </Link>
              <span className="mx-3 text-bone/20">/</span>
              <span className="text-bone/70">Portfolio</span>
            </nav>

            <h1
              className="work-rise mt-8 font-editorial text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.86] text-bone"
              style={{ animationDelay: '80ms' }}
            >
              The Work
            </h1>

            <div
              className="work-wipe mt-8 h-px w-full max-w-md bg-amber-400"
              style={{ animationDelay: '260ms' }}
            />

            <p
              className="work-rise mt-8 max-w-xl text-[17px] leading-relaxed text-bone/65 lg:text-[19px]"
              style={{ animationDelay: '220ms' }}
            >
              Every house on this page is one of ours, photographed on site — the
              wall stripped back, the trim cut in the driveway, the elevation
              finished. Open a folder and you get that whole job: what it looked
              like when we arrived, what we did, and what the street sees now.
            </p>

            <div
              className="work-rise mt-10 flex flex-wrap items-center gap-4"
              style={{ animationDelay: '300ms' }}
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-3 bg-amber-400 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-ink transition-colors hover:bg-bone"
              >
                Browse the folders
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  <path d="M6 1v10M1.5 6.5 6 11l4.5-4.5" strokeLinecap="round" />
                </svg>
              </a>
              <a
                href={PHONE_LINK}
                className="inline-flex items-center gap-3 border border-bone/25 px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink"
              >
                {PHONE}
              </a>
            </div>
          </div>

          {/* Collage. Deliberately off-grid: the sheets overlap the way photo
              prints do on a table, and the stack tilts on the long edge. */}
          <div
            className="work-rise relative mx-auto w-full max-w-xl lg:mx-0"
            style={{ animationDelay: '380ms' }}
          >
            <div className="relative aspect-[4/5]">
              <figure className="absolute left-0 top-0 h-[62%] w-[72%] -rotate-[2.2deg] border-[6px] border-bone shadow-[0_40px_90px_-40px_rgba(0,0,0,0.85)]">
                <Image
                  src={COLLAGE[0].src}
                  alt={COLLAGE[0].alt}
                  fill
                  sizes="(max-width: 1024px) 70vw, 420px"
                  priority
                  className="object-cover"
                />
              </figure>
              <figure className="absolute bottom-[8%] right-0 h-[52%] w-[58%] rotate-[1.6deg] border-[6px] border-bone shadow-[0_40px_90px_-40px_rgba(0,0,0,0.85)]">
                <Image
                  src={COLLAGE[1].src}
                  alt={COLLAGE[1].alt}
                  fill
                  sizes="(max-width: 1024px) 55vw, 330px"
                  className="object-cover"
                />
              </figure>
              <figure className="absolute bottom-0 left-[6%] h-[34%] w-[40%] -rotate-[1deg] border-[6px] border-bone shadow-[0_30px_70px_-35px_rgba(0,0,0,0.9)]">
                <Image
                  src={COLLAGE[2].src}
                  alt={COLLAGE[2].alt}
                  fill
                  sizes="(max-width: 1024px) 40vw, 240px"
                  className="object-cover"
                />
              </figure>
            </div>
          </div>
        </div>

        {/* Counted facts. Nothing here is rounded up: the first three are read
            off the portfolio data at build time. */}
        <div className="relative mx-auto mt-16 max-w-[1400px] px-5 lg:mt-24 lg:px-10">
          <dl className="grid grid-cols-2 gap-px border-y border-ink-line bg-ink-line lg:grid-cols-4">
            {[
              [String(portfolioStats.jobs), 'Documented jobs'],
              [String(portfolioStats.photos), 'Photographs on this site'],
              [String(portfolioStats.towns), 'Towns photographed'],
              [`${AVERAGE_RATING}★`, `${GOOGLE_REVIEW_COUNT} Google reviews`],
            ].map(([value, label], i) => (
              <div
                key={label}
                className="work-rise bg-ink px-6 py-8"
                style={{ animationDelay: `${420 + i * 70}ms` }}
              >
                <dd className="font-editorial text-[44px] leading-none text-bone lg:text-[56px]">
                  {value}
                </dd>
                <dt className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-bone/45">
                  {label}
                </dt>
              </div>
            ))}
          </dl>
          <p className="py-5 font-mono text-[10px] uppercase tracking-[0.26em] text-bone/35">
            109 Massachusetts towns served · Licensed HIC #{HIC_NUMBER} and insured · Our own
            crews, no subcontractors
          </p>
        </div>
      </section>

      {/* ───────────────────────── Folders (filterable) ───────────────────── */}
      <ProjectsExplorer items={explorerItems} />

      {/* ───────────────────────────── By town ───────────────────────────── */}
      <section className="border-y border-ink/10 bg-bone-deep py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-clay">Index</p>
              <h2 className="mt-4 font-editorial text-[38px] leading-[1.05] text-ink lg:text-[50px]">
                Where these jobs are
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink/60">
                Photographed work, town by town. Each Massachusetts town here also
                has its own page — the housing stock, the weather loads it has to
                take and the code it is built to.
              </p>
              <Link
                href="/cities"
                className="group mt-7 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-ink"
              >
                All 109 towns we serve
                <span className="relative block h-px w-9 bg-ink/30">
                  <span className="absolute inset-y-0 left-0 w-0 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                </span>
              </Link>
            </div>

            <ul className="border-t border-ink/15">
              {townRows.map((row) => {
                const inner = (
                  <>
                    <span className="font-editorial text-[26px] leading-none text-ink lg:text-[30px]">
                      {row.town}
                      <span className="ml-2 font-mono text-[11px] tracking-[0.2em] text-ink/35">
                        {row.state}
                      </span>
                    </span>
                    <span className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
                      <span>{row.jobs === 1 ? '1 job' : `${row.jobs} jobs`}</span>
                      <span>{row.photos} photos</span>
                      {row.citySlug && (
                        <span className="text-ink/25 transition-colors group-hover:text-amber-600">
                          Town page →
                        </span>
                      )}
                    </span>
                  </>
                );
                return (
                  <li key={row.location} className="border-b border-ink/15">
                    {row.citySlug ? (
                      <Link
                        href={`/cities/${row.citySlug}`}
                        className="group flex flex-wrap items-center justify-between gap-3 py-5 transition-colors hover:bg-bone/70"
                      >
                        {inner}
                      </Link>
                    ) : (
                      <div className="flex flex-wrap items-center justify-between gap-3 py-5">
                        {inner}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Before and after ───────────────────────── */}
      <section className="bg-bone py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-clay">
              Drag it yourself
            </p>
            <h2 className="mt-4 font-editorial text-[38px] leading-[1.05] text-ink lg:text-[54px]">
              Before, and after
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-ink/60">
              One pair per job, shot from the same spot. Pull the handle across to
              see what was there when we arrived. The rest of each job&apos;s
              photographs are in its folder.
            </p>
          </div>

          <div className="mt-14 space-y-20 lg:mt-20 lg:space-y-28">
            {allProjectPairs.map((pair, i) => (
              <div
                key={pair.key}
                className={`grid gap-8 lg:gap-14 ${
                  i % 2 === 1 ? 'lg:grid-cols-[320px_1fr]' : 'lg:grid-cols-[1fr_320px]'
                }`}
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <CompareFigure
                    before={pair.before}
                    after={pair.after}
                    beforeLabel={pair.beforeLabel ?? 'Before'}
                    alt={`${pair.project.title} in ${pair.project.location}`}
                    caption={pair.caption}
                  />
                </div>

                <div className={`flex flex-col justify-end ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-clay">
                    {String(i + 1).padStart(2, '0')} · {pair.project.service}
                  </p>
                  <h3 className="mt-3 font-editorial text-[30px] leading-[1.08] text-ink lg:text-[36px]">
                    {pair.project.title}
                  </h3>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
                    {pair.project.location}
                  </p>
                  {pair.project.slug && (
                    <Link
                      href={`/projects/${pair.project.slug}`}
                      className="group mt-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-ink"
                    >
                      Open this folder
                      <span className="relative block h-px w-9 bg-ink/30">
                        <span className="absolute inset-y-0 left-0 w-0 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── Loose job photography ──────────────────────── */}
      <section className="grain relative bg-ink py-20 lg:py-28">
        <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="flex flex-col gap-6 border-b border-ink-line pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-400">
                Odds and ends
              </p>
              <h2 className="mt-4 font-editorial text-[36px] leading-[1.05] text-bone lg:text-[50px]">
                Windows, doors and details
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-bone/55">
                Real jobs we photographed without documenting the whole address.
                They are not dressed up as separate projects — they are here,
                captioned by what they show. Click any one to look closely.
              </p>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone/35">
              {galleryItems.length} photographs
            </p>
          </div>

          <div className="mt-10">
            <PhotoGallery photos={galleryItems} columns={5} />
          </div>
        </div>
      </section>

      {/* ─────────────────────────── Trades index ─────────────────────────── */}
      <section className="bg-bone py-20 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="flex flex-col gap-4 border-b border-ink/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-editorial text-[34px] leading-[1.05] text-ink lg:text-[46px]">
              What we were hired to do
            </h2>
            <Link
              href="/services"
              className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-ink"
            >
              All nine services
              <span className="relative block h-px w-9 bg-ink/30">
                <span className="absolute inset-y-0 left-0 w-0 bg-amber-500 transition-all duration-500 group-hover:w-full" />
              </span>
            </Link>
          </div>

          <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <li key={service.slug} className="border-b border-ink/12">
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex items-baseline gap-5 py-6"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-ink/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1">
                    <span className="block font-editorial text-[24px] leading-tight text-ink transition-colors group-hover:text-amber-700">
                      {service.name}
                    </span>
                    <span className="mt-1 block text-[13.5px] leading-snug text-ink/50">
                      {service.shortDescription}
                    </span>
                  </span>
                  <span className="text-ink/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-600">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────────────────────── Closing ───────────────────────────── */}
      <section className="grain relative overflow-hidden bg-ink py-20 lg:py-28">
        <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-400">
                Your house next
              </p>
              <h2 className="mt-5 max-w-2xl font-editorial text-[42px] leading-[1.02] text-bone lg:text-[64px]">
                We will walk your exterior and put the price in writing.
              </h2>
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-bone/60">
                Free estimate, anywhere in our 109 Massachusetts towns. One
                document with the full scope, the material spec and an agreed rate
                for anything we find behind the old wall — so nothing is
                renegotiated halfway through.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <a
                href={PHONE_LINK}
                className="flex items-center justify-between gap-6 bg-amber-400 px-7 py-6 text-ink transition-colors hover:bg-bone"
              >
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.26em] text-ink/60">
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
                className="flex items-center justify-between gap-6 border border-bone/25 px-7 py-6 text-bone transition-colors hover:border-bone hover:bg-bone hover:text-ink"
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
