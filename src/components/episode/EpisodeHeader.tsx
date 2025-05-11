
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Episode } from '../EpisodeCard';

interface EpisodeHeaderProps {
  episode: Episode | null;
  formatDate: (dateString: string) => string;
}

const EpisodeHeader: React.FC<EpisodeHeaderProps> = ({ episode, formatDate }) => {
  return (
    <>
      <Link to="/episodes" className="flex items-center text-white hover:text-bright-orange mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Back to Episodes
      </Link>
      
      {episode && (
        <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
          {/* Episode Thumbnail */}
          <div className="flex-shrink-0">
            {episode.imageUrl ? (
              <img 
                src={episode.imageUrl} 
                alt={`${episode.title} thumbnail`} 
                className="w-32 h-32 md:w-48 md:h-48 rounded-lg object-cover border border-vivid-purple/30"
              />
            ) : (
              <div className="w-32 h-32 md:w-48 md:h-48 bg-vivid-purple/20 rounded-lg flex items-center justify-center">
                <span className="text-white/60">No Image</span>
              </div>
            )}
          </div>
          
          {/* Episode Info */}
          <div className="flex-grow">
            <span className="text-bright-orange font-bold">Episode {episode.episodeNumber}</span>
            <h1 className="text-3xl font-bold text-white mt-2">{episode.title}</h1>
            <div className="flex text-sm text-white/60 mt-2">
              <span>{formatDate(episode.publishDate)}</span>
              <span className="mx-2">•</span>
              <span>{episode.duration}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EpisodeHeader;
