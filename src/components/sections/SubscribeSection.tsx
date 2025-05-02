
import React from 'react';
import { 
  siSpotify, 
  siApplepodcasts, 
  siYoutube, 
  siAmazonmusic
} from 'simple-icons';
import PodcastButton from '../PodcastButton';

const SubscribeSection: React.FC = () => {
  const podcastPlatforms = [
    {
      name: "Spotify",
      url: "https://spotify.com",
      iconPath: siSpotify.path
    },
    {
      name: "Apple",
      url: "https://podcasts.apple.com",
      iconPath: siApplepodcasts.path
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com",
      iconPath: siYoutube.path
    },
    {
      name: "Amazon",
      url: "https://music.amazon.com",
      iconPath: siAmazonmusic.path
    }
  ];
  
  return (
    <section className="py-16 px-6 bg-primary-purple/30 backdrop-blur-sm">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Subscribe to the Podcast</h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          Never miss an episode. Subscribe to AI Marketing Navigator on your favorite podcast platform.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          {podcastPlatforms.map((platform) => (
            <PodcastButton 
              key={platform.name}
              name={platform.name}
              url={platform.url}
              iconPath={platform.iconPath}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
