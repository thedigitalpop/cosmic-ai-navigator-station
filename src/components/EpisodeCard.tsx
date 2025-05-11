import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import AudioPlayer from './AudioPlayer';

export interface Episode {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  duration: string;
  audioUrl: string;
  episodeNumber: number;
  imageUrl?: string; // Add optional imageUrl property
}

interface EpisodeCardProps {
  episode: Episode;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };
  
  return (
    <div 
      className={`bg-white/5 backdrop-blur-sm rounded-xl p-5 cursor-pointer transform transition duration-300 hover:scale-[1.02] border border-vivid-purple/30 ${isExpanded ? 'shadow-xl' : 'shadow-md'}`} 
      onClick={toggleExpand}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-bright-orange font-bold">Episode {episode.episodeNumber}</span>
          <h3 className="text-xl font-bold text-white">
            <Link to={`/episodes/${episode.id}`} className="hover:text-bright-orange" onClick={(e) => e.stopPropagation()}>
              {episode.title}
            </Link>
          </h3>
        </div>
        <button 
          onClick={togglePlay}
          className={`rounded-full p-2 flex-shrink-0 transition-colors ${isPlaying ? 'bg-bright-orange' : 'bg-vivid-purple hover:bg-bright-orange'}`}
          aria-label={isPlaying ? "Pause episode" : "Play episode"}
        >
          <Play size={20} className="text-white" />
        </button>
      </div>
      
      <div className="mb-3">
        <p className={`text-white/80 ${isExpanded ? '' : 'line-clamp-2'}`}>
          {episode.description}
        </p>
      </div>
      
      <div className="flex justify-between text-sm text-white/60">
        <span>{formatDate(episode.publishDate)}</span>
        <span>{episode.duration}</span>
      </div>
      
      {isExpanded && isPlaying && (
        <div className="mt-4">
          <AudioPlayer audioUrl={episode.audioUrl} title={episode.title} />
        </div>
      )}
    </div>
  );
};

export default EpisodeCard;
