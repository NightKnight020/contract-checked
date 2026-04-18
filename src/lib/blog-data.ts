// Re-export everything from the canonical blog data source
export type { BlogPost } from './blog-data-simple';
export {
  blogPosts,
  getBlogPostBySlug,
  getBlogPostsByCategory,
  getAllCategories,
  getRecentBlogPosts,
} from './blog-data-simple';
