
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import EpisodeCard, { Episode } from '../EpisodeCard';

interface LatestEpisodesSectionProps {
  episodes: Episode[];
  isLoading: boolean;
}

const LatestEpisodesSection: React.FC<LatestEpisodesSectionProps> = ({ episodes, isLoading }) => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 px-6 bg-secondary-purple/30 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Latest Episodes</h2>
          <Button 
            onClick={() => navigate('/episodes')} 
            variant="link" 
            className="flex items-center gap-2 text-bright-orange hover:text-bright-orange/80"
          >
            See All Episodes <ArrowRight size={16} />
          </Button>
        </div>
        
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 animate-pulse h-64 rounded-xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestEpisodesSection;
