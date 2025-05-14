
interface CustomEpisodeDetails {
  youtubeUrl?: string;
  youtubeId?: string;
  thumbnailUrl?: string;
}

// Local storage key prefix
const STORAGE_KEY_PREFIX = 'episode_details_';

// Save custom details for an episode
export async function saveEpisodeDetails(episodeId: string, details: CustomEpisodeDetails): Promise<void> {
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${episodeId}`, JSON.stringify(details));
    return Promise.resolve();
  } catch (error) {
    console.error('Failed to save episode details:', error);
    return Promise.reject(error);
  }
}

// Get custom details for an episode
export async function getCustomEpisodeDetails(episodeId: string): Promise<CustomEpisodeDetails | null> {
  try {
    const data = localStorage.getItem(`${STORAGE_KEY_PREFIX}${episodeId}`);
    if (!data) return null;
    
    return JSON.parse(data) as CustomEpisodeDetails;
  } catch (error) {
    console.error('Failed to get episode details:', error);
    return Promise.reject(error);
  }
}

// Update the RSS service with custom details
export async function enhanceEpisodeWithCustomDetails(episode: any): Promise<any> {
  try {
    const customDetails = await getCustomEpisodeDetails(episode.id);
    
    if (customDetails) {
      // Merge custom details with episode data, prioritizing custom values
      return {
        ...episode,
        youtubeId: customDetails.youtubeId || episode.youtubeId,
        imageUrl: customDetails.thumbnailUrl || episode.imageUrl,
      };
    }
    
    return episode;
  } catch (error) {
    console.error('Failed to enhance episode:', error);
    return episode; // Return original episode on error
  }
}
