import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://contractchecked.com';
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

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/contract-types`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    ...analyzeSlugs.map((slug) => ({
      url: `${base}/analyze/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/aircharterservice`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];
}
