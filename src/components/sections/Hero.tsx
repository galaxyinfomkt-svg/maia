import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui';
import { PHONE, PHONE_LINK, IMAGES } from '@/lib/constants';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  badge?: string;
  showCTA?: boolean;
  children?: React.ReactNode;
  className?: string;
  size?: 'default' | 'large' | 'small' | 'inner';
}

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  badge,
  showCTA = true,
  children,
  className,
  size = 'default',
}: HeroProps) {
  // Inner pages have a different, more compact design
  const isInnerPage = size === 'inner' || size === 'small';

  return (
    <section
      className={cn(
        'relative overflow-hidden flex items-center',
        size === 'large' && 'min-h-[80vh] pt-20',
        size === 'default' && 'min-h-[50vh] pt-20',
        size === 'small' && 'min-h-[35vh] pt-20',
        size === 'inner' && 'min-h-[28vh] pt-20',
        className
      )}
    >
      {/* Background */}
      <Image
        src={backgroundImage || IMAGES.hero}
        alt="Massachusetts home exterior renovation by Maia Construction - professional siding, windows and doors installation in Marlborough MA"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      {/* Neutral dark overlay for text readability - no blue/color tint */}
      <div className={cn(
        'absolute inset-0',
        isInnerPage
          ? 'bg-gradient-to-r from-black/75 via-black/55 to-black/40'
          : 'bg-gradient-to-r from-black/80 via-black/50 to-black/30'
      )} />

      {/* Content */}
      <div className={cn(
        'relative z-10 container mx-auto px-4',
        isInnerPage ? 'py-12' : 'py-20'
      )}>
        <div className={cn(
          isInnerPage ? 'max-w-3xl' : 'max-w-4xl'
        )}>
          {badge && (
            <Badge variant="amber" className={cn(isInnerPage ? 'mb-4' : 'mb-6')}>
              {badge}
            </Badge>
          )}

          <h1 className={cn(
            'font-bold text-white leading-tight',
            isInnerPage
              ? 'text-2xl md:text-3xl lg:text-4xl mb-3'
              : 'text-3xl md:text-4xl lg:text-5xl mb-4'
          )}>
            {title}
          </h1>

          {subtitle && (
            <p className={cn(
              'text-white/90 font-light leading-relaxed',
              isInnerPage
                ? 'text-base md:text-lg mb-4'
                : 'text-lg md:text-xl mb-6'
            )}>
              {subtitle}
            </p>
          )}

          {showCTA && !isInnerPage && (
            <div className="flex flex-wrap gap-4">
              <a
                href={PHONE_LINK}
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full text-lg font-bold tracking-wide uppercase hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call {PHONE}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center px-10 py-5 bg-transparent border-2 border-amber-400 text-amber-400 rounded-full text-lg font-bold tracking-wide uppercase hover:bg-amber-400 hover:text-slate-900 transition-all duration-300"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Get Free Quote
              </Link>
            </div>
          )}

          {/* Compact CTA for inner pages */}
          {showCTA && isInnerPage && (
            <div className="flex flex-wrap gap-3">
              <a
                href={PHONE_LINK}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold hover:shadow-lg transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {PHONE}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-white/10 border border-white/30 text-white rounded-full font-bold hover:bg-white/20 transition-all"
              >
                Get Free Quote
              </Link>
            </div>
          )}

          {children}
        </div>
      </div>

      {/* Bottom Amber Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />
    </section>
  );
}
