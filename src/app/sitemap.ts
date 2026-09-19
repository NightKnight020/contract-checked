import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.contractchecked.com';
  const now = new Date();

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

  const blogSlugs = [
    'how-to-review-any-contract',
    'partnership-agreement-must-haves',
    'service-agreement-problems',
    'real-estate-purchase-agreement-guide',
    'freelancer-contract-checklist',
    'nda-mistakes-that-backfire',
    'employment-contract-negotiation-guide',
    'rental-agreement-red-flags',
  ];

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/contract-checker`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/free-contract-analysis`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    ...blogSlugs.map((slug) => ({
      url: `${base}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { url: `${base}/contract-types`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...analyzeSlugs.map((slug) => ({
      url: `${base}/analyze/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${base}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
  ];
}
