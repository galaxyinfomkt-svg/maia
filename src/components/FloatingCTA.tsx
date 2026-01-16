'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { PHONE, PHONE_LINK } from '@/lib/constants';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href={PHONE_LINK}
      aria-label="Call for free estimate"
      className={cn(
        'fixed bottom-6 right-6 z-40 flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      )}
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-900" />
      </span>
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
      <span className="hidden sm:inline">FREE Quote: {PHONE}</span>
      <span className="sm:hidden">Call Now</span>
    </a>
  );
}
