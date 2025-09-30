import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DocumentIcon, ClockIcon, UserIcon, TagIcon, ArrowLeftIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { getBlogPostBySlug, getRecentBlogPosts } from '@/lib/blog-data';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Post Not Found | Contract Checked Blog'
    };
  }

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords.join(', '),
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);
  const recentPosts = getRecentBlogPosts(3);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navigation Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-sm border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <DocumentIcon className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Contract Checked
              </h1>
            </Link>
            <nav className="flex space-x-8">
              <Link
                href="/"
                className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400 pb-1"
              >
                Blog
              </Link>
              <Link
                href="/resources"
                className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
              >
                Resources
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Back to Blog</span>
          </Link>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400 text-sm">
                  <ClockIcon className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center space-x-6 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-5 w-5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5" />
                  <time>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg prose-slate dark:prose-invert max-w-none mb-8">
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
            </div>

            {/* Tags */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm">
                    <TagIcon className="h-4 w-4" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* Share and CTA */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">Ready to Analyze Your Contract?</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Get instant AI-powered analysis of your contracts with risk assessment and recommendations.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <DocumentIcon className="h-5 w-5" />
                  <span>Analyze Contract</span>
                </Link>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Recent Posts */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6 mb-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Recent Articles</h3>
              <div className="space-y-4">
                {recentPosts.map(recentPost => (
                  <div key={recentPost.id} className="border-b border-slate-100 dark:border-slate-700 last:border-b-0 pb-4 last:pb-0">
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 line-clamp-2">
                      <Link href={`/blog/${recentPost.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        {recentPost.title}
                      </Link>
                    </h4>
                    <time className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(recentPost.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Topics */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 p-6 mb-8">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Popular Topics</h3>
              <div className="space-y-2">
                {['Contract Mistakes', 'Legal Tips', 'Business Law', 'Risk Management', 'Contract Templates'].map(topic => (
                  <Link
                    key={topic}
                    href={`/blog?search=${encodeURIComponent(topic)}`}
                    className="block px-3 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-3">Stay Informed</h3>
              <p className="text-indigo-100 mb-4 text-sm">
                Get the latest contract tips and legal insights delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 rounded-lg border-0 bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-white focus:outline-none"
                />
                <button className="w-full bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <DocumentIcon className="h-8 w-8 text-indigo-400" />
                <h3 className="text-2xl font-bold">Contract Checked</h3>
              </div>
              <p className="text-slate-400 mb-4 max-w-md">
                Making contract analysis accessible to everyone with AI-powered insights and free legal templates.
              </p>
              <div className="flex space-x-4">
                <Link href="/" className="text-indigo-400 hover:text-white transition-colors font-medium">
                  Home
                </Link>
                <Link href="/blog" className="text-indigo-400 hover:text-white transition-colors font-medium">
                  Blog
                </Link>
                <Link href="/resources" className="text-slate-400 hover:text-white transition-colors">
                  Resources
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-slate-400">
                <li>AI Contract Analysis</li>
                <li>Risk Assessment</li>
                <li>Free Templates</li>
                <li>Document Support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Not Legal Advice</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-slate-500">
            <p>&copy; 2024 Contract Checked. AI-powered contract analysis made simple. Not legal advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
