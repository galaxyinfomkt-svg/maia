import { MetadataRoute } from 'next';
import { cities } from '@/lib/cities';
import { services } from '@/lib/services';
import { getAllPosts } from '@/lib/blog';
import { detailedProjects } from '@/lib/projects';

const BASE_URL = 'https://maiaconstruction.com';

/**
 * The site runs with `trailingSlash: true`, so the canonical form of every
 * URL ends in a slash. Building sitemap entries without it made all 2,528
 * entries 308-redirect, which is what Search Console reports as
 * "Page with redirect". Everything goes through here.
 */
function url(path = ''): string {
  if (!path) return `${BASE_URL}/`;
  const clean = path.replace(/^\/+|\/+$/g, '');
  return `${BASE_URL}/${clean}/`;
}

// Cities we actually cover. Anything beyond this is noindex and is not built.
const PRIMARY_CITIES = cities.filter((city) => city.distance <= 50);

/**
 * `lastMod` used to be `new Date()`, which stamped every URL with the build
 * time on every deploy — telling Google that 2,528 pages changed each time
 * we shipped a copy tweak. Google learns to ignore a sitemap that does that.
 * These dates move only when the underlying content actually changes.
 */
const CONTENT_REVISED = new Date('2026-08-24');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: url(), lastModified: CONTENT_REVISED, changeFrequency: 'weekly', priority: 1.0 },
    { url: url('contact'), lastModified: CONTENT_REVISED, changeFrequency: 'yearly', priority: 0.9 },
    { url: url('services'), lastModified: CONTENT_REVISED, changeFrequency: 'monthly', priority: 0.9 },
    { url: url('projects'), lastModified: CONTENT_REVISED, changeFrequency: 'monthly', priority: 0.8 },
    { url: url('reviews'), lastModified: CONTENT_REVISED, changeFrequency: 'monthly', priority: 0.7 },
    { url: url('about'), lastModified: CONTENT_REVISED, changeFrequency: 'yearly', priority: 0.6 },
    { url: url('cities'), lastModified: CONTENT_REVISED, changeFrequency: 'monthly', priority: 0.6 },
    { url: url('blog'), lastModified: CONTENT_REVISED, changeFrequency: 'weekly', priority: 0.6 },
  ];

  // Money pages.
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: url(`services/${service.slug}`),
    lastModified: CONTENT_REVISED,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const cityPages: MetadataRoute.Sitemap = PRIMARY_CITIES.map((city) => ({
    url: url(`cities/${city.slug}`),
    lastModified: CONTENT_REVISED,
    changeFrequency: 'monthly',
    priority: city.distance <= 20 ? 0.7 : 0.5,
  }));

  const serviceCityPages: MetadataRoute.Sitemap = [];
  for (const service of services) {
    for (const city of PRIMARY_CITIES) {
      serviceCityPages.push({
        url: url(`services/${service.slug}/${city.slug}`),
        lastModified: CONTENT_REVISED,
        changeFrequency: 'monthly',
        priority: city.distance <= 20 ? 0.7 : 0.5,
      });
    }
  }

  // Real jobs with real photography — the strongest pages on the site.
  const projectPages: MetadataRoute.Sitemap = detailedProjects.map((project) => ({
    url: url(`projects/${project.slug}`),
    lastModified: CONTENT_REVISED,
    changeFrequency: 'yearly',
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: url(`blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  // Blog tag pages are navigation, not landing pages. They are noindex and
  // deliberately absent here.

  return [
    ...staticPages,
    ...servicePages,
    ...projectPages,
    ...cityPages,
    ...serviceCityPages,
    ...blogPages,
  ];
}
