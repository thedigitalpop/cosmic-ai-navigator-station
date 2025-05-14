
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchEpisodes } from '../services/rssService';
import { Episode } from '../components/EpisodeCard';
import { saveEpisodeDetails, getCustomEpisodeDetails } from '../services/episodeService';
import { toast } from '@/components/ui/use-toast';
import { extractYoutubeId } from '@/utils/youtubeUtils';

// Import refactored components
import EpisodeList from '@/components/episode-manager/EpisodeList';
import EpisodeDetailsForm from '@/components/episode-manager/EpisodeDetailsForm';

const EpisodeManager = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        const allEpisodes = await fetchEpisodes();
        const sortedEpisodes = allEpisodes.sort((a, b) => 
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
        setEpisodes(sortedEpisodes);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch episodes:', error);
        setIsLoading(false);
      }
    };
    
    loadEpisodes();
  }, []);

  const handleEpisodeSelect = async (episode: Episode) => {
    setSelectedEpisode(episode);
    
    try {
      const customDetails = await getCustomEpisodeDetails(episode.id);
      if (customDetails) {
        setYoutubeUrl(customDetails.youtubeUrl || '');
        setThumbnailUrl(customDetails.thumbnailUrl || '');
      } else {
        // Reset form if no custom details exist
        setYoutubeUrl(episode.youtubeId ? `https://www.youtube.com/watch?v=${episode.youtubeId}` : '');
        setThumbnailUrl(episode.imageUrl || '');
      }
    } catch (error) {
      console.error('Failed to load custom episode details:', error);
      toast({
        title: "Error",
        description: "Failed to load episode details",
        variant: "destructive"
      });
    }
  };

  const handleSave = async () => {
    if (!selectedEpisode) return;

    const youtubeId = extractYoutubeId(youtubeUrl);
    
    try {
      await saveEpisodeDetails(selectedEpisode.id, {
        youtubeUrl,
        thumbnailUrl,
        youtubeId: youtubeId || ''
      });
      toast({
        title: "Success",
        description: "Episode details saved successfully"
      });
      // Navigate to the episode page to see the changes
      navigate(`/episodes/${selectedEpisode.id}`);
    } catch (error) {
      console.error('Failed to save episode details:', error);
      toast({
        title: "Error",
        description: "Failed to save episode details",
        variant: "destructive"
      });
    }
  };

  const handlePreview = () => {
    if (selectedEpisode) {
      navigate(`/episodes/${selectedEpisode.id}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-space-gradient bg-fixed">
      <Header />
      
      <main className="flex-grow py-16 px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Episode Manager</h1>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Episode List */}
            <EpisodeList 
              episodes={episodes}
              isLoading={isLoading}
              selectedEpisodeId={selectedEpisode?.id || null}
              onSelectEpisode={handleEpisodeSelect}
            />
            
            {/* Episode Details Form */}
            <div className="md:col-span-2 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-vivid-purple/30">
              <EpisodeDetailsForm
                selectedEpisode={selectedEpisode}
                youtubeUrl={youtubeUrl}
                thumbnailUrl={thumbnailUrl}
                setYoutubeUrl={setYoutubeUrl}
                setThumbnailUrl={setThumbnailUrl}
                onSave={handleSave}
                onPreview={handlePreview}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EpisodeManager;
