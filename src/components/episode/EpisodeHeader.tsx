
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
        <div className="mb-6">
          {/* Episode Info */}
          <div>
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
