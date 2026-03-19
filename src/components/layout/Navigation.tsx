'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { services } from '@/lib/services';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Cities We Serve', href: '/massachusetts' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

interface NavigationProps {
  className?: string;
  onItemClick?: () => void;
  vertical?: boolean;
  variant?: 'dark' | 'light';
}

export default function Navigation({ className, onItemClick, vertical = false, variant = 'dark' }: NavigationProps) {
  const pathname = usePathname();
  const isLight = variant === 'light';
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (vertical) {
    return (
      <nav className={cn('flex flex-col space-y-4', className)}>
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={onItemClick}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-lg block',
                  isActive ? 'text-amber-400 bg-amber-400/10' : 'text-white hover:text-amber-400 hover:bg-white/5'
                )}
              >
                {item.label}
              </Link>
              {item.hasDropdown && (
                <div className="ml-4 mt-2 space-y-1">
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={onItemClick}
                      className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-amber-400 transition-colors"
                    >
                      <span className="text-amber-400">→</span>
                      <span className="text-sm">{service.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className={cn('flex items-center space-x-1', className)}>
      {navItems.map((item) => {
        const isActive = pathname === item.href ||
          (item.href !== '/' && pathname.startsWith(item.href));

        if (item.hasDropdown) {
          return (
            <div key={item.href} className="relative" ref={dropdownRef}>
              <button
                onMouseEnter={() => setDropdownOpen(true)}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm flex items-center gap-1',
                  isActive
                    ? isLight ? 'text-amber-600 bg-amber-50' : 'text-amber-400 bg-amber-400/10'
                    : isLight ? 'text-slate-700 hover:text-amber-600 hover:bg-slate-50' : 'text-white hover:text-amber-400 hover:bg-white/5'
                )}
              >
                {item.label}
                <svg className={cn('w-4 h-4 transition-transform', dropdownOpen && 'rotate-180')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-slate-900 rounded-2xl shadow-2xl border border-white/10 py-3 z-50 backdrop-blur-xl"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {services.map((service, index) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={() => { setDropdownOpen(false); onItemClick?.(); }}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-white/10 transition-all group"
                    >
                      <span className="w-9 h-9 bg-amber-400/15 rounded-lg flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-900 transition-all">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-white text-sm group-hover:text-amber-400 transition-colors">{service.name}</p>
                          {index === 0 && (
                            <span className="text-[10px] font-bold bg-amber-400 text-slate-900 px-1.5 py-0.5 rounded">TOP</span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-400 line-clamp-1">{service.shortDescription}</p>
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-white/10 mt-2 pt-2 mx-3">
                    <Link
                      href="/services"
                      onClick={() => { setDropdownOpen(false); onItemClick?.(); }}
                      className="flex items-center justify-center gap-2 py-2 text-amber-400 hover:text-amber-300 transition-colors text-sm font-semibold"
                    >
                      View All Services
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              'px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm',
              isActive
                ? isLight ? 'text-amber-600 bg-amber-50' : 'text-amber-400 bg-amber-400/10'
                : isLight ? 'text-slate-700 hover:text-amber-600 hover:bg-slate-50' : 'text-white hover:text-amber-400 hover:bg-white/5'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
