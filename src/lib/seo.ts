import { Metadata } from 'next';
import { Service } from '@/types';
import { City } from '@/types';
import { SITE_NAME, SITE_URL, PHONE, ADDRESS, LOGO_URL } from './constants';

export function generateServiceMetadata(service: Service): Metadata {
  const title = `${service.name} Services`;
  const description = `Professional ${service.name.toLowerCase()} installation and repair in Massachusetts. ${service.shortDescription} Call ${PHONE} for a free estimate.`;

  return {
    title,
    description,
    keywords: [
      `${service.name.toLowerCase()} installation`,
      `${service.name.toLowerCase()} Massachusetts`,
      `${service.name.toLowerCase()} contractor`,
      `best ${service.name.toLowerCase()} company MA`,
    ],
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: service.image }],
    },
  };
}

export function generateCityMetadata(city: City): Metadata {
  const title = `Construction Services in ${city.name}, MA`;
  const description = `Professional siding, door, and window installation in ${city.name}, Massachusetts. Licensed contractor serving ${city.county} County. Call ${PHONE}!`;

  return {
    title,
    description,
    keywords: [
      `contractor ${city.name}`,
      `siding ${city.name} MA`,
      `windows ${city.name}`,
      `doors ${city.name}`,
      `home improvement ${city.name}`,
    ],
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/cities/${city.slug}`,
    },
  };
}

export function generateServiceCityMetadata(service: Service, city: City): Metadata {
  const title = `${service.name} Contractor in ${city.name}, MA`;
  const description = `Professional ${service.name.toLowerCase()} installation in ${city.name}, Massachusetts. Licensed contractor serving ${city.county} County. Call ${PHONE} for free estimate!`;

  return {
    title,
    description,
    keywords: [
      `${service.name.toLowerCase()} ${city.name}`,
      `${service.name.toLowerCase()} installation ${city.name} MA`,
      `${service.name.toLowerCase()} contractor ${city.name}`,
      `best ${service.name.toLowerCase()} ${city.name}`,
      `${city.zip} ${service.name.toLowerCase()}`,
    ],
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: service.image }],
    },
    alternates: {
      canonical: `${SITE_URL}/services/${service.slug}/${city.slug}`,
    },
  };
}

export function generateLocalBusinessSchema(city?: City) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: city ? `${SITE_NAME} - ${city.name}` : SITE_NAME,
    image: LOGO_URL,
    telephone: PHONE,
    url: SITE_URL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS.street,
      addressLocality: city?.name || ADDRESS.city,
      addressRegion: 'MA',
      postalCode: city?.zip || ADDRESS.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ADDRESS.lat,
      longitude: ADDRESS.lng,
    },
    areaServed: city
      ? {
          '@type': 'City',
          name: city.name,
        }
      : {
          '@type': 'State',
          name: 'Massachusetts',
        },
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '15:00',
      },
    ],
  };
}

export function generateServiceSchema(service: Service, city?: City) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name} Services${city ? ` in ${city.name}` : ''}`,
    description: service.fullDescription,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: SITE_NAME,
      telephone: PHONE,
    },
    areaServed: city
      ? {
          '@type': 'City',
          name: city.name,
        }
      : {
          '@type': 'State',
          name: 'Massachusetts',
        },
    serviceType: service.name,
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
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
