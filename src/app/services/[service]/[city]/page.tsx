import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { HeroWithForm, CTASection } from '@/components/sections';
import { JsonLd, Breadcrumbs } from '@/components/seo';
import { services, getServiceBySlug } from '@/lib/services';
import { cities, getCityBySlug } from '@/lib/cities';
import { SITE_NAME, PHONE, SITE_URL, heroPhotoFor } from '@/lib/constants';
import { GOOGLE_REVIEW_COUNT, AVERAGE_RATING } from '@/lib/reviews';
import { serviceLens } from '@/lib/town-lens';
import { getServiceCityContent, nearestJobs } from '@/lib/local-content';

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
  const lens = serviceLens(service, city);
  // The single most relevant finished job: the nearest one of THIS service if we have any, else the nearest job.
  const job = nearestJobs(city.slug, service.slug, 20).find((j) => j.sameService) ?? local.jobs[0];
  const jobText = job
    ? job.miles <= 1
      ? `We have photographed ${job.sameService ? `a ${service.shortName} job` : 'a finished job'} right here in ${city.name}: ${job.project.title}.`
      : `${job.sameService ? `Our closest photographed ${service.shortName} job` : 'Our closest photographed job'} to ${city.name} is ${job.project.title} in ${job.project.location}, ${job.miles} miles ${job.direction}.`
    : '';
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
        backgroundImage={heroPhotoFor(`${service.slug}/${city.slug}`)}
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

      {/* ── Only the facts about this town that change THIS job (src/lib/town-lens.ts) ── */}
      {lens && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">{lens.heading}</h2>
              <ul className="space-y-4 text-lg text-gray-700 leading-relaxed">
                {lens.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-gray-500">Sources: {lens.sources}</p>
              <Link href={`/cities/${city.slug}`} className="mt-4 inline-block font-semibold text-amber-700 hover:underline">
                {city.name}&apos;s full record: homes, history, weather and energy code →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Our finished jobs nearest to this town ── */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our work near {city.name}</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl">{jobText}</p>
            <div className="grid gap-6 md:grid-cols-2">
              {(job ? [job] : []).map(({ project, miles, direction }) => {
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
            <Link href="/projects" className="mt-8 inline-flex font-semibold text-amber-700 hover:underline">
              See every job we have photographed →
            </Link>
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

      {/* The rating only: a sampled quote repeated across hundreds of pages added nothing local. */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-amber-400 text-lg" aria-hidden="true">★★★★★</p>
            <p className="mt-1 font-semibold">
              {AVERAGE_RATING} from {GOOGLE_REVIEW_COUNT} Google reviews
            </p>
            <Link href="/reviews" className="mt-5 inline-block font-semibold text-amber-400 hover:underline">Read all our reviews</Link>
          </div>
        </div>
      </section>

      {/* ── Internal links: other services here, this service next door ── */}
      <nav aria-label={`More pages for ${city.name}`} className="py-16 bg-slate-50">
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
      </nav>

      <CTASection
        title={`Free ${service.name.toLowerCase()} estimate in ${city.name}`}
        subtitle={`Call ${PHONE} or request a quote.`}
        cityName={city.name}
        compact
      />
    </>
  );
}
