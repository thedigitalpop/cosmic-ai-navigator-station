
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchEpisodes } from '../services/rssService';
import { Episode } from '../components/EpisodeCard';
import HeroSection from '../components/sections/HeroSection';
import LatestEpisodesSection from '../components/sections/LatestEpisodesSection';
import AboutSection from '../components/sections/AboutSection';
import SubscribeSection from '../components/sections/SubscribeSection';

const Index = () => {
  const [latestEpisodes, setLatestEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        const episodes = await fetchEpisodes();
        // Sort episodes by date (newest first)
        const sortedEpisodes = episodes.sort((a, b) => 
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
        setLatestEpisodes(sortedEpisodes.slice(0, 3)); // Get latest 3 episodes
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch episodes:', error);
        setIsLoading(false);
      }
    };
    
    loadEpisodes();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-space-gradient bg-fixed">
      <Header />
      
      <main className="flex-grow">
        <HeroSection 
          latestEpisode={latestEpisodes.length > 0 ? latestEpisodes[0] : null} 
          isLoading={isLoading} 
        />
        <LatestEpisodesSection episodes={latestEpisodes} isLoading={isLoading} />
        <AboutSection />
        <SubscribeSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
