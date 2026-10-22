import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { HeroWithForm, CTASection } from '@/components/sections';
import { JsonLd, Breadcrumbs } from '@/components/seo';
import { services, getServiceBySlug } from '@/lib/services';
import { cities, getCityBySlug } from '@/lib/cities';
import { TOWN_DATA } from '@/lib/town-data';

const DECADE_LABELS = ['Before 1940', '1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020 or later'];
import { SITE_NAME, PHONE, SITE_URL, REAL_PHOTOS } from '@/lib/constants';
import { GOOGLE_REVIEW_COUNT, AVERAGE_RATING, reviewsFor } from '@/lib/reviews';
import { getServiceCityContent, SOURCES_NOTE } from '@/lib/local-content';

interface ServiceCityPageProps {
  params: Promise<{ service: string; city: string }>;
}

export async function generateStaticParams() {
  const params: { service: string; city: string }[] = [];
  for (const service of services) {
    for (const city of cities) {
      params.push({ service: service.slug, city: city.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: ServiceCityPageProps): Promise<Metadata> {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) return {};

  const { title, description } = getServiceCityContent(service, city);
  const url = `${SITE_URL}/services/${service.slug}/${city.slug}/`;

  return {
    title: { absolute: title },
    description,
    openGraph: { title, description, url, images: [{ url: service.image }] },
    alternates: { canonical: url },
  };
}

export default async function ServiceCityPage({ params }: ServiceCityPageProps) {
  const { service: serviceSlug, city: citySlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  const city = getCityBySlug(citySlug);
  if (!service || !city) notFound();

  const local = getServiceCityContent(service, city);
  const [review] = reviewsFor(`${service.slug}-${city.slug}`, 1);
  const pageUrl = `${SITE_URL}/services/${service.slug}/${city.slug}/`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services/` },
      { '@type': 'ListItem', position: 3, name: service.name, item: `${SITE_URL}/services/${service.slug}/` },
      { '@type': 'ListItem', position: 4, name: `${city.name}, MA`, item: pageUrl },
    ],
  };


  // One business, in Charlton. This page describes an area we serve, not a
  // branch, so the only business node is a reference to the organization.
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: `${service.name} in ${city.name}, MA`,
    description: local.placement,
    serviceType: service.name,
    url: pageUrl,
    provider: { '@type': 'HomeAndConstructionBusiness', '@id': `${SITE_URL}/#organization`, name: SITE_NAME, telephone: PHONE },
    areaServed: {
      '@type': 'City',
      name: city.name,
      address: { '@type': 'PostalAddress', addressLocality: city.name, addressRegion: 'MA', postalCode: city.zip, addressCountry: 'US' },
      containedInPlace: { '@type': 'AdministrativeArea', name: `${city.county} County, Massachusetts` },
    },
  };

  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />

      <HeroWithForm
        badge={`${city.name}, MA · ${AVERAGE_RATING} on Google`}
        title={
          <>
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
              {service.name}
            </span>{' '}
            in {city.name}, MA
          </>
        }
        subtitle={local.heroSubtitle}
        backgroundImage={REAL_PHOTOS[(city.slug.length + service.slug.length) % REAL_PHOTOS.length]}
      />

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: service.name, href: `/services/${service.slug}` },
              { label: city.name },
            ]}
          />
        </div>
      </div>

      {/* ── The local picture: everything here is computed for this town ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              {service.name} in {city.name}: what we plan for
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">{local.lead}</p>
            <dl className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {local.facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-4 border-b border-slate-200 pb-2">
                  <dt className="text-gray-600">{f.label}</dt>
                  <dd className="text-right font-semibold text-slate-900">{f.value}</dd>
                </div>
              ))}
            </dl>
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
                        <Link href={`/services/${service.slug}/${r.slug}`} className="font-medium text-slate-900 hover:text-amber-700 hover:underline">{r.name}</Link>
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
                  {local.comparison.map((r) => (
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
                    <span key={n} className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-sm font-medium">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Our finished jobs nearest to this town ── */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our work near {city.name}</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl">{local.jobsIntro}</p>
            <div className="grid gap-6 md:grid-cols-3">
              {local.jobs.map(({ project, miles, direction }) => {
                const card = (
                  <>
                    <div className="relative aspect-[4/3] bg-slate-200">
                      <Image src={project.image} alt={`${project.title} in ${project.location}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                    </div>
                    <div className="p-5">
                      <p className="text-sm font-semibold text-amber-700">
                        {project.location} · {miles <= 1 ? `in ${city.name}` : `${miles} mi ${direction}`}
                      </p>
                      <h3 className="mt-1 font-bold text-slate-900">{project.title}</h3>
                    </div>
                  </>
                );
                return project.slug ? (
                  <Link key={project.id} href={`/projects/${project.slug}`} className="block overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow">
                    {card}
                  </Link>
                ) : (
                  <div key={project.id} className="overflow-hidden rounded-2xl bg-white shadow-md">
                    {card}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── What the job includes: a summary. The full process, challenges and
          answers live once on the service page, not repeated on 109 towns. ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-800">
              <span className="font-bold text-slate-900">Typical cost: </span>
              {service.costRange}.
            </p>
            <Link href={`/services/${service.slug}`} className="mt-6 inline-flex font-semibold text-amber-700 hover:underline">
              What is included, timeline and warranty →
            </Link>
          </div>
        </div>
      </section>

      {/* One real review and the rating, not a three-card block repeated on 981 pages. */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-amber-400 text-lg" aria-hidden="true">★★★★★</p>
            <p className="mt-1 font-semibold">
              {AVERAGE_RATING} from {GOOGLE_REVIEW_COUNT} Google reviews
            </p>
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

      {/* ── Internal links: other services here, this service next door ── */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-5">More of our services in {city.name}</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {otherServices.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}/${city.slug}`} className="block rounded-lg bg-white px-4 py-3 font-medium text-slate-800 border border-slate-200 hover:border-amber-400">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">{service.name} next door</h2>
              <p className="text-gray-700 mb-5">{local.neighbourSummary}</p>
              <ul className="space-y-2">
                {local.neighbours.map((n) => (
                  <li key={n.slug}>
                    <Link href={`/services/${service.slug}/${n.slug}`} className="flex items-center justify-between rounded-lg bg-white px-4 py-3 border border-slate-200 hover:border-amber-400">
                      <span className="font-medium text-slate-800">{service.name} in {n.name}</span>
                      <span className="text-sm text-gray-500">{n.miles} mi</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={`/cities/${city.slug}`} className="mt-5 inline-block text-sm font-semibold text-amber-700 hover:underline">
                All services in {city.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={`Free ${service.name.toLowerCase()} estimate in ${city.name}`}
        subtitle={`Call ${PHONE} or request a quote.`}
        cityName={city.name}
        compact
      />
    </>
  );
}
