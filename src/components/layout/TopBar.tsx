import { PHONE, PHONE_LINK, EMAIL, EMAIL_LINK, ADDRESS } from '@/lib/constants';

/**
 * The strip above the header: where we are, how to email us, how to call us.
 *
 * It used to be a single non-wrapping flex row, which overflowed on a phone —
 * "Serving Charlton, Massachusetts" plus the number needs about 356px and a
 * 375px screen leaves 343px. The email was hidden below md to make room, which
 * meant the address never showed on the device most people arrive on.
 *
 * Now it wraps instead: each item is kept whole with whitespace-nowrap, so a
 * line break can only ever fall *between* items, never through a phone number
 * or an email address. On a phone it settles into two centred rows (three on a
 * 320px screen); from sm up it is the original single spread row.
 */
export default function TopBar() {
  return (
    <div className="bg-slate-900 text-white py-2 text-xs sm:text-sm">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-x-4 sm:flex-nowrap sm:justify-between">
          {/* Location */}
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <svg
              className="h-4 w-4 shrink-0 text-amber-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Serving {ADDRESS.city}, Massachusetts</span>
          </span>

          {/* Email */}
          <a
            href={EMAIL_LINK}
            className="flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-amber-400"
          >
            <svg
              className="h-4 w-4 shrink-0 text-amber-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>{EMAIL}</span>
          </a>

          {/* Phone */}
          <a
            href={PHONE_LINK}
            className="flex items-center gap-1.5 whitespace-nowrap font-semibold transition-colors hover:text-amber-400"
          >
            <svg
              className="h-4 w-4 shrink-0 text-amber-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>{PHONE}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
