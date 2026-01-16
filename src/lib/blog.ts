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
  {
    slug: 'hiring-general-contractor-massachusetts',
    title: '10 Questions to Ask Before Hiring a General Contractor',
    description: 'Protect your investment by asking the right questions. Learn what to look for in a licensed Massachusetts contractor.',
    date: '2024-12-20',
    author: 'Maia Construction',
    image: '/images/general-contractor/home-renovation-massachusetts-2.png',
    tags: ['General Contractor', 'Home Improvement', 'Tips'],
  },
  {
    slug: 'winter-home-preparation-guide',
    title: 'Preparing Your Massachusetts Home for Winter: A Complete Checklist',
    description: 'Get your home ready for harsh New England winters. From insulation to weatherstripping, protect your home from the cold.',
    date: '2024-12-25',
    author: 'Maia Construction',
    image: '/images/general-contractor/home-renovation-massachusetts-3.jpeg',
    tags: ['Home Maintenance', 'Winter', 'Massachusetts'],
  },
  {
    slug: 'home-renovation-roi',
    title: 'Home Renovations with the Best Return on Investment in 2025',
    description: 'Discover which home improvements offer the highest ROI. From siding replacement to window upgrades, make smart investments.',
    date: '2025-01-02',
    author: 'Maia Construction',
    image: '/images/general-contractor/home-renovation-massachusetts-4.jpeg',
    tags: ['Home Value', 'ROI', 'Home Improvement'],
  },
  {
    slug: 'vinyl-vs-fiber-cement-siding',
    title: 'Vinyl vs. Fiber Cement Siding: Which Is Right for Your Home?',
    description: 'An in-depth comparison of the two most popular siding options. Compare cost, durability, maintenance, and aesthetics.',
    date: '2025-01-05',
    author: 'Maia Construction',
    image: '/images/before-after/exterior-after-worcester-ma.webp',
    tags: ['Siding', 'Home Improvement', 'Comparison'],
  },
  {
    slug: 'signs-need-new-windows',
    title: '7 Signs It\'s Time to Replace Your Windows',
    description: 'Don\'t ignore these warning signs. Learn when window replacement becomes necessary and how to spot the red flags.',
    date: '2025-01-08',
    author: 'Maia Construction',
    image: '/images/windows/window-installation-massachusetts-2.webp',
    tags: ['Windows', 'Home Maintenance', 'Tips'],
  },
  {
    slug: 'exterior-renovation-timeline',
    title: 'What to Expect: Timeline for Your Exterior Renovation Project',
    description: 'Planning an exterior renovation? Understand the typical timeline for siding, windows, and door installation projects.',
    date: '2025-01-10',
    author: 'Maia Construction',
    image: '/images/before-after/exterior-before-worcester-ma.webp',
    tags: ['Home Improvement', 'Planning', 'General Contractor'],
  },
  {
    slug: 'mass-save-rebates-windows-doors',
    title: 'Mass Save Rebates: How to Save on Windows & Doors in 2025',
    description: 'Massachusetts homeowners can save thousands with Mass Save rebates. Learn eligibility requirements, rebate amounts, and how to apply.',
    date: '2025-01-12',
    author: 'Maia Construction',
    image: '/images/windows/window-installation-massachusetts-3.webp',
    tags: ['Windows', 'Doors', 'Massachusetts', 'Energy Efficiency'],
  },
  {
    slug: 'best-siding-colors-new-england-homes',
    title: 'Best Siding Colors for New England Colonial & Cape Cod Homes',
    description: 'Choose the perfect siding color for your Massachusetts home. Color trends, timeless options, and tips for boosting curb appeal.',
    date: '2025-01-14',
    author: 'Maia Construction',
    image: '/images/before-after/siding-after-framingham-ma.webp',
    tags: ['Siding', 'Curb Appeal', 'Home Value'],
  },
  {
    slug: 'storm-doors-vs-screen-doors',
    title: 'Storm Doors vs. Screen Doors: Which Does Your Home Need?',
    description: 'Compare storm doors and screen doors for Massachusetts homes. Benefits, costs, and which option provides better protection and value.',
    date: '2025-01-15',
    author: 'Maia Construction',
    image: '/images/doors/door-installation-massachusetts-2.webp',
    tags: ['Doors', 'Home Improvement', 'Comparison'],
  },
  {
    slug: 'siding-contractors-boston-metro',
    title: 'Finding the Best Siding Contractors in Boston Metro Area',
    description: 'Tips for choosing a reliable siding contractor in Boston, Cambridge, Brookline, and surrounding areas. What to look for and red flags to avoid.',
    date: '2025-01-16',
    author: 'Maia Construction',
    image: '/images/before-after/siding-after-framingham-ma.webp',
    tags: ['Siding', 'Boston', 'Massachusetts', 'Tips'],
  },
  {
    slug: 'window-replacement-cost-massachusetts',
    title: 'Window Replacement Cost in Massachusetts: 2025 Price Guide',
    description: 'How much does window replacement cost in MA? Complete pricing guide including labor, materials, and factors that affect your total investment.',
    date: '2025-01-17',
    author: 'Maia Construction',
    image: '/images/windows/window-installation-massachusetts-4.webp',
    tags: ['Windows', 'Cost Guide', 'Massachusetts'],
  },
  {
    slug: 'james-hardie-siding-installation',
    title: 'James Hardie Fiber Cement Siding: Is It Worth the Investment?',
    description: 'Complete guide to James Hardie siding installation in Massachusetts. Costs, benefits, warranty info, and why it outperforms vinyl in New England.',
    date: '2025-01-18',
    author: 'Maia Construction',
    image: '/images/before-after/exterior-after-worcester-ma.webp',
    tags: ['Siding', 'James Hardie', 'Home Value'],
  },
  {
    slug: 'patio-door-options-guide',
    title: 'Sliding vs French vs Bi-Fold: Choosing the Right Patio Door',
    description: 'Compare patio door styles for your Massachusetts home. Pros, cons, and costs of sliding, French, and bi-fold doors for New England weather.',
    date: '2025-01-19',
    author: 'Maia Construction',
    image: '/images/doors/door-installation-massachusetts-3.webp',
    tags: ['Doors', 'Patio Doors', 'Comparison'],
  },
  {
    slug: 'home-exterior-maintenance-checklist',
    title: 'Annual Home Exterior Maintenance Checklist for Massachusetts',
    description: 'Keep your siding, windows, and doors in top condition with this seasonal maintenance guide. Prevent costly repairs with regular inspections.',
    date: '2025-01-20',
    author: 'Maia Construction',
    image: '/images/general-contractor/home-renovation-massachusetts-1.png',
    tags: ['Home Maintenance', 'Tips', 'Massachusetts'],
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
