import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { HeroWithForm, ServicesSection, CTASection, RealReviews } from '@/components/sections';
import { JsonLd, Breadcrumbs } from '@/components/seo';
import { services, getServiceBySlug } from '@/lib/services';
import { cities } from '@/lib/cities';
import { SITE_NAME, PHONE, SITE_URL, HIC_NUMBER , heroPhotoFor } from '@/lib/constants';
import { AVERAGE_RATING, GOOGLE_REVIEW_COUNT } from '@/lib/reviews';

const BeforeAfter = dynamic(() => import('@/components/sections/BeforeAfter'), {
  loading: () => <div className="py-24 bg-slate-900" />,
});

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) return {};

  const title = `${service.name} in Massachusetts | Maia Construction`;
  const description = `${service.shortDescription} Licensed HIC #${HIC_NUMBER}, 109 towns from our Charlton shop. Free estimate: ${PHONE}.`;
  const url = `${SITE_URL}/services/${service.slug}/`;

  return {
    title: { absolute: title },
    description,
    openGraph: { title, description, url, type: 'website', images: [{ url: service.image }] },
    alternates: { canonical: url },
  };
}

/* Questions that are true of every service, answered once. */
const COMMON_FAQS = [
  {
    question: 'Do you use subcontractors?',
    answer: 'The installation is done by our own crew. We tell you in writing if any specialist trade is involved on your job.',
  },
  {
    question: 'Do you pull the permits?',
    answer: `Yes. We file with your building department and schedule the inspections. We are licensed under Massachusetts HIC #${HIC_NUMBER}.`,
  },
  {
    question: 'What happens if you find rot once the old material is off?',
    answer: 'You see it before we cover it. Repairs are charged at the rate agreed in the written quote, so nothing is renegotiated mid-job.',
  },
];

export default async function ServicePage({ params }: ServicePageProps) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) notFound();

  const faqs = [...service.faq.map((f) => ({ question: f.q, answer: f.a })), ...COMMON_FAQS];
  const pageUrl = `${SITE_URL}/services/${service.slug}/`;

  // Every town, grouped by county, so all 109 city pages for this service
  // are one click from the service hub.
  const byCounty = cities.reduce<Record<string, typeof cities>>((acc, c) => {
    (acc[c.county] ||= []).push(c);
    return acc;
  }, {});
  const counties = Object.keys(byCounty).sort((a, b) => byCounty[b].length - byCounty[a].length);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: service.name,
    description: service.shortDescription,
    url: pageUrl,
    serviceType: service.name,
    provider: { '@type': 'HomeAndConstructionBusiness', '@id': `${SITE_URL}/#organization`, name: SITE_NAME, telephone: PHONE },
    areaServed: cities.map((c) => ({ '@type': 'City', name: `${c.name}, MA` })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services/` },
      { '@type': 'ListItem', position: 3, name: service.name, item: pageUrl },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <HeroWithForm
        badge={`HIC #${HIC_NUMBER} · ${AVERAGE_RATING} from ${GOOGLE_REVIEW_COUNT} Google reviews`}
        title={
          <>
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">{service.name}</span>{' '}
            in Massachusetts
          </>
        }
        subtitle={`${service.shortDescription} Our own crew, from Charlton to 109 towns.`}
        backgroundImage={heroPhotoFor(`service/${service.slug}`)}
      />

      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: service.name }]} />
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">About our {service.shortName}</h2>
            <div className="space-y-5 text-lg text-gray-700 leading-relaxed">
              {service.fullDescription.split('\n\n').map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">What is included</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-800">{feature}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Why homeowners choose it</h3>
            <ul className="grid md:grid-cols-2 gap-2 text-gray-700">
              {service.benefits.map((b) => (
                <li key={b} className="flex gap-2"><span className="text-amber-500" aria-hidden="true">✓</span>{b}</li>
              ))}
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-12 mb-4">How the job runs</h3>
            <ol className="space-y-4">
              {service.steps.map((step, i) => (
                <li key={step.name} className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <div>
                    <p className="font-bold text-slate-900">{step.name}</p>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="grid md:grid-cols-3 gap-4 mt-10">
              {[
                ['Typical cost', service.costRange],
                ['Timeline', service.timeline],
                ['Warranty', service.warranty],
              ].map(([label, value]) => (
                <div key={label} className="bg-amber-50 p-5 rounded-2xl border border-amber-200">
                  <p className="text-sm text-amber-800 font-semibold mb-1">{label}</p>
                  <p className="font-bold text-slate-900">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BeforeAfter title={`Before and after`} subtitle="Real jobs, photographed on site. Drag to compare." />

      {/* ── Every town for this service ── */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">{service.name} by town</h2>
            <p className="text-gray-700 mb-10 max-w-3xl">
              Each town has its own page: how far it is from the shop, what its winter does to a wall, and our finished jobs nearest to it.
            </p>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {counties.map((county) => (
                <div key={county}>
                  <h3 className="font-bold text-slate-900 mb-3">{county} County</h3>
                  <ul className="space-y-1.5">
                    {byCounty[county]
                      .slice()
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((c) => (
                        <li key={c.slug}>
                          <Link href={`/services/${service.slug}/${c.slug}`} className="text-gray-700 hover:text-amber-700 hover:underline">
                            {c.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RealReviews seed={`service-${service.slug}`} />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">{service.name} questions</h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="bg-slate-50 rounded-xl border border-slate-200">
                  <summary className="px-6 py-4 cursor-pointer font-bold text-slate-900">{faq.question}</summary>
                  <p className="px-6 pb-5 text-gray-700 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServicesSection title="Our other services" subtitle="Everything on the outside of the house, from the siding to the trim." exclude={service.slug} />

      <CTASection title={`Free ${service.name.toLowerCase()} estimate`} subtitle={`We come to you anywhere in our 109 towns. Call ${PHONE} or request a quote.`} />
    </>
  );
}
