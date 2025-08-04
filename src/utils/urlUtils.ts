
export function createSlugFromTitle(title: string, episodeNumber?: number): string {
  // Extract episode number from title if it exists
  const episodeMatch = title.match(/Episode\s+(\d+)/i);
  const extractedEpisodeNumber = episodeMatch ? parseInt(episodeMatch[1]) : episodeNumber;
  
  // Remove "Episode X:" from the beginning of the title to avoid duplication
  const cleanTitle = title.replace(/^Episode\s+\d+:\s*/i, '').trim();
  
  // If we have an episode number (extracted or provided), add it as prefix
  const prefix = extractedEpisodeNumber ? `episode-${extractedEpisodeNumber}-` : '';
  
  // Convert title to lowercase, replace spaces with hyphens, and remove special characters
  const titleSlug = cleanTitle
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple consecutive hyphens with a single one
    .trim();
    
  return `${prefix}${titleSlug}`;
}

export function getEpisodeIdFromSlug(slug: string): string | null {
  // This function will extract episode ID from local storage using the slug
  const allEpisodes = Object.keys(localStorage)
    .filter(key => key.startsWith('episode_details_'))
    .map(key => {
      const id = key.replace('episode_details_', '');
      try {
        const details = JSON.parse(localStorage.getItem(key) || '{}');
        const slug = details.slug;
        return { id, slug };
      } catch (e) {
        return { id, slug: null };
      }
    })
    .filter(item => item.slug === slug);
  
  return allEpisodes.length > 0 ? allEpisodes[0].id : null;
}
