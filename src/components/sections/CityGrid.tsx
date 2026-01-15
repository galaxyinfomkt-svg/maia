import Link from 'next/link';
import { City } from '@/types';
import { Service } from '@/types';
import CityCard from '@/components/cards/CityCard';

interface CityGridProps {
  title?: string;
  subtitle?: string;
  cities: City[];
  service?: Service;
  showAll?: boolean;
  limit?: number;
}

export default function CityGrid({
  title = 'Cities We Serve',
  subtitle = 'Professional construction services throughout Massachusetts',
  cities,
  service,
  showAll = true,
  limit,
}: CityGridProps) {
  const displayCities = limit ? cities.slice(0, limit) : cities;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {displayCities.map((city) => (
            <CityCard key={city.slug} city={city} service={service} />
          ))}
        </div>

        {showAll && (
          <div className="text-center mt-12">
            <Link
              href="/cities"
              className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all"
            >
              View All 100+ Cities
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
