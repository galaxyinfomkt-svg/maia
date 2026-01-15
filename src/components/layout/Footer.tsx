import Link from 'next/link';
import Image from 'next/image';
import { LOGO_URL, SITE_NAME, PHONE, PHONE_LINK, ADDRESS, BUSINESS_HOURS, SOCIAL_LINKS } from '@/lib/constants';
import { services } from '@/lib/services';
import { cities } from '@/lib/cities';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

// Get featured cities (closest ones)
const featuredCities = cities.slice(0, 12);

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        {/* Top Section - Logo & Contact */}
        <div className="grid lg:grid-cols-4 gap-8 pb-12 mb-12 border-b border-white/10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src={LOGO_URL}
                  alt={SITE_NAME}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold">{SITE_NAME}</span>
            </Link>
            <p className="text-gray-400 mb-6 text-sm">
              Professional siding, door, and window installation serving Massachusetts.
              Quality craftsmanship with over a decade of experience.
            </p>
            <div className="flex space-x-3">
              <a href={SOCIAL_LINKS.facebook} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>
              </a>
              <a href={SOCIAL_LINKS.instagram} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12,2.16c3.2,0,3.58.01,4.85.07,1.17.05,1.97.24,2.44.41.61.24,1.05.52,1.51.98s.74.9.98,1.51c.17.47.36,1.27.41,2.44.06,1.27.07,1.65.07,4.85s-.01,3.58-.07,4.85c-.05,1.17-.24,1.97-.41,2.44a4.09,4.09,0,0,1-.98,1.51,4.09,4.09,0,0,1-1.51.98c-.47.17-1.27.36-2.44.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.97-.24-2.44-.41a4.09,4.09,0,0,1-1.51-.98,4.09,4.09,0,0,1-.98-1.51c-.17-.47-.36-1.27-.41-2.44-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.97.41-2.44a4.09,4.09,0,0,1,.98-1.51,4.09,4.09,0,0,1,1.51-.98c.47-.17,1.27-.36,2.44-.41,1.27-.06,1.65-.07,4.85-.07M12,0C8.74,0,8.33.01,7.05.07,5.78.13,4.9.33,4.14.63A5.89,5.89,0,0,0,2,2,5.89,5.89,0,0,0,.63,4.14C.33,4.9.13,5.78.07,7.05.01,8.33,0,8.74,0,12s.01,3.67.07,4.95c.06,1.27.26,2.15.56,2.91A5.89,5.89,0,0,0,2,22a5.89,5.89,0,0,0,2.14,1.37c.76.3,1.64.5,2.91.56,1.28.06,1.69.07,4.95.07s3.67-.01,4.95-.07c1.27-.06,2.15-.26,2.91-.56A6.14,6.14,0,0,0,22,20.14c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91A5.89,5.89,0,0,0,22,2a5.89,5.89,0,0,0-2.14-1.37C19.1.33,18.22.13,16.95.07,15.67.01,15.26,0,12,0Z"/><path d="M12,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Z"/><circle cx="18.41" cy="5.59" r="1.44"/></svg>
              </a>
              <a href={SOCIAL_LINKS.linkedin} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45,20.45H16.89V14.88c0-1.33,0-3-1.85-3s-2.13,1.44-2.13,2.93v5.64H9.35V9h3.41v1.56h.05a3.74,3.74,0,0,1,3.37-1.85c3.6,0,4.27,2.37,4.27,5.46ZM5.34,7.43a2.07,2.07,0,1,1,2.07-2.07A2.07,2.07,0,0,1,5.34,7.43ZM7.12,20.45H3.56V9H7.12ZM22.23,0H1.77A1.75,1.75,0,0,0,0,1.73V22.27A1.75,1.75,0,0,0,1.77,24H22.23A1.75,1.75,0,0,0,24,22.27V1.73A1.75,1.75,0,0,0,22.23,0Z"/></svg>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 text-amber-400">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-400 text-sm">{ADDRESS.full}</span>
              </li>
              <li>
                <a href={PHONE_LINK} className="flex items-center space-x-3 text-white hover:text-amber-400 transition-colors font-semibold">
                  <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>{PHONE}</span>
                </a>
              </li>
              <li className="pt-4">
                <h4 className="font-semibold mb-2 text-sm">Business Hours</h4>
                <p className="text-gray-400 text-sm">Mon-Fri: {BUSINESS_HOURS.weekdays}</p>
                <p className="text-gray-400 text-sm">Sat: {BUSINESS_HOURS.saturday}</p>
                <p className="text-gray-400 text-sm">Sun: {BUSINESS_HOURS.sunday}</p>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 text-amber-400">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-amber-400 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 text-amber-400">Get a Free Quote</h3>
            <p className="text-gray-400 text-sm mb-4">
              Ready to transform your home? Contact us today for a free estimate.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold text-sm hover:shadow-lg transition-all"
            >
              Request Quote
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Services & Cities Section - Aligned in Grid */}
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Services - Each service with its cities */}
          {services.map((service) => (
            <div key={service.slug}>
              <h3 className="text-base font-bold mb-5 text-amber-400 flex items-center">
                <span className="mr-2 text-lg">{service.icon}</span>
                {service.name}
              </h3>
              <ul className="space-y-3">
                {featuredCities.slice(0, 8).map((city) => (
                  <li key={`${service.slug}-${city.slug}`}>
                    <Link
                      href={`/services/${service.slug}/${city.slug}`}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {city.name}
                    </Link>
                  </li>
                ))}
                <li className="pt-1">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-semibold inline-flex items-center"
                  >
                    View All
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          ))}

          {/* All Cities Column */}
          <div>
            <h3 className="text-base font-bold mb-5 text-amber-400 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              More Cities
            </h3>
            <ul className="space-y-3">
              {cities.slice(12, 20).map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/cities/${city.slug}`}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/cities"
                  className="text-amber-400 hover:text-amber-300 transition-colors text-sm font-semibold inline-flex items-center"
                >
                  100+ Cities
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-slate-950">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} {SITE_NAME}. All rights reserved. Licensed & Insured.
            </p>
            <div className="flex space-x-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
              <Link href="/sitemap.xml" className="hover:text-amber-400 transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
