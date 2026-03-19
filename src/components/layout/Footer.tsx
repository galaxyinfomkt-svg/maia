import Link from 'next/link';
import Image from 'next/image';
import { SITE_NAME, PHONE, PHONE_LINK, ADDRESS, BUSINESS_HOURS, SOCIAL_LINKS, HIC_NUMBER, IMAGES } from '@/lib/constants';
import { services } from '@/lib/services';
import { cities } from '@/lib/cities';

// Only nearby cities for the inline list (like RS uses ~75)
const footerCities = cities.filter(c => c.distance <= 30).slice(0, 75);

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-12 text-center lg:text-left">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src={IMAGES.logo}
                  alt={`${SITE_NAME} logo`}
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold">{SITE_NAME}</span>
            </Link>
            <p className="text-gray-400 mb-6 text-sm">
              Professional siding, window, and door installation serving Massachusetts.
              Quality craftsmanship with over a decade of experience.
            </p>
            <div className="flex justify-center lg:justify-start space-x-3">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2.16c3.2,0,3.58.01,4.85.07,1.17.05,1.97.24,2.44.41.61.24,1.05.52,1.51.98s.74.9.98,1.51c.17.47.36,1.27.41,2.44.06,1.27.07,1.65.07,4.85s-.01,3.58-.07,4.85c-.05,1.17-.24,1.97-.41,2.44a4.09,4.09,0,0,1-.98,1.51,4.09,4.09,0,0,1-1.51.98c-.47.17-1.27.36-2.44.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.44-.41a4.09,4.09,0,0,1-1.51-.98,4.09,4.09,0,0,1-.98-1.51c-.17-.47-.36-1.27-.41-2.44-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.97.41-2.44a4.09,4.09,0,0,1,.98-1.51,4.09,4.09,0,0,1,1.51-.98c.47-.17,1.27-.36,2.44-.41,1.27-.06,1.65-.07,4.85-.07M12,0C8.74,0,8.33.01,7.05.07,5.78.13,4.9.33,4.14.63A5.89,5.89,0,0,0,2,2,5.89,5.89,0,0,0,.63,4.14C.33,4.9.13,5.78.07,7.05.01,8.33,0,8.74,0,12s.01,3.67.07,4.95c.06,1.27.26,2.15.56,2.91A5.89,5.89,0,0,0,2,22a5.89,5.89,0,0,0,2.14,1.37c.76.3,1.64.5,2.91.56,1.28.06,1.69.07,4.95.07s3.67-.01,4.95-.07c1.27-.06,2.15-.26,2.91-.56A6.14,6.14,0,0,0,22,20.14c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91A5.89,5.89,0,0,0,22,2a5.89,5.89,0,0,0-2.14-1.37C19.1.33,18.22.13,16.95.07,15.67.01,15.26,0,12,0Z"/><path d="M12,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Z"/><circle cx="18.41" cy="5.59" r="1.44"/></svg>
              </a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href={SOCIAL_LINKS.google} target="_blank" rel="noopener noreferrer" aria-label="Google" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-amber-400">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {service.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link href="/services" className="text-amber-400 hover:text-amber-300 text-sm font-semibold">
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-amber-400">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</Link></li>
              <li><Link href="/massachusetts" className="text-gray-400 hover:text-white transition-colors text-sm">Service Areas</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-white transition-colors text-sm">Our Projects</Link></li>
            </ul>
          </div>

          {/* Contact & CTA */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-amber-400">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start justify-center lg:justify-start space-x-3">
                <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-400 text-sm">{ADDRESS.full}</span>
              </li>
              <li>
                <a href={PHONE_LINK} className="flex items-center justify-center lg:justify-start space-x-3 text-white hover:text-amber-400 transition-colors font-semibold">
                  <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>{PHONE}</span>
                </a>
              </li>
              <li className="pt-2">
                <p className="text-gray-400 text-sm">Mon-Sat: {BUSINESS_HOURS.weekdays}</p>
                <p className="text-gray-400 text-sm">Sun: {BUSINESS_HOURS.sunday}</p>
              </li>
            </ul>
            <div className="mt-6 flex flex-col items-center lg:items-start gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold text-sm hover:shadow-lg transition-all"
              >
                Request Free Quote →
              </Link>
              <a
                href="https://g.page/r/CaC0u5sFaCEdEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors"
              >
                ★ Leave a Google Review
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Service Areas - Inline city list like RS */}
      <div className="border-t border-white/10 py-8">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h3 className="text-base font-bold text-amber-400 mb-4">
            Service Areas – 75+ Cities Across Massachusetts
          </h3>
          <p className="text-gray-400 text-xs leading-loose">
            {footerCities.map((city, index) => (
              <span key={city.slug}>
                <Link
                  href={`/massachusetts/${city.slug}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {city.name}
                </Link>
                {index < footerCities.length - 1 && ' • '}
              </span>
            ))}
          </p>
          <div className="mt-4">
            <Link href="/massachusetts" className="text-amber-400 hover:text-amber-300 text-sm font-semibold">
              Looking for professional exterior work?{' '}
              <span className="underline">Explore our Services</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-slate-950">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {SITE_NAME}. All Rights Reserved.
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Licensed & Insured Contractor | Serving Massachusetts
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500 mt-3">
            <Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-amber-400 transition-colors">Sitemap</Link>
          </div>
          <p className="text-gray-600 text-xs mt-3">
            Developed by{' '}
            <a href="http://galaxyinfo.us/" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition-colors">
              Galaxy IT
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
