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
import { getCityContent } from '@/lib/local-content';
import { townDossier } from '@/lib/town-lens';
import { TOWN_PROFILES } from '@/lib/town-profiles';
import { SITE_NAME, SITE_URL, PHONE, heroPhotoFor } from '@/lib/constants';
import { AVERAGE_RATING, GOOGLE_REVIEW_COUNT } from '@/lib/reviews';

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
  const profile = TOWN_PROFILES[city.slug];
  const dossier = townDossier(city);
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


  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <HeroWithForm
        badge={`${city.name}, MA · ${AVERAGE_RATING} on Google`}
        title={
          <>
            Siding Contractor in{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">{city.name}, MA</span>
          </>
        }
        subtitle={local.heroSubtitle}
        backgroundImage={heroPhotoFor(`city/${city.slug}`)}
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
              {profile && <p>{profile.paragraph}</p>}
            </div>
            {dossier && (
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                {([
                  ['The homes', dossier.homes],
                  ['On the historic record', dossier.heritage],
                  ['Weather and code loads', dossier.weather],
                  ['Utilities and energy code', dossier.energy],
                ] as [string, [string, string][]][])
                  .filter(([, rows]) => rows.length > 0)
                  .map(([label, rows]) => (
                    <div key={label}>
                      <h3 className="font-bold text-slate-900 mb-2">{label}</h3>
                      <dl className="divide-y divide-slate-200 text-sm">
                        {rows.map(([k, v]) => (
                          <div key={k} className="flex justify-between gap-4 py-1.5">
                            <dt className="text-gray-600">{k}</dt>
                            <dd className="text-right font-semibold text-slate-900">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ))}
              </div>
            )}

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
            <p className="mt-4 text-xs text-gray-500">Sources: US Census ACS 2020–24; Massachusetts Historical Commission inventory (MACRIS) via MassGIS; NOAA RCC-ACIS (PRISM, 1991–2020); 780 CMR 10th ed.; MassGIS utility layers; DOER energy-code list (Nov. 2026); OpenStreetMap; USGS.</p>
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
      <nav aria-label={`Our services in ${city.name}`} className="py-16 bg-slate-50">
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
      </nav>

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
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-amber-400 text-lg" aria-hidden="true">★★★★★</p>
            <p className="mt-1 font-semibold">{AVERAGE_RATING} from {GOOGLE_REVIEW_COUNT} Google reviews</p>
            <Link href="/reviews" className="mt-5 inline-block font-semibold text-amber-400 hover:underline">Read all our reviews</Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Where this page&apos;s history comes from</h2>
              {profile && profile.sources.length > 0 ? (
                <ul className="space-y-2 text-sm text-gray-700 break-words">
                  {profile.sources.map((u) => (
                    <li key={u}>
                      <a href={u} rel="nofollow noopener" target="_blank" className="text-amber-700 hover:underline">{u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">Public records listed under the fact sheet above.</p>
              )}
              {profile && <p className="mt-3 text-xs text-gray-500">Checked {profile.checked}.</p>}
            </div>
            <nav aria-label={`Towns next to ${city.name}`}>
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
            </nav>
          </div>
        </div>
      </section>

      <CTASection title={`Free estimate in ${city.name}`} subtitle={`Call ${PHONE} or request a quote.`} cityName={city.name} compact />
    </>
  );
}
