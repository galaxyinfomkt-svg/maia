import { PHONE, PHONE_LINK, EMAIL, EMAIL_LINK } from '@/lib/constants';

export default function TopBar() {
  return (
    <div className="bg-slate-900 text-white py-2 text-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Phone */}
          <a
            href={PHONE_LINK}
            className="flex items-center space-x-2 hover:text-amber-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="font-semibold">{PHONE}</span>
          </a>

          {/* Call to Action */}
          <p className="text-amber-400 font-semibold text-center hidden md:block">
            Free Estimates - Call Now for Expert Home Improvement!
          </p>

          {/* Email */}
          <a
            href={EMAIL_LINK}
            className="flex items-center space-x-2 hover:text-amber-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>{EMAIL}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
