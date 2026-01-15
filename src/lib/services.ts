import { Service } from '@/types';
import { IMAGES } from './constants';

export const services: Service[] = [
  {
    id: 'siding',
    name: 'Siding',
    slug: 'siding',
    icon: '🏠',
    shortDescription: 'Professional siding installation and repair for lasting protection.',
    fullDescription: 'Transform your home with premium siding installation from Maia Construction. We offer vinyl, fiber cement, wood, and engineered wood siding options designed to withstand harsh New England weather while enhancing your home\'s curb appeal. Our expert installers ensure proper moisture barriers, insulation, and flawless finishing for decades of protection.',
    image: IMAGES.siding,
    features: [
      'Vinyl siding installation',
      'Fiber cement siding (James Hardie)',
      'Wood siding repair and restoration',
      'Engineered wood siding',
      'Insulated siding options',
      'Complete siding removal and replacement',
      'Trim and soffit work',
      'Moisture barrier installation',
    ],
    benefits: [
      'Improved curb appeal and home value',
      'Enhanced energy efficiency',
      'Low maintenance requirements',
      'Superior weather protection',
      'Wide variety of colors and styles',
      '25-50 year manufacturer warranties',
    ],
  },
  {
    id: 'windows',
    name: 'Windows',
    slug: 'windows',
    icon: '🪟',
    shortDescription: 'Energy-efficient window installation to reduce heating costs.',
    fullDescription: 'Upgrade your home with modern, energy-efficient windows from Maia Construction. Our window installation services include double and triple-pane options, low-E glass coatings, and proper insulation to dramatically reduce your heating and cooling costs. We install all window styles including double-hung, casement, bay, and picture windows.',
    image: IMAGES.windows,
    features: [
      'Double and triple-pane windows',
      'Low-E glass coatings',
      'Vinyl, wood, and fiberglass frames',
      'Double-hung window installation',
      'Casement window installation',
      'Bay and bow windows',
      'Picture and specialty windows',
      'Full window frame replacement',
    ],
    benefits: [
      'Up to 30% reduction in energy bills',
      'Improved home comfort',
      'Reduced outside noise',
      'Enhanced security features',
      'UV protection for furniture',
      'Increased home value',
    ],
  },
  {
    id: 'doors',
    name: 'Doors',
    slug: 'doors',
    icon: '🚪',
    shortDescription: 'Custom door installation for enhanced security and style.',
    fullDescription: 'Enhance your home\'s security, energy efficiency, and curb appeal with professional door installation from Maia Construction. We install entry doors, storm doors, patio doors, and interior doors in a variety of materials including fiberglass, steel, and wood. Every installation includes proper weatherstripping and hardware.',
    image: IMAGES.hero,
    features: [
      'Entry door installation',
      'Storm door installation',
      'Sliding patio doors',
      'French door installation',
      'Steel security doors',
      'Fiberglass entry doors',
      'Wood door installation',
      'Smart lock integration',
    ],
    benefits: [
      'Enhanced home security',
      'Improved energy efficiency',
      'Increased curb appeal',
      'Better weather protection',
      'Smart home compatibility',
      'Manufacturer warranties',
    ],
  },
  {
    id: 'general-contractor',
    name: 'General Contractor',
    slug: 'general-contractor',
    icon: '🔨',
    shortDescription: 'Full-service construction and renovation for your entire project.',
    fullDescription: 'Maia Construction provides comprehensive general contracting services for home renovations, additions, and remodeling projects throughout Massachusetts. From initial planning to final inspection, we manage every aspect of your construction project with licensed professionals, quality materials, and clear communication.',
    image: IMAGES.hero,
    features: [
      'Home additions',
      'Kitchen remodeling',
      'Bathroom renovations',
      'Basement finishing',
      'Deck and patio construction',
      'Structural repairs',
      'Permit acquisition',
      'Project management',
    ],
    benefits: [
      'Single point of contact',
      'Licensed and insured contractors',
      'Quality workmanship guarantee',
      'On-time project completion',
      'Transparent pricing',
      'Full project coordination',
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map(service => service.slug);
}
