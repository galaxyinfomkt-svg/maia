import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui';
import ContactForm from '@/components/forms/ContactForm';
import { PHONE, PHONE_LINK, IMAGES } from '@/lib/constants';

interface HeroWithFormProps {
  title: React.ReactNode;
  subtitle?: string;
  badge?: string;
  backgroundImage?: string;
  className?: string;
}

export default function HeroWithForm({
  title,
  subtitle,
  badge,
  backgroundImage = IMAGES.hero,
  className,
}: HeroWithFormProps) {
  return (
    <section
      className={cn(
        'relative min-h-screen flex items-center pt-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900',
        className
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src={backgroundImage}
          alt="Professional siding and window installation services in Massachusetts - Maia Construction"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={75}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full px-4 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left: Content */}
          <div className="text-white space-y-8">
            {badge && (
              <Badge variant="amber">
                {badge}
              </Badge>
            )}

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight">
              {title}
            </h1>

            {subtitle && (
              <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed">
                {subtitle}
              </p>
            )}

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">Licensed & Insured</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">5-Star Rated</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Quality Guarantee</span>
              </div>
            </div>

            {/* Phone CTA for Mobile */}
            <div className="lg:hidden">
              <a
                href={PHONE_LINK}
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full text-lg font-bold"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Call {PHONE}
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="hidden lg:block">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
