import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Hero, CTASection } from '@/components/sections';
import { cities, getCitiesByCounty } from '@/lib/cities';
import { services } from '@/lib/services';
import { JsonLd } from '@/components/seo';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cities We Serve',
  description: `${SITE_NAME} serves over 100 cities across Massachusetts including Marlborough, Framingham, Worcester, Natick, and more. Find your city for local service.`,
};

export default function CitiesPage() {
  const counties = ['Middlesex', 'Worcester', 'Norfolk', 'Essex', 'Suffolk'];

  const areaServedSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Cities Served by Maia Construction',
    itemListElement: cities.map((city, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'City',
        name: city.name,
        containedInPlace: {
          '@type': 'State',
          name: 'Massachusetts',
        },
      },
    })),
  };

  return (
    <>
      <JsonLd data={areaServedSchema} />

      <Hero
        title="Cities We Serve"
        subtitle={`Professional construction services in ${cities.length}+ Massachusetts communities`}
        badge="Service Area"
        showCTA={false}
        size="inner"
      />

      {/* Stats */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-amber-400 mb-2">{cities.length}+</p>
              <p className="text-white/80">Cities Served</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-amber-400 mb-2">5</p>
              <p className="text-white/80">Counties Covered</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-amber-400 mb-2">25</p>
              <p className="text-white/80">Mile Radius</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-amber-400 mb-2">Same Day</p>
              <p className="text-white/80">Estimates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services with Cities */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Services by Location</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
            <p className="text-xl text-gray-600">
              Find our services available in your city
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service) => (
              <div key={service.slug} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Service Info */}
                  <div className="lg:w-1/3">
                    <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                      <Image
                        src={service.image}
                        alt={`${service.name} services available in 100+ Massachusetts cities - professional installation`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{service.icon}</span>
                      <h3 className="text-2xl font-bold text-slate-900">{service.name}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{service.shortDescription}</p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center text-amber-500 font-semibold hover:text-amber-600 transition-colors"
                    >
                      Learn More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>

                  {/* Cities Grid */}
                  <div className="lg:w-2/3">
                    <h4 className="text-lg font-semibold text-slate-900 mb-4">
                      {service.name} available in {cities.length}+ cities:
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-80 overflow-y-auto pr-2">
                      {cities.map((city) => (
                        <Link
                          key={`${service.slug}-${city.slug}`}
                          href={`/services/${service.slug}/${city.slug}`}
                          className="px-3 py-2 text-sm text-gray-600 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all"
                        >
                          {city.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities by County */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Browse by County</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
            <p className="text-xl text-gray-600">
              Select your county to find services in your area
            </p>
          </div>

          <div className="space-y-16">
            {counties.map((county) => {
              const countyCities = getCitiesByCounty(county);
              if (countyCities.length === 0) return null;

              return (
                <div key={county}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-slate-900">
                      {county} County
                    </h3>
                    <span className="px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold">
                      {countyCities.length} cities
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {countyCities.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/cities/${city.slug}`}
                        className="group p-4 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-semibold text-slate-900 group-hover:text-amber-500 transition-colors">
                            {city.name}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{city.distance} miles away</p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Cities Alphabetical */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">All Cities A-Z</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...cities]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((city) => (
                <Link
                  key={city.slug}
                  href={`/cities/${city.slug}`}
                  className="text-gray-600 hover:text-amber-500 transition-colors"
                >
                  {city.name}, MA
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Don't See Your City?"
        subtitle="We may still serve your area! Contact us to find out."
      />
    </>
  );
}
