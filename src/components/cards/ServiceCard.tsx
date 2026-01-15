import Link from 'next/link';
import Image from 'next/image';
import { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  citySlug?: string;
}

export default function ServiceCard({ service, citySlug }: ServiceCardProps) {
  const href = citySlug
    ? `/services/${service.slug}/${citySlug}`
    : `/services/${service.slug}`;

  return (
    <Link href={href}>
      <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-l-4 border-amber-400 h-full">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className="text-4xl">{service.icon}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-500 transition-colors">
            {service.name}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {service.shortDescription}
          </p>
          <div className="flex items-center text-amber-500 font-semibold">
            Learn More
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
