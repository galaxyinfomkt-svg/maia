'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

/* The portfolio itself: one folder per job, filterable by trade and by town.
 *
 * Every card opens that job's own page — the before/afters, the write-up and
 * the whole photo set from that address. The filters are the reason this is a
 * client component; the data is computed on the server and handed down, so the
 * markup still arrives rendered and the page is indexable with every job in it. */

export interface ExplorerItem {
  id: string;
  slug: string;
  title: string;
  location: string;
  town: string;
  state: string;
  service: string;
  image: string;
  description: string;
  photos: number;
  pairs: number;
}

interface ProjectsExplorerProps {
  items: ExplorerItem[];
}

const ALL = 'All';

export default function ProjectsExplorer({ items }: ProjectsExplorerProps) {
  const [service, setService] = useState<string>(ALL);
  const [town, setTown] = useState<string>(ALL);

  const services = useMemo(() => {
    const counts = new Map<string, number>();
    for (const i of items) counts.set(i.service, (counts.get(i.service) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [items]);

  const towns = useMemo(
    () => [...new Set(items.map((i) => i.location))].sort((a, b) => a.localeCompare(b, 'en')),
    [items]
  );

  const visible = items.filter(
    (i) => (service === ALL || i.service === service) && (town === ALL || i.location === town)
  );

  const filtered = service !== ALL || town !== ALL;

  return (
    <section id="work" className="scroll-mt-24 bg-bone">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        {/* Filter bar */}
        <div className="sticky top-[72px] z-30 -mx-5 border-b border-ink/10 bg-bone/92 px-5 py-4 backdrop-blur-md lg:top-[92px] lg:-mx-10 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
                Trade
              </span>
              {[[ALL, items.length] as [string, number], ...services].map(([name, count]) => {
                const on = service === name;
                return (
                  <button
                    key={name}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setService(name)}
                    className={`border px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
                      on
                        ? 'border-ink bg-ink text-bone'
                        : 'border-ink/15 text-ink/65 hover:border-ink/45 hover:text-ink'
                    }`}
                  >
                    {name === ALL ? 'Every job' : name}
                    <span
                      className={`ml-2 font-mono text-[10px] ${on ? 'text-amber-400' : 'text-ink/35'}`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <label
                htmlFor="town-filter"
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40"
              >
                Town
              </label>
              <div className="relative">
                <select
                  id="town-filter"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  className="appearance-none border border-ink/15 bg-transparent py-2 pl-4 pr-10 text-[13px] font-semibold text-ink transition-colors hover:border-ink/45 focus:border-ink focus:outline-none"
                >
                  <option value={ALL}>Everywhere we have worked</option>
                  {towns.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/50"
                  width="11"
                  height="7"
                  viewBox="0 0 11 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M1 1l4.5 4.5L10 1" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Count line */}
        <p
          aria-live="polite"
          className="border-b border-ink/10 py-5 font-mono text-[11px] uppercase tracking-[0.28em] text-ink/45"
        >
          {visible.length === items.length
            ? `${items.length} documented jobs`
            : `${visible.length} of ${items.length} jobs`}
          {town !== ALL && ` · ${town}`}
          {filtered && (
            <button
              type="button"
              onClick={() => {
                setService(ALL);
                setTown(ALL);
              }}
              className="ml-4 border-b border-ink/30 pb-0.5 tracking-[0.18em] text-ink/70 transition-colors hover:border-amber-500 hover:text-ink"
            >
              Clear
            </button>
          )}
        </p>

        {/* Folders */}
        {visible.length > 0 ? (
          <div className="grid gap-x-8 gap-y-16 py-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-24">
            {visible.map((item, index) => (
              <Link
                key={item.id}
                href={`/projects/${item.slug}`}
                className="group relative block work-rise"
                style={{ animationDelay: `${Math.min(index, 8) * 55}ms` }}
              >
                {/* Two sheets behind the cover: the folder this job lives in.
                    They fan out on hover, which is the whole gag. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-6 -top-2 h-full border border-ink/10 bg-bone-deep/70 transition-all duration-[600ms] ease-out group-hover:-top-5 group-hover:-rotate-[1.1deg]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-x-3 -top-1 h-full border border-ink/10 bg-bone-deep transition-all duration-[600ms] ease-out group-hover:-top-2.5 group-hover:rotate-[0.7deg]"
                />

                <article className="relative border border-ink/12 bg-bone transition-all duration-[600ms] ease-out group-hover:border-ink/30 group-hover:shadow-[0_40px_80px_-50px_rgba(12,14,17,0.55)]">
                  <div className="grain grain-light relative aspect-[5/4] overflow-hidden bg-bone-deep">
                    <Image
                      src={item.image}
                      alt={`${item.title} in ${item.location} by Maia Construction`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                    />
                    <span className="absolute left-0 top-0 bg-bone px-3 py-2 font-mono text-[11px] tracking-[0.2em] text-ink">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="absolute bottom-0 right-0 bg-ink/85 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/85 backdrop-blur-sm">
                      {item.photos} photos
                      {item.pairs > 0 && ` · ${item.pairs} before/after`}
                    </span>
                  </div>

                  <div className="p-6 lg:p-7">
                    <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-clay">
                      {item.town}, {item.state}
                      <span className="mx-2 text-ink/20">/</span>
                      {item.service}
                    </p>
                    <h3 className="mt-3 font-editorial text-[27px] leading-[1.1] text-ink lg:text-[30px]">
                      {item.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-[14.5px] leading-relaxed text-ink/55">
                      {item.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-ink">
                      Open the folder
                      <span className="relative block h-px w-8 bg-ink/30">
                        <span className="absolute inset-y-0 left-0 w-0 bg-amber-500 transition-all duration-500 group-hover:w-full" />
                      </span>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-28 text-center">
            <p className="font-editorial text-3xl text-ink">Nothing photographed there yet.</p>
            <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink/55">
              We work in 109 Massachusetts towns and photograph far more jobs than we publish.
              Clear the filter to see the whole portfolio, or ask us for photographs from your own
              street.
            </p>
            <button
              type="button"
              onClick={() => {
                setService(ALL);
                setTown(ALL);
              }}
              className="mt-7 border border-ink px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-ink transition-colors hover:bg-ink hover:text-bone"
            >
              Show every job
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
