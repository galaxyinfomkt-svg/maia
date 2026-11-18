import Image from 'next/image';
import Link from 'next/link';
import { editorial } from '@/lib/fonts';
import { nearestJobs } from '@/lib/local-content';
import { detailedProjects, portfolioStats, projectPhotoCount, type Project } from '@/lib/projects';

/* The portfolio, cut down to a band that fits on any page.
 *
 * This is how /projects reaches the other thousand-odd URLs on the site. The
 * header link puts the portfolio one click away everywhere; this puts three of
 * the actual jobs in front of the reader, and on a town page it puts the three
 * nearest ones — which is the question a homeowner is really asking, "have you
 * worked near me".
 *
 * Server component on purpose: no state, no JavaScript shipped, and the links
 * are in the HTML for crawlers. */

interface ProjectsTeaserProps {
  /** Town page: show the jobs nearest to this town, with distances. */
  citySlug?: string;
  cityName?: string;
  /** Service page: prefer jobs that demonstrate this trade. */
  serviceSlug?: string;
  heading?: string;
  intro?: string;
  limit?: number;
}

/** Jobs with the most photography first — the strongest three to lead with. */
const richest: Project[] = [...detailedProjects].sort(
  (a, b) => projectPhotoCount(b) - projectPhotoCount(a)
);

export default function ProjectsTeaser({
  citySlug,
  cityName,
  serviceSlug,
  heading,
  intro,
  limit = 3,
}: ProjectsTeaserProps) {
  const rows = citySlug
    ? nearestJobs(citySlug, serviceSlug, limit)
        .filter((j) => j.project.slug)
        .map((j) => ({
          project: j.project,
          note:
            j.miles <= 1 && cityName
              ? `In ${cityName}`
              : `${j.miles} mi ${j.direction}${cityName ? ` of ${cityName}` : ''}`,
        }))
    : richest.slice(0, limit).map((project) => ({ project, note: project.location }));

  if (rows.length === 0) return null;

  const title =
    heading ?? (cityName ? `Jobs we have photographed near ${cityName}` : 'From the project files');

  return (
    <section
      className={`${editorial.variable} grain relative overflow-hidden bg-ink py-20 lg:py-24`}
      aria-labelledby="portfolio-teaser-heading"
    >
      {/* Hairline grid, barely there, to stop the band reading as a flat block. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #f3efe7 1px, transparent 1px), linear-gradient(to bottom, #f3efe7 1px, transparent 1px)',
          backgroundSize: '96px 96px',
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="flex flex-col gap-6 border-b border-ink-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-amber-400">
              The portfolio
            </p>
            <h2
              id="portfolio-teaser-heading"
              className="mt-4 max-w-2xl font-editorial text-[34px] leading-[1.05] text-bone lg:text-[46px]"
            >
              {title}
            </h2>
            {intro && <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-bone/55">{intro}</p>}
          </div>

          <Link
            href="/projects"
            className="group inline-flex shrink-0 items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-bone"
          >
            All {portfolioStats.jobs} jobs
            <span className="relative block h-px w-10 bg-bone/30">
              <span className="absolute inset-y-0 left-0 w-0 bg-amber-400 transition-all duration-500 group-hover:w-full" />
            </span>
          </Link>
        </div>

        <div className="grid gap-px bg-ink-line sm:grid-cols-3">
          {rows.map(({ project, note }, i) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group relative block bg-ink p-6 transition-colors duration-500 hover:bg-ink-soft lg:p-7"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-soft">
                <Image
                  src={project.image}
                  alt={`${project.title} in ${project.location} by Maia Construction`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover opacity-90 transition-all duration-[1200ms] ease-out group-hover:scale-[1.04] group-hover:opacity-100"
                />
                <span className="absolute left-0 top-0 bg-ink px-2.5 py-1.5 font-mono text-[10px] tracking-[0.2em] text-bone/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.24em] text-amber-400/90">
                {note}
                <span className="mx-2 text-bone/20">/</span>
                <span className="text-bone/45">{projectPhotoCount(project)} photos</span>
              </p>
              <h3 className="mt-2 font-editorial text-[25px] leading-[1.12] text-bone">
                {project.title}
              </h3>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/35">
                {project.location}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
