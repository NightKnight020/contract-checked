import type { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.contractchecked.com';
  
  // More realistic lastmod dates
  const recentUpdate = new Date('2026-01-15');
  const olderUpdate = new Date('2025-10-01');

  const analyzeSlugs = [
    'rental-agreement',
    'employment-contract',
    'nda',
    'purchase-agreement',
    'service-agreement',
    'independent-contractor',
    'partnership-agreement',
    'repair-agreement',
    'franchise-agreement',
    'real-estate-aps',
  ];

  const blogUrls = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: recentUpdate, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/contract-checker`, lastModified: recentUpdate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/free-contract-analysis`, lastModified: recentUpdate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/resources`, lastModified: olderUpdate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`, lastModified: recentUpdate, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/contract-types`, lastModified: olderUpdate, changeFrequency: 'monthly', priority: 0.9 },
    ...analyzeSlugs.map((slug) => ({
      url: `${base}/analyze/${slug}`,
      lastModified: olderUpdate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...blogUrls,
    { url: `${base}/pricing`, lastModified: recentUpdate, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/about`, lastModified: olderUpdate, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/privacy`, lastModified: olderUpdate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: olderUpdate, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
