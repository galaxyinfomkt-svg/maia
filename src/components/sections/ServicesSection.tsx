import Link from 'next/link';
import { services } from '@/lib/services';
import ServiceCard from '@/components/cards/ServiceCard';

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  showAll?: boolean;
  citySlug?: string;
}

export default function ServicesSection({
  title = 'Our Services',
  subtitle = 'Expert craftsmanship for every project',
  showAll = true,
  citySlug,
}: ServicesSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              citySlug={citySlug}
            />
          ))}
        </div>

        {showAll && (
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all"
            >
              View All Services
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
