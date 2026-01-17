import { SITE_NAME, SITE_URL, PHONE, ADDRESS, LOGO_URL, SOCIAL_LINKS, HIC_NUMBER } from '@/lib/constants';

// Enhanced Organization Schema with all signals
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: 'Maia Construction LLC',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL,
    width: 400,
    height: 400,
  },
  image: LOGO_URL,
  telephone: PHONE,
  email: 'contact@maiaconstruction.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.state,
    postalCode: ADDRESS.zip,
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: ADDRESS.lat,
    longitude: ADDRESS.lng,
  },
  areaServed: {
    '@type': 'State',
    name: 'Massachusetts',
    containsPlace: [
      { '@type': 'City', name: 'Boston' },
      { '@type': 'City', name: 'Worcester' },
      { '@type': 'City', name: 'Cambridge' },
      { '@type': 'City', name: 'Framingham' },
      { '@type': 'City', name: 'Marlborough' },
    ],
  },
  priceRange: '$$',
  currenciesAccepted: 'USD',
  paymentAccepted: 'Cash, Credit Card, Check, Financing',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '07:00',
      closes: '19:00',
    },
  ],
  sameAs: [
    SOCIAL_LINKS.facebook,
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.youtube,
  ],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'license',
    name: `Massachusetts Home Improvement Contractor License #${HIC_NUMBER}`,
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '47',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Michael R.',
      },
      reviewBody: 'Excellent work on our siding replacement. Professional team, fair pricing, and outstanding results. Highly recommend!',
    },
    {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: 'Sarah K.',
      },
      reviewBody: 'New windows made a huge difference in our energy bills. The installation was quick and clean. Very satisfied!',
    },
  ],
};

// Service Schema Generator
export function createServiceSchema(service: {
  name: string;
  description: string;
  image: string;
  slug: string;
  priceRange?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/services/${service.slug}/#service`,
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
    areaServed: {
      '@type': 'State',
      name: 'Massachusetts',
    },
    image: service.image.startsWith('http') ? service.image : `${SITE_URL}${service.image}`,
    url: `${SITE_URL}/services/${service.slug}`,
    priceRange: service.priceRange || '$$',
    serviceType: service.name,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} Services`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
          },
        },
      ],
    },
  };
}

// HowTo Schema Generator for blog guides
export function createHowToSchema(howTo: {
  name: string;
  description: string;
  image?: string;
  totalTime?: string;
  estimatedCost?: { min: number; max: number; currency?: string };
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    image: howTo.image,
    totalTime: howTo.totalTime,
    estimatedCost: howTo.estimatedCost
      ? {
          '@type': 'MonetaryAmount',
          currency: howTo.estimatedCost.currency || 'USD',
          minValue: howTo.estimatedCost.min,
          maxValue: howTo.estimatedCost.max,
        }
      : undefined,
    step: howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
    })),
    tool: [
      { '@type': 'HowToTool', name: 'Professional installation tools' },
    ],
    supply: [
      { '@type': 'HowToSupply', name: 'Siding/Windows/Doors materials' },
    ],
  };
}

// Article Schema for blog posts
export function createArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  slug: string;
  tags?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}/blog/${article.slug}/#article`,
    headline: article.title,
    description: article.description,
    image: article.image.startsWith('http') ? article.image : `${SITE_URL}${article.image}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${article.slug}`,
    },
    keywords: article.tags?.join(', '),
    articleSection: 'Home Improvement',
    inLanguage: 'en-US',
  };
}

// FAQ Schema Generator
export function createFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Local Business Schema for city pages
export function createLocalBusinessSchema(city: {
  name: string;
  slug: string;
  service?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: `${SITE_NAME} - ${city.name}`,
    description: `Professional ${city.service || 'siding, windows, and doors'} services in ${city.name}, Massachusetts. Licensed contractor serving the ${city.name} area.`,
    url: city.service
      ? `${SITE_URL}/services/${city.service}/${city.slug}`
      : `${SITE_URL}/cities/${city.slug}`,
    telephone: PHONE,
    address: {
      '@type': 'PostalAddress',
      addressLocality: city.name,
      addressRegion: 'MA',
      addressCountry: 'US',
    },
    areaServed: {
      '@type': 'City',
      name: city.name,
      containedInPlace: {
        '@type': 'State',
        name: 'Massachusetts',
      },
    },
    parentOrganization: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '47',
    },
  };
}

// Video Schema for video gallery
export function createVideoSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  embedUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    duration: video.duration,
    embedUrl: video.embedUrl,
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
    },
  };
}

// Breadcrumb Schema Generator
export function createBreadcrumbSchema(items: Array<{ name: string; url?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${SITE_URL}${item.url}` : undefined,
    })),
  };
}

// Product Schema for specific service offerings
export function createProductSchema(product: {
  name: string;
  description: string;
  image: string;
  brand?: string;
  priceRange: { min: number; max: number };
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: product.brand
      ? {
          '@type': 'Brand',
          name: product.brand,
        }
      : undefined,
    category: product.category,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: product.priceRange.min,
      highPrice: product.priceRange.max,
      offerCount: '1',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '47',
    },
  };
}
