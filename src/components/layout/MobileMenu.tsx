'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Navigation from './Navigation';
import { PHONE, PHONE_LINK } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-slate-900 z-50 transform transition-transform duration-300 lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="self-end p-2 text-white hover:text-amber-400 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation */}
          <div className="mt-8">
            <Navigation vertical onItemClick={onClose} />
          </div>

          {/* CTA */}
          <div className="mt-auto pt-8 border-t border-white/10">
            <a
              href={PHONE_LINK}
              className="flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {PHONE}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
