export const SITE_NAME = 'Maia Construction';
export const SITE_URL = 'https://maiaconstruction.com';
export const PHONE = '(508) 859-9880';
export const PHONE_LINK = 'tel:+15088599880';
export const EMAIL = 'contact@maiaconstruction.com';
export const EMAIL_LINK = 'mailto:contact@maiaconstruction.com';
export const HIC_NUMBER = '204634'; // MA Home Improvement Contractor License

export const ADDRESS = {
  street: '13 Stoneybrook Rd',
  city: 'Charlton',
  state: 'MA',
  zip: '01507',
  full: '13 Stoneybrook Rd, Charlton, MA 01507',
  lat: 42.1348,
  lng: -71.9698,
};

// Service-specific photos
export const SERVICE_PHOTOS: Record<string, string> = {
  siding: '/images/hero/hero-68bb92a147f24d34a4cb2441.webp',
  windows: '/images/hero/hero-68bb92a11ff6ea5ace0517d7.webp',
  doors: '/images/hero/hero-68bb918e47f24da26ecb147e.webp',
  'general-contractor': '/images/hero/hero-6834e26266829d658f8eab6c.webp',
};

export const REAL_PHOTOS = [
  '/images/hero/hero-68bb92a147f24d34a4cb2441.webp',
  '/images/hero/hero-68bb94791ff6ea156705431b.webp',
  '/images/hero/hero-68bb947947f24d6531cb52a6.webp',
  '/images/hero/hero-68bb9479b200283b40dccf5b.webp',
  '/images/hero/hero-68bb92a147f24d8291cb2442.webp',
  '/images/hero/hero-68bb918ec535bec22d71d549.webp',
  '/images/hero/hero-68bb918e47f24da26ecb147e.webp',
  '/images/hero/hero-68bb9169b20028c4b5dc9030.webp',
  '/images/hero/hero-68a38d825313006ec55c2a52.webp',
  '/images/hero/hero-6834e26266829d658f8eab6c.webp',
];

export const IMAGES = {
  // Hero e imagens principais
  hero: '/images/hero/hero-68bb92a147f24d34a4cb2441.webp',
  logo: '/images/logo-200.webp',
  logoLarge: '/images/logo-400.webp',
  logoHeader: '/images/logo-112.webp',
  logoPng: '/images/logo-200.png',

  // Siding
  siding: '/images/before-after/exterior-before-worcester-ma.webp',
  sidingBefore: '/images/before-after/siding-before-framingham-ma.webp',
  sidingAfter: '/images/before-after/exterior-after-worcester-ma.webp',

  // Windows
  windows: '/images/windows/window-installation-massachusetts-1.webp',
  windows2: '/images/windows/window-installation-massachusetts-2.webp',
  windows3: '/images/windows/window-installation-massachusetts-3.webp',
  windows4: '/images/windows/window-installation-massachusetts-4.webp',

  // Doors
  doors: '/images/doors/door-installation-massachusetts-1.webp',
  doors2: '/images/doors/door-installation-massachusetts-2.webp',
  doors3: '/images/doors/door-installation-massachusetts-3.webp',
  doors4: '/images/doors/door-installation-massachusetts-4.webp',

  // General Contractor
  generalContractor: '/images/general-contractor/home-renovation-massachusetts-1.webp',
  generalContractor2: '/images/general-contractor/home-renovation-massachusetts-2.webp',
  generalContractor3: '/images/general-contractor/home-renovation-massachusetts-3.webp',
  generalContractor4: '/images/general-contractor/home-renovation-massachusetts-4.webp',

  // Before/After
  exteriorBefore: '/images/before-after/exterior-before-worcester-ma.webp',
  exteriorAfter: '/images/before-after/exterior-after-worcester-ma.webp',
};

export const LOGO_URL = IMAGES.logoPng;

// Social preview card. The logo is 200x200 — below what Facebook and X need
// for a large card, and it was being declared as 400x400. This is a real
// finished job, cropped to the 1200x630 both platforms actually want.
export const OG_IMAGE = '/images/og-maia-construction.webp';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/maiaconstruction/',
  instagram: 'https://www.instagram.com/maia.construction',
  youtube: 'https://www.youtube.com/@maiaconstruction581',
  google: 'https://share.google/bvgv6CUO3FUPCMGB2',
};

export const BUSINESS_HOURS = {
  weekdays: '7:00 AM - 7:00 PM',
  saturday: '7:00 AM - 7:00 PM',
  sunday: 'Closed',
};
