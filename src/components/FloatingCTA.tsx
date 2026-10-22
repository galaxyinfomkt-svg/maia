'use client';

import { PHONE, PHONE_LINK } from '@/lib/constants';
import { trackPhoneCall } from '@/components/Analytics';

/* A round call button floating bottom-left on every screen size, always
   visible. The chat bubble sits bottom-right, so the two never overlap. */
export default function FloatingCTA() {
  return (
    <a
      href={PHONE_LINK}
      onClick={trackPhoneCall}
      aria-label={`Call ${PHONE} for a free estimate`}
      className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl"
    >
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
    </a>
  );
}
