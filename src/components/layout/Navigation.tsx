'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Cities We Serve', href: '/cities' },
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

  return (
    <nav className={cn(
      vertical ? 'flex flex-col space-y-4' : 'flex items-center space-x-1',
      className
    )}>
      {navItems.map((item) => {
        const isActive = pathname === item.href ||
          (item.href !== '/' && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
              vertical ? 'text-lg' : 'text-sm',
              isActive
                ? isLight
                  ? 'text-amber-600 bg-amber-50'
                  : 'text-amber-400 bg-amber-400/10'
                : isLight
                  ? 'text-slate-700 hover:text-amber-600 hover:bg-slate-50'
                  : 'text-white hover:text-amber-400 hover:bg-white/5'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
