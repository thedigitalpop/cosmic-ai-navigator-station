
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AudioPlayer from '../components/AudioPlayer';
import { fetchEpisodeById } from '../services/rssService';
import { Episode } from '../components/EpisodeCard';
import EpisodeHeader from '../components/episode/EpisodeHeader';
import EpisodeDescription from '../components/episode/EpisodeDescription';
import EpisodeShare from '../components/episode/EpisodeShare';
import EpisodeNotFound from '../components/episode/EpisodeNotFound';
import { formatDate, formatDescription } from '../utils/formatters';

const EpisodeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadEpisode = async () => {
      if (!id) return;
      
      try {
        const fetchedEpisode = await fetchEpisodeById(id);
        if (fetchedEpisode) {
          setEpisode(fetchedEpisode);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch episode:', error);
        setIsLoading(false);
      }
    };
    
    loadEpisode();
  }, [id]);
  
  return (
    <div className="min-h-screen flex flex-col bg-space-gradient bg-fixed">
      <Header />
      
      <main className="flex-grow py-16 px-6">
        <div className="container mx-auto">
          <EpisodeHeader episode={episode} formatDate={formatDate} />
          
          {isLoading ? (
            <div className="bg-white/5 animate-pulse h-64 rounded-xl p-6"></div>
          ) : episode ? (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-vivid-purple/30">
              <div className="mb-8">
                <AudioPlayer audioUrl={episode.audioUrl} title={episode.title} />
              </div>
              
              <EpisodeDescription 
                description={episode.description} 
                formatDescription={formatDescription} 
              />
              
              <EpisodeShare />
            </div>
          ) : (
            <EpisodeNotFound />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EpisodeDetail;
