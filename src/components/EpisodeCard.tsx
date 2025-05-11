import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/formatters';

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
}

interface EpisodeCardProps {
  episode: Episode;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-vivid-purple/30">
      {/* Episode Image */}
      {episode.imageUrl && (
        <img 
          src={episode.imageUrl} 
          alt={`${episode.title} thumbnail`} 
          className="w-full h-48 object-cover rounded-lg mb-4" 
        />
      )}
      
      {/* Episode Title */}
      <h3 className="text-xl font-bold text-white mb-2">{episode.title}</h3>
      
      {/* Episode Date and Duration */}
      <div className="text-white/60 text-sm mb-4">
        <span>{formatDate(episode.publishDate)}</span>
        <span className="mx-2">•</span>
        <span>{episode.duration}</span>
      </div>
      
      {/* Episode Description (limited to 2 lines) */}
      <p className="text-white/80 leading-relaxed mb-4 line-clamp-2">
        {episode.description}
      </p>
      
      {/* Listen Now Button */}
      <Link to={`/episodes/${episode.id}`} className="text-bright-orange hover:underline">
        Listen Now
      </Link>
    </div>
  );
};

export default EpisodeCard;

