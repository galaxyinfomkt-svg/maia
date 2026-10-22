'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PHONE, PHONE_LINK } from '@/lib/constants';
import { trackPhoneCall } from '@/components/Analytics';

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

/* Phones: a bar fixed to the bottom with the two actions, visible from the
   first screen — the header only has the menu button there. The right edge is
   kept clear for the chat bubble. Desktop: the round call button that appears
   once the visitor has scrolled past the hero. */
export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
        <div className="flex gap-2 py-2 pl-3 pr-20">
          <a
            href={PHONE_LINK}
            onClick={trackPhoneCall}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 py-3 text-sm font-bold text-slate-900"
          >
            <PhoneIcon />
            Call now
          </a>
          <Link href="/contact" className="flex flex-1 items-center justify-center rounded-full bg-slate-900 py-3 text-sm font-bold text-white">
            Free estimate
          </Link>
        </div>
      </div>
      <div className="lg:hidden h-16" aria-hidden="true" />

      <a
        href={PHONE_LINK}
        onClick={trackPhoneCall}
        aria-label={`Call ${PHONE} for a free estimate`}
        className={cn(
          'hidden lg:flex fixed bottom-6 left-6 z-40 w-14 h-14 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 items-center justify-center',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        )}
      >
        <PhoneIcon />
      </a>
    </>
  );
}
