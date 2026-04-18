import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, User, Tag, ArrowLeft, Calendar, FileText } from 'lucide-react';
import { getBlogPostBySlug, getRecentBlogPosts } from '@/lib/blog-data';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return { title: 'Post Not Found | Contract Checked Blog' };
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
    <div className="min-h-screen bg-[#F9FAFB]">
      <SiteHeader />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Back */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#2D6A4F] hover:text-[#40916C] font-medium transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main content */}
          <article className="lg:col-span-3">
            {/* Article header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-emerald-50 text-[#2D6A4F] rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                {post.title}
              </h1>

              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <time>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </div>
            </header>

            {/* Article content */}
            <div className="prose prose-lg prose-slate max-w-none mb-8">
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
            </div>

            {/* Tags + CTA */}
            <div className="border-t border-slate-200 pt-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                    <Tag className="h-3.5 w-3.5" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Ready to Analyze Your Contract?</h3>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  Get instant AI-powered analysis of your contracts with risk assessment and recommendations.
                </p>
                <Link
                  href="/#upload-section"
                  className="inline-flex items-center gap-2 bg-[#2D6A4F] hover:bg-[#40916C] text-white px-5 py-2.5 rounded-xl font-semibold transition-colors text-sm"
                >
                  <FileText className="h-4 w-4" />
                  Analyze Contract Free
                </Link>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recent posts */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4">Recent Articles</h3>
              <div className="space-y-4">
                {recentPosts.map((recentPost) => (
                  <div key={recentPost.id} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                    <h4 className="font-medium text-slate-800 mb-1 line-clamp-2 text-sm">
                      <Link href={`/blog/${recentPost.slug}`} className="hover:text-[#2D6A4F] transition-colors">
                        {recentPost.title}
                      </Link>
                    </h4>
                    <time className="text-xs text-slate-400">
                      {new Date(recentPost.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </time>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular topics */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4">Popular Topics</h3>
              <div className="space-y-1">
                {['Contract Mistakes', 'Legal Tips', 'Business Law', 'Risk Management', 'Contract Templates'].map(
                  (topic) => (
                    <Link
                      key={topic}
                      href={`/blog?search=${encodeURIComponent(topic)}`}
                      className="block px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#2D6A4F] rounded-lg transition-colors"
                    >
                      {topic}
                    </Link>
                  )
                )}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-[#1C2333] rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-2">Stay Informed</h3>
              <p className="text-slate-400 text-sm mb-4">
                Get the latest contract tips and legal insights delivered to your inbox.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-slate-400 border border-white/20 focus:ring-2 focus:ring-emerald-400/50 focus:outline-none text-sm"
                />
                <button className="w-full bg-[#2D6A4F] hover:bg-[#40916C] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
