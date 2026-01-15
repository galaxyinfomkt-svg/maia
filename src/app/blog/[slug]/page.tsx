import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/sections';
import { JsonLd, Breadcrumbs } from '@/components/seo';
import { getAllPosts, getPostBySlug, getRecentPosts } from '@/lib/blog';
import { SITE_NAME, PHONE, PHONE_LINK } from '@/lib/constants';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      images: post.image ? [{ url: post.image }] : [],
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  };
}

// Blog post content - in a real app, this would come from MDX files
const blogContent: Record<string, React.ReactNode> = {
  'choosing-right-siding-massachusetts': (
    <>
      <p className="lead">
        Choosing the right siding for your Massachusetts home is one of the most important decisions
        you&apos;ll make as a homeowner. The siding you select needs to withstand harsh New England winters,
        humid summers, and everything in between while keeping your home beautiful and energy-efficient.
      </p>

      <h2>Understanding Massachusetts Climate Challenges</h2>
      <p>
        Massachusetts homeowners face unique weather challenges that directly impact siding choices.
        From heavy snowfall and ice storms in winter to humid conditions in summer, your siding
        must be able to handle it all.
      </p>
      <ul>
        <li><strong>Temperature extremes:</strong> From -10°F to 95°F throughout the year</li>
        <li><strong>Moisture:</strong> Average 47 inches of rain and 45 inches of snow annually</li>
        <li><strong>Salt air:</strong> Coastal areas face additional corrosion concerns</li>
        <li><strong>UV exposure:</strong> Fading and material degradation over time</li>
      </ul>

      <h2>Popular Siding Options for Massachusetts Homes</h2>

      <h3>1. Vinyl Siding</h3>
      <p>
        Vinyl siding remains the most popular choice for Massachusetts homeowners, and for good reason.
        It offers excellent value, durability, and a wide range of colors and styles.
      </p>
      <p><strong>Pros:</strong></p>
      <ul>
        <li>Low maintenance - no painting required</li>
        <li>Resistant to moisture and insects</li>
        <li>Affordable compared to other options</li>
        <li>Wide variety of colors and styles</li>
      </ul>
      <p><strong>Cons:</strong></p>
      <ul>
        <li>Can crack in extreme cold</li>
        <li>May fade over time</li>
        <li>Less eco-friendly than some alternatives</li>
      </ul>

      <h3>2. Fiber Cement Siding (James Hardie)</h3>
      <p>
        Fiber cement siding has become increasingly popular due to its durability and authentic appearance.
        It can mimic the look of wood without the maintenance concerns.
      </p>
      <p><strong>Pros:</strong></p>
      <ul>
        <li>Extremely durable - lasts 50+ years</li>
        <li>Fire resistant</li>
        <li>Won&apos;t rot, warp, or attract pests</li>
        <li>Looks like real wood</li>
      </ul>
      <p><strong>Cons:</strong></p>
      <ul>
        <li>Higher initial cost</li>
        <li>Heavier - may require structural reinforcement</li>
        <li>Requires repainting every 10-15 years</li>
      </ul>

      <h3>3. Wood Siding</h3>
      <p>
        For homeowners wanting an authentic, natural look, wood siding remains a timeless choice.
        It&apos;s particularly popular for historic homes and properties seeking a traditional New England aesthetic.
      </p>

      <h2>Making Your Decision</h2>
      <p>
        When choosing siding for your Massachusetts home, consider these factors:
      </p>
      <ol>
        <li><strong>Budget:</strong> Initial cost vs. long-term maintenance</li>
        <li><strong>Style:</strong> What complements your home&apos;s architecture</li>
        <li><strong>Location:</strong> Coastal areas may need more durable options</li>
        <li><strong>HOA restrictions:</strong> Some communities have specific requirements</li>
        <li><strong>Energy efficiency:</strong> Insulated siding options can reduce heating costs</li>
      </ol>

      <h2>Ready to Upgrade Your Siding?</h2>
      <p>
        At Maia Construction, we specialize in helping Massachusetts homeowners choose and install
        the perfect siding for their homes. With over a decade of experience, we understand the
        unique challenges of New England homes and can guide you through every step of the process.
      </p>
    </>
  ),
  'energy-efficient-windows-guide': (
    <>
      <p className="lead">
        If you&apos;re a Massachusetts homeowner looking to reduce your energy bills and improve your
        home&apos;s comfort, upgrading to energy-efficient windows is one of the smartest investments
        you can make.
      </p>

      <h2>Why Energy-Efficient Windows Matter</h2>
      <p>
        Windows are responsible for 25-30% of residential heating and cooling energy use.
        In Massachusetts, where winter heating costs can be substantial, inefficient windows
        are essentially throwing money out the window.
      </p>

      <h2>Understanding Window Energy Ratings</h2>

      <h3>U-Factor</h3>
      <p>
        The U-factor measures how well a window insulates. Lower numbers are better.
        For Massachusetts, look for windows with a U-factor of 0.30 or lower.
      </p>

      <h3>Solar Heat Gain Coefficient (SHGC)</h3>
      <p>
        SHGC measures how much solar radiation passes through the window. In our climate,
        a moderate SHGC (0.25-0.40) is ideal to capture winter sun while reducing summer heat.
      </p>

      <h2>Types of Energy-Efficient Windows</h2>
      <ul>
        <li><strong>Double-pane:</strong> Two layers of glass with insulating gas</li>
        <li><strong>Triple-pane:</strong> Maximum insulation for extreme climates</li>
        <li><strong>Low-E coatings:</strong> Reflects heat while allowing light through</li>
        <li><strong>Gas-filled:</strong> Argon or krypton between panes for better insulation</li>
      </ul>

      <h2>Expected Savings</h2>
      <p>
        Massachusetts homeowners can expect to save 10-30% on heating and cooling costs
        after upgrading to ENERGY STAR certified windows. The exact savings depend on your
        current windows and home size.
      </p>

      <h2>Available Rebates and Incentives</h2>
      <p>
        Don&apos;t forget to check for available incentives:
      </p>
      <ul>
        <li>Federal tax credits for energy-efficient home improvements</li>
        <li>Mass Save rebates for qualifying windows</li>
        <li>Local utility company incentives</li>
      </ul>
    </>
  ),
  'front-door-curb-appeal': (
    <>
      <p className="lead">
        Your front door is the focal point of your home&apos;s exterior. It&apos;s the first thing
        visitors see and plays a crucial role in both curb appeal and home security.
        Choosing the right front door can dramatically transform your home&apos;s appearance.
      </p>

      <h2>The Impact of Your Front Door</h2>
      <p>
        A new front door can increase your home&apos;s value by up to $6,000 according to
        recent studies. But beyond financial returns, the right door:
      </p>
      <ul>
        <li>Creates a welcoming first impression</li>
        <li>Improves home security</li>
        <li>Enhances energy efficiency</li>
        <li>Reflects your personal style</li>
      </ul>

      <h2>Popular Door Materials</h2>

      <h3>Fiberglass</h3>
      <p>
        Fiberglass doors offer the best of both worlds: the beauty of wood with
        minimal maintenance. They won&apos;t warp, crack, or rot, making them ideal
        for New England&apos;s variable climate.
      </p>

      <h3>Steel</h3>
      <p>
        For maximum security and energy efficiency, steel doors are hard to beat.
        Modern steel doors can be painted any color and feature realistic wood
        grain textures.
      </p>

      <h3>Wood</h3>
      <p>
        Nothing matches the warmth and character of a real wood door. While they
        require more maintenance, wood doors offer unparalleled beauty and can
        be fully customized.
      </p>

      <h2>Choosing the Right Style</h2>
      <p>
        Consider your home&apos;s architectural style when selecting a door:
      </p>
      <ul>
        <li><strong>Colonial:</strong> Panel doors with symmetrical design</li>
        <li><strong>Craftsman:</strong> Square panels with glass lites at top</li>
        <li><strong>Modern:</strong> Clean lines, minimal ornamentation</li>
        <li><strong>Traditional:</strong> Classic raised panels</li>
      </ul>

      <h2>Don&apos;t Forget the Details</h2>
      <p>
        The finishing touches matter:
      </p>
      <ul>
        <li>Hardware finish (brass, nickel, black, bronze)</li>
        <li>Glass options (clear, frosted, decorative)</li>
        <li>Sidelights and transoms</li>
        <li>Storm door pairing</li>
      </ul>
    </>
  ),
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const recentPosts = getRecentPosts(3).filter((p) => p.slug !== slug);
  const content = blogContent[slug] || <p>Content coming soon...</p>;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      {/* Hero with Post Image */}
      <section className="relative min-h-[50vh] flex items-end pt-24">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/30" />
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-sm font-semibold">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex items-center space-x-4 text-white/80">
              <span>{post.author}</span>
              <span>•</span>
              <span>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]}
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-a:text-amber-500 prose-a:no-underline hover:prose-a:underline">
                {content}
              </div>

              {/* CTA */}
              <div className="mt-12 p-8 bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-white/80 mb-6">
                  Contact Maia Construction today for a free estimate on your home improvement project.
                </p>
                <a
                  href={PHONE_LINK}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold"
                >
                  Call {PHONE}
                </a>
              </div>

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <p className="font-semibold text-slate-900 mb-4">Share this article:</p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-amber-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-amber-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.44,4.83c-.8.37-1.66.62-2.56.73a4.39,4.39,0,0,0,1.94-2.43,9.12,9.12,0,0,1-2.82,1.08,4.42,4.42,0,0,0-7.66,3,4.54,4.54,0,0,0,.12,1A12.53,12.53,0,0,1,3.36,3.35,4.4,4.4,0,0,0,4.73,9.24a4.35,4.35,0,0,1-2-.55v.06a4.41,4.41,0,0,0,3.54,4.33,4.38,4.38,0,0,1-2,.08,4.43,4.43,0,0,0,4.12,3.06A8.87,8.87,0,0,1,3,17.85a12.5,12.5,0,0,0,6.77,2A12.47,12.47,0,0,0,22.33,7.29c0-.19,0-.37,0-.56A9,9,0,0,0,24,4.56,8.8,8.8,0,0,1,23.44,4.83Z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-amber-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.45,20.45H16.89V14.88c0-1.33,0-3-1.85-3s-2.13,1.44-2.13,2.93v5.64H9.35V9h3.41v1.56h.05a3.74,3.74,0,0,1,3.37-1.85c3.6,0,4.27,2.37,4.27,5.46ZM5.34,7.43a2.07,2.07,0,1,1,2.07-2.07A2.07,2.07,0,0,1,5.34,7.43ZM7.12,20.45H3.56V9H7.12ZM22.23,0H1.77A1.75,1.75,0,0,0,0,1.73V22.27A1.75,1.75,0,0,0,1.77,24H22.23A1.75,1.75,0,0,0,24,22.27V1.73A1.75,1.75,0,0,0,22.23,0Z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Recent Posts */}
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Recent Posts</h3>
                  <div className="space-y-4">
                    {recentPosts.map((recentPost) => (
                      <Link
                        key={recentPost.slug}
                        href={`/blog/${recentPost.slug}`}
                        className="block group"
                      >
                        <h4 className="font-semibold text-slate-900 group-hover:text-amber-500 transition-colors line-clamp-2">
                          {recentPost.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(recentPost.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Contact Card */}
                <div className="bg-slate-900 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                  <p className="text-white/80 mb-4">
                    Our experts are here to answer your questions.
                  </p>
                  <a
                    href={PHONE_LINK}
                    className="block w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold text-center"
                  >
                    {PHONE}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
