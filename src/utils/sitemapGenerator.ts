import { fetchEpisodes } from '../services/rssService';
import { createSEOFriendlySlug } from './seoUtils';

export async function generateSitemap(): Promise<string> {
  try {
    const episodes = await fetchEpisodes();
    const baseUrl = window.location.origin;
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Main pages with their priorities and change frequencies
    const staticPages = [
      { 
        url: '/', 
        priority: '1.0', 
        changefreq: 'daily',
        lastmod: currentDate 
      },
      { 
        url: '/episodes', 
        priority: '0.9', 
        changefreq: 'daily',
        lastmod: currentDate 
      },
      { 
        url: '/about', 
        priority: '0.7', 
        changefreq: 'monthly',
        lastmod: currentDate 
      },
      { 
        url: '/subscribe', 
        priority: '0.8', 
        changefreq: 'monthly',
        lastmod: currentDate 
      }
    ];

    // Generate episode pages
    const episodePages = episodes.map(episode => {
      const slug = episode.slug || createSEOFriendlySlug(episode.title, episode.episodeNumber);
      const publishDate = episode.publishDate ? 
        new Date(episode.publishDate).toISOString().split('T')[0] : 
        currentDate;
      
      return {
        url: `/podcasts/${slug}`,
        priority: '0.8',
        changefreq: 'weekly',
        lastmod: publishDate
      };
    });

    const allPages = [...staticPages, ...episodePages];

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return sitemap;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw error;
  }
}

// Function to download sitemap for manual submission
export async function downloadSitemap() {
  try {
    const sitemapXML = await generateSitemap();
    const blob = new Blob([sitemapXML], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading sitemap:', error);
    throw error;
  }
}

// Function to automatically submit sitemap to search engines
export function submitSitemapToSearchEngines(sitemapUrl: string) {
  const searchEngines = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
  ];

  searchEngines.forEach(url => {
    // Open in new tab to submit (requires user action due to popup blockers)
    window.open(url, '_blank');
  });
}