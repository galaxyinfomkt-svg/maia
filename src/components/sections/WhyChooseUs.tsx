interface WhyChooseUsProps {
  cityName?: string;
}

const reasons = [
  {
    icon: '🏆',
    title: 'Expert Craftsmanship',
    description: 'Over a decade of experience delivering quality construction services throughout Massachusetts.',
  },
  {
    icon: '📋',
    title: 'Licensed & Insured',
    description: 'Fully licensed and insured contractors. Your home is protected throughout the entire project.',
  },
  {
    icon: '⭐',
    title: '5-Star Rated',
    description: 'Consistently rated 5 stars by our customers. We\'re proud of our reputation for excellence.',
  },
  {
    icon: '💰',
    title: 'Competitive Pricing',
    description: 'Quality workmanship at fair prices. We provide detailed quotes with no hidden fees.',
  },
  {
    icon: '🔧',
    title: 'Quality Materials',
    description: 'We use only premium materials from trusted manufacturers with comprehensive warranties.',
  },
  {
    icon: '🤝',
    title: 'Customer Focused',
    description: 'Your satisfaction is our priority. We communicate clearly and deliver on our promises.',
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
