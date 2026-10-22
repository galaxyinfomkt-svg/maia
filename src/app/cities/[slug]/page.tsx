import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { HeroWithForm, CTASection } from '@/components/sections';
import { JsonLd, Breadcrumbs } from '@/components/seo';
import { cities, getCityBySlug } from '@/lib/cities';
import { TOWN_DATA } from '@/lib/town-data';

const DECADE_LABELS = ['Before 1940', '1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020 or later'];
import { services } from '@/lib/services';
import { getCityContent, townComparison, SOURCES_NOTE } from '@/lib/local-content';
import { SITE_NAME, SITE_URL, PHONE, REAL_PHOTOS } from '@/lib/constants';
import { AVERAGE_RATING, GOOGLE_REVIEW_COUNT, reviewsFor } from '@/lib/reviews';

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};

  const { title, description } = getCityContent(city);
  const url = `${SITE_URL}/cities/${city.slug}/`;

  return {
    title: { absolute: title },
    description,
    openGraph: { title, description, url },
    alternates: { canonical: url },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const local = getCityContent(city);
  const comparison = townComparison(city);
  const [review] = reviewsFor(`city-${city.slug}`, 1);
  const pageUrl = `${SITE_URL}/cities/${city.slug}/`;

  // One business, in Charlton. This page describes an area we serve, so it
  // emits a Service pointing at the organization, with no rating of its own.
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: `Siding, trim, windows and doors in ${city.name}, MA`,
    serviceType: 'Exterior siding contractor',
    url: pageUrl,
    provider: { '@type': 'HomeAndConstructionBusiness', '@id': `${SITE_URL}/#organization`, name: SITE_NAME, telephone: PHONE },
    areaServed: {
      '@type': 'City',
      name: city.name,
      address: { '@type': 'PostalAddress', addressLocality: city.name, addressRegion: 'MA', postalCode: city.zip, addressCountry: 'US' },
      containedInPlace: { '@type': 'AdministrativeArea', name: `${city.county} County, Massachusetts` },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Services in ${city.name}`,
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: `${s.name} in ${city.name}`, url: `${SITE_URL}/services/${s.slug}/${city.slug}/` },
      })),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${SITE_URL}/cities/` },
      { '@type': 'ListItem', position: 3, name: `${city.name}, MA`, item: pageUrl },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: local.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <HeroWithForm
        badge={`${city.name}, MA · ${AVERAGE_RATING} on Google`}
        title={
          <>
            Siding Contractor in{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">{city.name}, MA</span>
          </>
        }
        subtitle={local.heroSubtitle}
        backgroundImage={REAL_PHOTOS[(city.slug.length + 3) % REAL_PHOTOS.length]}
      />

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: 'Service Areas', href: '/cities' }, { label: city.name }]} />
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Working in {city.name}</h2>
            <div className="space-y-5 text-lg text-gray-700 leading-relaxed">
              <p>{local.placement}</p>
              <p>{local.climate}</p>
              <p>{local.housing}</p>
              <p>{local.neighbourSummary}</p>
            </div>
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-300 text-slate-600">
                    <th className="py-2 pr-4 font-semibold">Town</th>
                    <th className="py-2 pr-4 font-semibold">From {city.name}</th>
                    <th className="py-2 pr-4 font-semibold">County</th>
                    <th className="py-2 pr-4 font-semibold">To the coast</th>
                    <th className="py-2 pr-4 font-semibold">To our shop</th>
                    <th className="py-2 pr-4 font-semibold">Typical home</th>
                    <th className="py-2 font-semibold">Homes</th>
                  </tr>
                </thead>
                <tbody>
                  {local.neighbourRows.map((r) => (
                    <tr key={r.slug} className="border-b border-slate-200">
                      <td className="py-2 pr-4">
                        <Link href={`/cities/${r.slug}`} className="font-medium text-slate-900 hover:text-amber-700 hover:underline">{r.name}</Link>
                      </td>
                      <td className="py-2 pr-4 text-gray-700">{r.miles} mi {r.direction}</td>
                      <td className="py-2 pr-4 text-gray-700">{r.county}</td>
                      <td className="py-2 pr-4 text-gray-700">{r.coast} mi</td>
                      <td className="py-2 pr-4 text-gray-700">{r.shop} mi</td>
                      <td className="py-2 pr-4 text-gray-700">{r.year}</td>
                      <td className="py-2 text-gray-700">{r.homes.toLocaleString('en-US')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <caption className="text-left font-bold text-slate-900 mb-2">Homes in {city.name} against {city.county} County towns we serve and all 109</caption>
                <thead>
                  <tr className="border-b border-slate-300 text-slate-600">
                    <th className="py-2 pr-4 font-semibold"> </th>
                    <th className="py-2 pr-4 font-semibold">{city.name}</th>
                    <th className="py-2 pr-4 font-semibold">{city.county} Co.</th>
                    <th className="py-2 font-semibold">All 109</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((r) => (
                    <tr key={r.label} className="border-b border-slate-200">
                      <td className="py-2 pr-4 text-gray-600">{r.label}</td>
                      <td className="py-2 pr-4 font-semibold text-slate-900">{r.town}</td>
                      <td className="py-2 pr-4 text-gray-700">{r.county}</td>
                      <td className="py-2 text-gray-700">{r.all}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-slate-900 mb-3">When {city.name}&apos;s homes were built</h3>
              <ul className="space-y-1.5">
                {TOWN_DATA[city.slug].decades.map((pct, i) => (
                  <li key={DECADE_LABELS[i]} className="flex items-center gap-3 text-sm">
                    <span className="w-24 shrink-0 text-gray-600">{DECADE_LABELS[i]}</span>
                    <span className="h-3 rounded bg-amber-400" style={{ width: `${Math.max(pct, 1) * 2}%` }} aria-hidden="true" />
                    <span className="font-semibold text-slate-900">{pct}%</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-xs text-gray-500">{SOURCES_NOTE}</p>
            {local.neighbourhoods.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Parts of {city.name} we work in</h3>
                <div className="flex flex-wrap gap-2">
                  {local.neighbourhoods.map((n) => (
                    <span key={n} className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-sm font-medium">{n}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── The nine service pages for this town ── */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Our services in {city.name}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}/${city.slug}`} className="group rounded-2xl bg-white p-6 border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all">
                  <h3 className="font-bold text-slate-900 group-hover:text-amber-700">{s.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Our finished jobs nearest to {city.name}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {local.jobs.map(({ project, miles, direction }) => (
                <Link key={project.id} href={project.slug ? `/projects/${project.slug}` : '/projects'} className="block overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow">
                  <div className="relative aspect-[4/3] bg-slate-200">
                    <Image src={project.image} alt={`${project.title} in ${project.location}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-semibold text-amber-700">
                      {project.location} · {miles <= 1 ? `in ${city.name}` : `${miles} mi ${direction}`}
                    </p>
                    <h3 className="mt-1 font-bold text-slate-900">{project.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
            <ul className="mt-6 space-y-1 text-gray-700">
              {local.jobLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-amber-400 text-lg" aria-hidden="true">★★★★★</p>
            <p className="mt-1 font-semibold">{AVERAGE_RATING} from {GOOGLE_REVIEW_COUNT} Google reviews</p>
            {review && (
              <blockquote className="mt-5 text-lg text-white/90 leading-relaxed">
                “{review.text}”
                <footer className="mt-2 text-sm text-white/60">{review.author}{review.work ? `, ${review.work}` : ''}</footer>
              </blockquote>
            )}
            <Link href="/reviews" className="mt-5 inline-block font-semibold text-amber-400 hover:underline">Read all our reviews</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Questions from {city.name}</h2>
              <div className="space-y-3">
                {local.faqs.map((f) => (
                  <details key={f.q} className="bg-slate-50 rounded-xl border border-slate-200 group">
                    <summary className="px-5 py-4 cursor-pointer font-bold text-slate-900">{f.q}</summary>
                    <p className="px-5 pb-4 text-gray-700 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Towns next to {city.name}</h2>
              <ul className="space-y-2">
                {local.neighbours.map((n) => (
                  <li key={n.slug}>
                    <Link href={`/cities/${n.slug}`} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 border border-slate-200 hover:border-amber-400">
                      <span className="font-medium text-slate-800">{n.name}, MA</span>
                      <span className="text-sm text-gray-500">{n.miles} mi</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/cities" className="mt-5 inline-block text-sm font-semibold text-amber-700 hover:underline">All 109 towns we serve</Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection title={`Free estimate in ${city.name}`} subtitle={`Call ${PHONE} or request a quote.`} cityName={city.name} compact />
    </>
  );
}
