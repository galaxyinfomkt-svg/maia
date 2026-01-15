import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui';
import { PHONE, PHONE_LINK } from '@/lib/constants';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  badge?: string;
  showCTA?: boolean;
  children?: React.ReactNode;
  className?: string;
  size?: 'default' | 'large' | 'small';
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
  return (
    <section
      className={cn(
        'relative overflow-hidden flex items-center',
        size === 'large' && 'min-h-screen pt-24',
        size === 'default' && 'min-h-[70vh] pt-24',
        size === 'small' && 'min-h-[50vh] pt-24',
        className
      )}
    >
      {/* Background Image */}
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
          quality={85}
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          {badge && (
            <Badge variant="amber" className="mb-6">
              {badge}
            </Badge>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-8">
              {subtitle}
            </p>
          )}

          {showCTA && (
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

          {children}
        </div>
      </div>

      {/* Bottom Amber Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500" />
    </section>
  );
}
