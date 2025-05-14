
import React from 'react';
import { Episode } from '@/components/EpisodeCard';

interface EpisodeListProps {
  episodes: Episode[];
  isLoading: boolean;
  selectedEpisodeId: string | null;
  onSelectEpisode: (episode: Episode) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  isLoading,
  selectedEpisodeId,
  onSelectEpisode,
}) => {
  return (
    <div className="md:col-span-1 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-vivid-purple/30 h-[70vh] overflow-y-auto">
      <h2 className="text-xl font-bold text-white mb-4">Episodes</h2>
      {isLoading ? (
        <div className="animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-white/10 rounded-md mb-2"></div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {episodes.map((episode) => (
            <button
              key={episode.id}
              className={`w-full text-left p-3 rounded-md transition-colors ${
                selectedEpisodeId === episode.id
                  ? 'bg-bright-orange text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              onClick={() => onSelectEpisode(episode)}
            >
              <div className="font-semibold truncate">{episode.title}</div>
              <div className="text-xs opacity-70">Episode {episode.episodeNumber}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EpisodeList;
