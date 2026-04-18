'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, User, Tag, Search, FileText } from 'lucide-react';
import { blogPosts, getAllCategories, getRecentBlogPosts } from '@/lib/blog-data';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = getAllCategories();
  const recentPosts = getRecentBlogPosts(3);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-[#1C2333] text-white pt-16 pb-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Contract Insights &amp; Legal Guides
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Expert advice on contracts, legal agreements, and business law. Learn how to protect your interests and avoid costly mistakes.
          </p>
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-0 bg-white/10 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-400/50 focus:outline-none"
            />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === '' ? 'bg-[#2D6A4F] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Topics
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category ? 'bg-[#2D6A4F] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Posts grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-emerald-50 text-[#2D6A4F] rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-slate-500 text-sm">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-[#2D6A4F] transition-colors">
                        {post.title}
                      </Link>
                    </h2>

                    <p className="text-slate-500 mb-4 line-clamp-3 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        <span>{post.author}</span>
                      </div>
                      <time>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-xs">
                          <Tag className="h-2.5 w-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-700 mb-1">No articles found</h3>
                <p className="text-sm text-slate-500">Try adjusting your search terms or category filter.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recent posts */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4">Recent Articles</h3>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="border-b border-slate-100 last:border-0 pb-4 last:pb-0">
                    <h4 className="font-medium text-slate-800 mb-1 line-clamp-2 text-sm">
                      <Link href={`/blog/${post.slug}`} className="hover:text-[#2D6A4F] transition-colors">
                        {post.title}
                      </Link>
                    </h4>
                    <time className="text-xs text-slate-400">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </time>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-800 mb-4">Categories</h3>
              <div className="space-y-1">
                {categories.map((category) => {
                  const count = blogPosts.filter((p) => p.category === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? 'bg-emerald-50 text-[#2D6A4F] font-medium'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {category} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-[#1C2333] rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-2">Need Contract Help?</h3>
              <p className="text-slate-400 text-sm mb-4">Upload your contract and get AI-powered analysis instantly.</p>
              <Link
                href="/#upload-section"
                className="inline-flex items-center gap-2 bg-[#2D6A4F] hover:bg-[#40916C] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                <FileText className="h-4 w-4" />
                Analyze Contract
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
