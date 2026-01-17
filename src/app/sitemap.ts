import { MetadataRoute } from 'next';
import { cities } from '@/lib/cities';
import { services } from '@/lib/services';
import { getAllPosts, getAllTags } from '@/lib/blog';

const BASE_URL = 'https://maiaconstruction.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Static pages - highest priority for main conversion pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/cities`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // Service pages - very high priority (money pages)
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.95,
  }));

  // City pages - high priority for local SEO
  const cityPages: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${BASE_URL}/cities/${city.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Service + City combination pages (main local SEO pages)
  const serviceCityPages: MetadataRoute.Sitemap = [];
  for (const service of services) {
    for (const city of cities) {
      serviceCityPages.push({
        url: `${BASE_URL}/services/${service.slug}/${city.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    }
  }

  // Blog posts - good for informational queries
  const blogPosts = getAllPosts();
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Blog tag pages - for topical clusters
  const tags = getAllTags();
  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${BASE_URL}/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...cityPages,
    ...serviceCityPages,
    ...blogPages,
    ...tagPages,
  ];
}
