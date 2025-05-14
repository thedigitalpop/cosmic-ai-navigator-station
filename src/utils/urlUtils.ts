
export function createSlugFromTitle(title: string, episodeNumber?: number): string {
  // If episodeNumber is provided, ensure it's at the beginning of the slug
  const prefix = episodeNumber ? `episode-${episodeNumber}-` : '';
  
  // Convert title to lowercase, replace spaces with hyphens, and remove special characters
  const titleSlug = title
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
