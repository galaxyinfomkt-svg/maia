import { HIC_NUMBER } from '@/lib/constants';

interface WhyChooseUsProps {
  cityName?: string;
}

const reasons = [
  {
    icon: '🏆',
    title: '10+ Years of Excellence',
    description: 'Over a decade transforming Massachusetts homes. 500+ projects completed with expert precision and attention to detail.',
  },
  {
    icon: '📋',
    title: 'MA Licensed (HIC #' + HIC_NUMBER + ')',
    description: 'Fully licensed, bonded, and insured. Your investment is protected from start to finish with our comprehensive coverage.',
  },
  {
    icon: '⭐',
    title: '5.0 Star Google Rating',
    description: 'Consistently rated 5 stars across 47+ verified reviews. Our customers\' satisfaction speaks louder than any advertisement.',
  },
  {
    icon: '💰',
    title: 'Transparent, Fair Pricing',
    description: 'No surprises, no hidden fees. Get detailed written quotes upfront — we honor our prices and never upsell.',
  },
  {
    icon: '🔧',
    title: 'Premium Materials Only',
    description: 'We partner with top brands: James Hardie, CertainTeed, Andersen, Therma-Tru. 25-50 year manufacturer warranties included.',
  },
  {
    icon: '🤝',
    title: 'Local & Responsive',
    description: 'Marlborough-based family business. We answer calls personally, respond same-day, and treat your home like our own.',
  },
];

export default function WhyChooseUs({ cityName }: WhyChooseUsProps) {
  const title = cityName
    ? `Why ${cityName} Homeowners Choose Us`
    : 'Why Choose Maia Construction';

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl shadow-lg border-t-4 border-amber-400 hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-amber-400/20 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">{reason.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
