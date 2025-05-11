
import { Episode } from '../components/EpisodeCard';

// Function to fetch and parse the RSS feed
export async function fetchEpisodes(): Promise<Episode[]> {
  try {
    // Fetch the RSS feed
    const response = await fetch('https://anchor.fm/s/f23f78f0/podcast/rss');
    const data = await response.text();
    
    // Parse the XML data
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'application/xml');
    
    // Get all item elements (episodes)
    const items = xml.querySelectorAll('item');
    
    // Convert NodeList to array and map to Episode objects
    const episodes: Episode[] = Array.from(items).map((item, index) => {
      // Extract necessary data
      const title = item.querySelector('title')?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';
      
      // Extract enclosure (audio file)
      const enclosure = item.querySelector('enclosure');
      const audioUrl = enclosure?.getAttribute('url') || '';
      
      // Extract duration from itunes:duration
      const duration = item.querySelector('itunes\\:duration')?.textContent || '';
      
      // Generate a unique ID
      const id = item.querySelector('guid')?.textContent || index.toString();
      
      // Extract image URL if available
      // First try to get the episode-specific image from itunes:image
      let imageUrl = item.querySelector('itunes\\:image')?.getAttribute('href') || '';
      
      // If no episode-specific image, try the image tag within the item
      if (!imageUrl) {
        const imageElement = item.querySelector('image') || item.querySelector('media\\:thumbnail');
        imageUrl = imageElement?.getAttribute('url') || imageElement?.getAttribute('href') || '';
      }
      
      // If still no image, fall back to the channel/podcast image
      if (!imageUrl) {
        imageUrl = xml.querySelector('channel > image > url')?.textContent || 
                  xml.querySelector('channel > itunes\\:image')?.getAttribute('href') || '';
      }
      
      // Extract YouTube video ID from description
      const youtubeId = extractYoutubeId(description);
      
      // Clean up description but preserve line breaks and list markers
      // This preserves <br> tags and whitespace before converting them to newlines
      let cleanDescription = description
        .replace(/<br\s*\/?>/gi, '\n') // Replace <br> tags with newlines
        .replace(/<p>/gi, '\n\n') // Replace paragraph openings with double newlines
        .replace(/<\/p>/gi, '') // Remove paragraph closings
        .replace(/<li>/gi, '\n- ') // Convert list items to markdown-style list items
        .replace(/<\/li>/gi, '') // Remove list item closings
        .replace(/<ul>|<\/ul>|<ol>|<\/ol>/gi, '\n') // Handle list containers
        .replace(/<[^>]*>?/gm, '') // Remove remaining HTML tags
        .replace(/&nbsp;/g, ' '); // Replace non-breaking spaces
      
      // Clean up extra whitespace while preserving intended line breaks
      cleanDescription = cleanDescription
        .replace(/\n{3,}/g, '\n\n') // Replace 3+ consecutive newlines with 2
        .trim();
      
      return {
        id: id,
        title,
        description: cleanDescription,
        publishDate: pubDate,
        duration,
        audioUrl,
        episodeNumber: items.length - index, // Assuming newest episodes come first
        imageUrl, // Add the image URL to the episode object
        youtubeId // Add the YouTube ID to the episode object
      };
    });
    
    return episodes;
  } catch (error) {
    console.error('Failed to fetch RSS feed:', error);
    return [];
  }
}

// Function to extract YouTube video ID from text
function extractYoutubeId(text: string): string | null {
  if (!text) return null;
  
  // Common YouTube URL patterns
  const patterns = [
    // youtu.be short links
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/i,
    // youtube.com/watch?v= format
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/i,
    // youtube.com/embed/ format
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
}

// Function to fetch a specific episode by ID
export async function fetchEpisodeById(id: string): Promise<Episode | undefined> {
  const episodes = await fetchEpisodes();
  return episodes.find(episode => episode.id === id);
}

// This would be implemented in a real application to connect to an actual RSS feed
export async function connectToRssFeed(feedUrl: string): Promise<void> {
  console.log(`Connected to RSS feed: ${feedUrl}`);
  // In a real implementation, you would store the feedUrl in localStorage or context
  localStorage.setItem('rssFeedUrl', feedUrl);
}
