
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatters';
import { createSlugFromTitle } from '../utils/urlUtils';
import ImageWithSEO from './SEO/ImageWithSEO';

export interface Episode {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  duration: string;
  audioUrl: string;
  episodeNumber: number;
  imageUrl?: string;
  youtubeId?: string | null;
  slug?: string;
}

interface EpisodeCardProps {
  episode: Episode;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  // Generate slug if not already present
  const slug = episode.slug || createSlugFromTitle(episode.title, episode.episodeNumber);
  
  return (
    <Link 
      to={`/podcasts/${slug}`} 
      className="block h-full"
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-vivid-purple/30 h-full flex flex-col transition-all duration-300 hover:bg-white/10 hover:border-vivid-purple/60 hover:shadow-lg hover:shadow-vivid-purple/20">
        {/* Episode Image */}
        <div className="mb-4 aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
          <ImageWithSEO
            src={episode.imageUrl || '/placeholder.svg'}
            episodeTitle={episode.title}
            episodeNumber={episode.episodeNumber}
            className="w-full h-full object-cover rounded-lg"
            width={400}
            height={225}
          />
        </div>
        
        {/* Episode Title */}
        <h3 className="text-xl font-bold text-white mb-2">{episode.title}</h3>
        
        {/* Episode Date and Duration */}
        <div className="text-white/60 text-sm mb-4">
          <span>{formatDate(episode.publishDate)}</span>
          <span className="mx-2">•</span>
          <span>{episode.duration}</span>
        </div>
        
        {/* Episode Description (limited to 2 lines) */}
        <p className="text-white/80 leading-relaxed mb-4 line-clamp-2 flex-grow">
          {episode.description}
        </p>
        
        {/* Listen Now Button */}
        <div className="text-bright-orange hover:underline mt-auto">
          Listen Now
        </div>
        
        {/* YouTube Indicator */}
        {episode.youtubeId && (
          <div className="mt-2 text-xs text-white/60">
            <span className="bg-red-600 text-white px-2 py-0.5 rounded-sm">YouTube</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default EpisodeCard;
