import Link from 'next/link';
import { City, Service } from '@/types';

interface CityCardProps {
  city: City;
  service?: Service;
}

export default function CityCard({ city, service }: CityCardProps) {
  const href = service
    ? `/services/${service.slug}/${city.slug}`
    : `/cities/${city.slug}`;

  return (
    <Link href={href}>
      <div className="group bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl text-center hover:shadow-lg hover:scale-105 transition-all duration-300 border border-slate-200 hover:border-amber-400">
        <div className="w-12 h-12 bg-amber-400/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-400/30 transition-colors">
          <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="font-bold text-slate-900 group-hover:text-amber-500 transition-colors">
          {city.name}
        </h3>
        <p className="text-sm text-gray-500">{city.distance} miles</p>
      </div>
    </Link>
  );
}
