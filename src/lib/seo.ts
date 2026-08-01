import { Metadata } from 'next';
import { Service } from '@/types';
import { City } from '@/types';
import { SITE_NAME, SITE_URL, PHONE, ADDRESS, LOGO_URL } from './constants';

export function generateServiceMetadata(service: Service): Metadata {
  const title = `Professional ${service.name} Services Massachusetts | #1 Rated ${service.name} Contractor | Maia Construction`;
  const description = `#1 ${service.name.toLowerCase()} contractor in Massachusetts ★5.0. 19 reviews. ${service.shortDescription} Licensed HIC #204634 & insured. FREE estimates. Call ${PHONE}`;

  return {
    title,
    description,
    keywords: [
      `${service.name.toLowerCase()} installation Massachusetts`,
      `${service.name.toLowerCase()} contractor MA`,
      `best ${service.name.toLowerCase()} company Massachusetts`,
      `${service.name.toLowerCase()} near me MA`,
    ],
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [{ url: service.image }],
    },
  };
}

export function generateCityMetadata(city: City): Metadata {
  const title = `Siding & Window Contractor ${city.name} MA | Expert Installation | Call Now | Maia Construction`;
  const description = `#1 rated contractor in ${city.name}, MA ★5.0. Expert siding, windows & doors. 500+ projects in ${city.county} County. Licensed HIC #204634. FREE estimate. Call ${PHONE}`;

  return {
    title,
    description,
    keywords: [
      `contractor ${city.name} MA`,
      `siding ${city.name} MA`,
      `windows ${city.name} MA`,
      `doors ${city.name} MA`,
      `home improvement ${city.name}`,
      `best contractor ${city.name}`,
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
  const title = `${service.name} ${city.name} MA | 5-Star Rated | Free Estimate`;
  const description = `#1 ${service.name.toLowerCase()} contractor in ${city.name}, MA. 5.0 stars, 500+ projects in ${city.county} County. Licensed HIC #204634. FREE estimate: ${PHONE}`;

  return {
    title,
    description,
    keywords: [
      `${service.name.toLowerCase()} ${city.name}`,
      `${service.name.toLowerCase()} installation ${city.name} MA`,
      `${service.name.toLowerCase()} contractor ${city.name}`,
      `best ${service.name.toLowerCase()} ${city.name}`,
      `${city.zip} ${service.name.toLowerCase()}`,
      `${service.name.toLowerCase()} company ${city.name} MA`,
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
      ...(ADDRESS.street ? { streetAddress: ADDRESS.street } : {}),
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      reviewCount: '19',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '19:00',
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
