import { Service } from '@/types';
import { IMAGES } from './constants';

export const services: Service[] = [
  {
    id: 'siding',
    name: 'Siding',
    slug: 'siding',
    icon: '🏠',
    shortDescription: 'Premium vinyl & fiber cement siding built for harsh New England winters.',
    fullDescription: `Transform your Massachusetts home with premium siding installation from Maia Construction. Our expert team specializes in vinyl siding, James Hardie fiber cement, wood, and engineered wood options — all designed to withstand brutal New England winters, coastal salt air, and humid summers.

We don't just install siding — we protect your home. Every installation includes professional moisture barriers, enhanced insulation, and meticulous finishing work that prevents water damage, mold, and energy loss. Our siding solutions can reduce your heating bills by up to 20% while dramatically boosting your home's curb appeal and resale value.

Choose from endless color options, wood-grain textures, and architectural styles. Whether you're in Boston, Worcester, or anywhere in Massachusetts, our certified installers deliver flawless results backed by 25-50 year manufacturer warranties.`,
    image: IMAGES.siding,
    features: [
      'Vinyl siding installation (CertainTeed, Alside)',
      'James Hardie fiber cement siding',
      'Insulated siding for maximum energy savings',
      'Wood & engineered wood siding',
      'Complete tear-off and replacement',
      'Trim, soffit & fascia work',
      'Housewrap & moisture barrier installation',
      'Color matching and custom finishes',
    ],
    benefits: [
      'Up to 20% reduction in energy costs',
      'Withstands -20°F to 100°F temperatures',
      'Virtually maintenance-free for decades',
      'Increases home value by 5-10%',
      'Lifetime fade protection',
      '25-50 year manufacturer warranties',
    ],
  },
  {
    id: 'windows',
    name: 'Windows',
    slug: 'windows',
    icon: '🪟',
    shortDescription: 'ENERGY STAR certified windows that slash heating costs up to 30%.',
    fullDescription: `Stop losing money through drafty windows. Massachusetts homeowners lose up to 30% of their heating and cooling costs through inefficient windows. Maia Construction installs ENERGY STAR certified replacement windows that pay for themselves through energy savings.

Our window installation services feature premium double and triple-pane glass, argon gas fill, Low-E coatings, and warm-edge spacers — the gold standard for New England's extreme temperature swings. We install all styles including double-hung, casement, bay, bow, and picture windows in vinyl, fiberglass, and wood frames.

Every installation includes proper flashing, insulation, and weatherstripping to eliminate drafts and condensation. Our windows also reduce outside noise by up to 50%, protect your furniture from UV damage, and enhance your home's security with multi-point locking systems.`,
    image: IMAGES.windows,
    features: [
      'Double & triple-pane ENERGY STAR windows',
      'Low-E glass with argon/krypton fill',
      'Vinyl, fiberglass & wood frames',
      'Double-hung & casement windows',
      'Bay, bow & picture windows',
      'Basement egress windows',
      'Full-frame replacement',
      'Lifetime glass breakage warranty',
    ],
    benefits: [
      'Save up to 30% on heating/cooling',
      'Eliminate drafts and cold spots',
      'Reduce outside noise by 50%',
      'Block 99% of UV rays',
      'Enhanced security features',
      'Lifetime manufacturer warranty',
    ],
  },
  {
    id: 'doors',
    name: 'Doors',
    slug: 'doors',
    icon: '🚪',
    shortDescription: 'Secure, energy-efficient doors that boost curb appeal and home value.',
    fullDescription: `Your front door makes the first impression — and it's also your home's primary security barrier. Maia Construction installs premium entry doors, storm doors, and patio doors that combine stunning aesthetics with uncompromising security and energy efficiency.

We offer fiberglass, steel, and wood entry doors from top manufacturers like Therma-Tru, ProVia, and Andersen. Our fiberglass doors won't crack, warp, or rot like wood, while our steel doors provide maximum security with a 5x stronger frame than standard models.

Every door installation includes proper shimming, weatherstripping, and threshold sealing for a draft-free fit. We also install smart locks, decorative glass inserts, sidelights, and transoms to create a custom entrance that reflects your style and increases your home's value.`,
    image: IMAGES.doors,
    features: [
      'Fiberglass entry doors (Therma-Tru, ProVia)',
      'Steel security doors',
      'Sliding & French patio doors',
      'Storm doors with retractable screens',
      'Smart lock installation',
      'Decorative glass & sidelights',
      'ADA-compliant thresholds',
      'Multi-point locking systems',
    ],
    benefits: [
      '90%+ ROI at resale',
      'R-value up to 7.0 for energy savings',
      '20-year warranties on materials',
      'Enhanced home security',
      'Smart home integration',
      'Customizable styles & colors',
    ],
  },
  {
    id: 'general-contractor',
    name: 'General Contractor',
    slug: 'general-contractor',
    icon: '🔨',
    shortDescription: 'Full-service renovations managed by MA licensed professionals.',
    fullDescription: `From concept to completion, Maia Construction provides comprehensive general contracting services for Massachusetts homeowners. Our MA HIC licensed team manages every aspect of your renovation — permits, subcontractors, inspections, and quality control — so you can focus on your daily life.

We specialize in exterior renovations that transform curb appeal and protect your investment. Complete siding replacements, window and door packages, deck construction, and structural repairs are our core expertise. We also handle interior projects including kitchen remodels, bathroom renovations, and basement finishing.

What sets us apart? Transparent fixed-price contracts, detailed project timelines, and a dedicated project manager who keeps you informed every step of the way. We coordinate all trades, pull all permits, and stand behind our work with a 5-year workmanship warranty.`,
    image: IMAGES.generalContractor,
    features: [
      'Complete exterior renovations',
      'Kitchen & bathroom remodeling',
      'Home additions & expansions',
      'Deck & patio construction',
      'Basement finishing',
      'Structural repairs & reinforcement',
      'Permit acquisition & inspections',
      'Full project management',
    ],
    benefits: [
      'Single point of contact',
      'MA HIC licensed & insured',
      'Transparent fixed-price contracts',
      'Detailed project timelines',
      '5-year workmanship warranty',
      '100% satisfaction guarantee',
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map(service => service.slug);
}
