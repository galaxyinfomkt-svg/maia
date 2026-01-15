import fs from 'fs';
import path from 'path';
import { BlogPostMeta } from '@/types';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

// Static blog posts data (since MDX dynamic imports can be complex)
export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'choosing-right-siding-massachusetts',
    title: 'How to Choose the Right Siding for Your Massachusetts Home',
    description: 'A comprehensive guide to selecting the best siding material for New England weather conditions. Compare vinyl, fiber cement, and wood options.',
    date: '2024-12-15',
    author: 'Maia Construction',
    image: '/images/before-after/siding-after-framingham-ma.webp',
    tags: ['Siding', 'Home Improvement', 'Massachusetts'],
  },
  {
    slug: 'energy-efficient-windows-guide',
    title: 'Energy-Efficient Windows: Complete Homeowner Guide 2024',
    description: 'Learn how energy-efficient windows can reduce your heating bills by up to 30%. Covers U-factor, SHGC ratings, and best brands.',
    date: '2024-12-10',
    author: 'Maia Construction',
    image: '/images/windows/window-installation-massachusetts-1.webp',
    tags: ['Windows', 'Energy Efficiency', 'Home Improvement'],
  },
  {
    slug: 'front-door-curb-appeal',
    title: 'Transform Your Home\'s Curb Appeal with the Right Front Door',
    description: 'Your front door makes the first impression. Discover how to choose a door that enhances your home\'s style and security.',
    date: '2024-12-05',
    author: 'Maia Construction',
    image: '/images/doors/door-installation-massachusetts-1.webp',
    tags: ['Doors', 'Curb Appeal', 'Home Value'],
  },
];

export function getAllPosts(): BlogPostMeta[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPostMeta | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRecentPosts(limit = 3): BlogPostMeta[] {
  return getAllPosts().slice(0, limit);
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  return blogPosts.filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
}
