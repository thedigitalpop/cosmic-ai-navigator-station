
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
      
      // Clean up description (remove HTML tags)
      const cleanDescription = description.replace(/<[^>]*>?/gm, '');
      
      return {
        id: id,
        title,
        description: cleanDescription,
        publishDate: pubDate,
        duration,
        audioUrl,
        episodeNumber: items.length - index // Assuming newest episodes come first
      };
    });
    
    return episodes;
  } catch (error) {
    console.error('Failed to fetch RSS feed:', error);
    return [];
  }
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
