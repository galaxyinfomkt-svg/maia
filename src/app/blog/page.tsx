import { Metadata } from 'next';
import { Hero } from '@/components/sections';
import { BlogCard } from '@/components/cards';
import { JsonLd } from '@/components/seo';
import { getAllPosts, getAllTags } from '@/lib/blog';
import { SITE_NAME, IMAGES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Home improvement tips, guides, and advice from ${SITE_NAME}. Learn about siding, windows, doors, and more.`,
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Blog`,
    description: 'Home improvement tips, guides, and expert advice.',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    })),
  };

  return (
    <>
      <JsonLd data={blogSchema} />

      <Hero
        title="Home Improvement Blog"
        subtitle="Tips, guides, and expert advice for Massachusetts homeowners"
        badge="Resources"
        showCTA={false}
        size="inner"
      />

      {/* Tags */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-slate-700">Topics:</span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:border-amber-400 hover:text-amber-500 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No blog posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Get the latest home improvement tips and special offers delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full border-0 focus:ring-2 focus:ring-amber-400"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold hover:shadow-xl transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
