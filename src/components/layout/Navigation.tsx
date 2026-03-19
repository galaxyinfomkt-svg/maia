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
                      <span className="text-lg">{service.icon}</span>
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
                  className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={() => { setDropdownOpen(false); onItemClick?.(); }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 transition-colors group"
                    >
                      <span className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-xl group-hover:bg-amber-400 group-hover:text-slate-900 transition-colors">
                        {service.icon}
                      </span>
                      <div>
                        <p className="font-semibold text-slate-900 text-sm group-hover:text-amber-600 transition-colors">{service.name}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">{service.shortDescription}</p>
                      </div>
                    </Link>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <Link
                      href="/services"
                      onClick={() => { setDropdownOpen(false); onItemClick?.(); }}
                      className="flex items-center gap-2 px-4 py-3 text-amber-600 hover:bg-amber-50 transition-colors text-sm font-semibold"
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
