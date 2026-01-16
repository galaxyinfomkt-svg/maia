import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/sections';
import { Breadcrumbs } from '@/components/seo';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import { SITE_NAME } from '@/lib/constants';

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: tag.toLowerCase().replace(/\s+/g, '-'),
  }));
}

function formatTagForDisplay(tag: string): string {
  return tag
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatTagForSearch(tag: string): string {
  return tag.replace(/-/g, ' ');
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const displayTag = formatTagForDisplay(tag);

  return {
    title: `${displayTag} Articles & Guides`,
    description: `Expert articles and guides about ${displayTag.toLowerCase()} for Massachusetts homeowners. Tips, comparisons, and advice from ${SITE_NAME}.`,
    keywords: [displayTag, 'Massachusetts', 'home improvement', 'guides', 'tips'],
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const searchTag = formatTagForSearch(tag);
  const posts = getPostsByTag(searchTag);
  const displayTag = formatTagForDisplay(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <>
      <Hero
        size="inner"
        title={`${displayTag} Articles`}
        subtitle={`${posts.length} article${posts.length !== 1 ? 's' : ''} about ${displayTag.toLowerCase()}`}
      />

      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: 'Blog', href: '/blog' },
              { label: displayTag },
            ]}
          />
        </div>
      </div>

      {/* Articles Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-slate-100"
              >
                <Link href={`/blog/${post.slug}`}>
                  {post.image && (
                    <div className="relative h-48">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 hover:text-amber-500 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* All Tags */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Browse All Topics</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {getAllTags().map((t) => (
                <Link
                  key={t}
                  href={`/blog/tag/${t.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    t.toLowerCase() === searchTag.toLowerCase()
                      ? 'bg-amber-400 text-slate-900'
                      : 'bg-slate-100 text-slate-700 hover:bg-amber-100 hover:text-amber-700'
                  }`}
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-amber-500 font-semibold hover:text-amber-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
