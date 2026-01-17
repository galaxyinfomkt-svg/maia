import { HIC_NUMBER } from '@/lib/constants';

interface TrustBadgesProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showAll?: boolean;
}

export default function TrustBadges({ variant = 'light', size = 'md', showAll = true }: TrustBadgesProps) {
  const badges = [
    {
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
        </svg>
      ),
      label: `MA HIC #${HIC_NUMBER}`,
      sublabel: 'Licensed',
    },
    {
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
      label: 'Fully Insured',
      sublabel: '$2M Coverage',
    },
    {
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ),
      label: '5-Star Rated',
      sublabel: '47+ Reviews',
    },
    {
      icon: (
        <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
      ),
      label: 'Written Warranty',
      sublabel: 'Guaranteed',
    },
  ];

  const displayBadges = showAll ? badges : badges.slice(0, 3);

  const sizeClasses = {
    sm: {
      container: 'gap-3',
      icon: 'w-5 h-5',
      label: 'text-xs',
      sublabel: 'text-[10px]',
    },
    md: {
      container: 'gap-4',
      icon: 'w-6 h-6',
      label: 'text-sm',
      sublabel: 'text-xs',
    },
    lg: {
      container: 'gap-6',
      icon: 'w-8 h-8',
      label: 'text-base',
      sublabel: 'text-sm',
    },
  };

  const colorClasses = {
    light: {
      bg: 'bg-white/10 backdrop-blur-sm',
      icon: 'text-amber-400',
      label: 'text-white',
      sublabel: 'text-white/70',
    },
    dark: {
      bg: 'bg-slate-100',
      icon: 'text-amber-500',
      label: 'text-slate-900',
      sublabel: 'text-slate-600',
    },
  };

  return (
    <div className={`flex flex-wrap justify-center ${sizeClasses[size].container}`}>
      {displayBadges.map((badge, index) => (
        <div
          key={index}
          className={`flex items-center gap-2 px-4 py-2 rounded-full ${colorClasses[variant].bg}`}
        >
          <div className={`${sizeClasses[size].icon} ${colorClasses[variant].icon}`}>
            {badge.icon}
          </div>
          <div className="flex flex-col">
            <span className={`font-bold ${sizeClasses[size].label} ${colorClasses[variant].label}`}>
              {badge.label}
            </span>
            <span className={`${sizeClasses[size].sublabel} ${colorClasses[variant].sublabel}`}>
              {badge.sublabel}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Compact inline version for pages
export function TrustBadgesInline() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
      <span className="flex items-center gap-1.5 text-slate-600">
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        MA Licensed (HIC #{HIC_NUMBER})
      </span>
      <span className="flex items-center gap-1.5 text-slate-600">
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Fully Insured
      </span>
      <span className="flex items-center gap-1.5 text-slate-600">
        <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        5-Star Rated
      </span>
      <span className="flex items-center gap-1.5 text-slate-600">
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Free Estimates
      </span>
    </div>
  );
}
