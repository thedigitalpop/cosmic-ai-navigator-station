// Utility functions for handling URL redirects and migrations

export function detectIncorrectEpisodeUrl(pathname: string): string | null {
  // Check if URL has duplicate episode numbers like /podcasts/episode-365-episode-364-...
  const match = pathname.match(/\/podcasts\/episode-(\d+)-episode-(\d+)-(.+)/);
  
  if (match) {
    const [, wrongNumber, correctNumber, restOfSlug] = match;
    // Return the corrected URL
    return `/podcasts/episode-${correctNumber}-${restOfSlug}`;
  }
  
  return null;
}

export function shouldRedirectEpisodeUrl(currentUrl: string): string | null {
  try {
    const url = new URL(currentUrl, window.location.origin);
    return detectIncorrectEpisodeUrl(url.pathname);
  } catch {
    return null;
  }
}