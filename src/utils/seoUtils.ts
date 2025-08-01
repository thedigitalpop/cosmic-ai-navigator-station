export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  url?: string;
}

export function generateEpisodeSEO(episode: {
  title: string;
  description: string;
  episodeNumber?: number;
  publishDate?: string;
  imageUrl?: string;
  slug?: string;
}): SEOMetadata {
  // Clean and optimize title
  const episodeTitle = episode.episodeNumber 
    ? `Episode ${episode.episodeNumber}: ${episode.title}`
    : episode.title;

  // Generate SEO-optimized description
  const cleanDescription = episode.description
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  const seoDescription = cleanDescription.length > 155 
    ? cleanDescription.substring(0, 152) + '...'
    : cleanDescription;

  // Generate keywords from title and description
  const keywords = generateKeywordsFromContent(episode.title, cleanDescription);

  // Generate URL
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const url = episode.slug ? `${baseUrl}/podcasts/${episode.slug}` : '';

  return {
    title: episodeTitle,
    description: seoDescription,
    keywords,
    image: episode.imageUrl,
    url
  };
}

export function generateKeywordsFromContent(title: string, description: string): string {
  const baseKeywords = [
    'AI Navigator Station',
    'Digital Pop',
    'Ryan Poplin',
    'artificial intelligence',
    'AI podcast',
    'digital marketing',
    'business transformation',
    'technology podcast'
  ];

  // Extract meaningful words from title (excluding common words)
  const stopWords = new Set(['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should']);
  
  const titleWords = title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word))
    .slice(0, 5); // Take first 5 meaningful words

  const allKeywords = [...baseKeywords, ...titleWords];
  return allKeywords.join(', ');
}

export function generateImageAlt(episodeTitle: string, episodeNumber?: number): string {
  const prefix = episodeNumber ? `Episode ${episodeNumber}` : 'Episode';
  return `${prefix}: ${episodeTitle} - AI Navigator Station podcast thumbnail`;
}

export function createSEOFriendlySlug(title: string, episodeNumber?: number): string {
  // Remove HTML tags and normalize whitespace
  const cleanTitle = title
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Create base slug
  const slug = cleanTitle
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

  // Add episode number prefix if provided
  return episodeNumber ? `episode-${episodeNumber}-${slug}` : slug;
}

export function generateSitemapXML(episodes: Array<{
  title: string;
  slug?: string;
  publishDate?: string;
  episodeNumber?: number;
}>): string {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yoursite.com';
  
  const urls = [
    // Main pages
    `${baseUrl}/`,
    `${baseUrl}/episodes`,
    `${baseUrl}/about`,
    `${baseUrl}/subscribe`,
    
    // Episode pages
    ...episodes.map(episode => {
      const slug = episode.slug || createSEOFriendlySlug(episode.title, episode.episodeNumber);
      const lastmod = episode.publishDate ? new Date(episode.publishDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
      
      return `${baseUrl}/podcasts/${slug}`;
    })
  ];

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemapXML;
}