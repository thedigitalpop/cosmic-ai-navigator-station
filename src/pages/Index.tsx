import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ArrowRight, Youtube, Music, Rss } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EpisodeCard from '../components/EpisodeCard';
import { Button } from '@/components/ui/button';
import { fetchEpisodes } from '../services/rssService';
import { Episode } from '../components/EpisodeCard';
import AudioPlayer from '../components/AudioPlayer';

const Index = () => {
  const [latestEpisodes, setLatestEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const navigate = useNavigate();
  
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
        {/* Hero Section */}
        <section className="relative pt-16 pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-space-pattern opacity-20 z-0"></div>
          
          {/* Animated stars */}
          <div className="absolute top-20 left-1/4 w-2 h-2 bg-white rounded-full animate-float"></div>
          <div className="absolute top-40 right-1/3 w-1 h-1 bg-white rounded-full animate-float-slow"></div>
          <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-white rounded-full animate-float-slower"></div>
          <div className="absolute top-60 right-1/4 w-2 h-2 bg-white rounded-full animate-float"></div>
          
          {/* Floating planets */}
          <img 
            src="/planet.svg" 
            alt="Planet" 
            className="absolute top-10 right-10 w-24 h-24 animate-float-slower opacity-50 hidden md:block" 
          />
          
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                AI Marketing Navigator
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Your cosmic guide through the expanding universe of AI-powered marketing strategies
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <Button 
                  onClick={() => setShowAudioPlayer(!showAudioPlayer)} 
                  className="bg-bright-orange hover:bg-bright-orange/90 text-white font-medium px-8 py-6 rounded-full flex items-center gap-2"
                >
                  <Play size={20} />
                  Play Latest Episode
                </Button>
                <Button 
                  onClick={() => navigate('/episodes')} 
                  variant="outline" 
                  className="border-bright-orange text-bright-orange hover:bg-bright-orange hover:text-white transition-all duration-200 px-8 py-6 rounded-full"
                >
                  Browse All Episodes
                </Button>
              </div>
              
              {showAudioPlayer && latestEpisodes.length > 0 && (
                <div className="mt-8">
                  <AudioPlayer 
                    audioUrl={latestEpisodes[0].audioUrl} 
                    title={latestEpisodes[0].title} 
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-center md:justify-end">
              <img 
                src="/navigator.svg" 
                alt="Space Navigator" 
                className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 animate-float" 
              />
            </div>
          </div>
        </section>
        
        {/* Latest Episodes Section */}
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
                {latestEpisodes.map((episode) => (
                  <EpisodeCard key={episode.id} episode={episode} />
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* About Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <div className="bg-secondary-purple/20 backdrop-blur-sm rounded-2xl p-8 border border-vivid-purple/30">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">About The Podcast</h2>
                  <p className="text-white/80 mb-4">
                    The AI Marketing Navigator podcast takes you on a journey through the cosmos of artificial intelligence in marketing. Each episode explores new frontiers and provides actionable insights to help your business thrive in this rapidly evolving landscape.
                  </p>
                  <p className="text-white/80 mb-6">
                    Whether you're new to AI marketing or an experienced navigator, our mission is to guide you to success in this exciting new universe.
                  </p>
                  <Button 
                    onClick={() => navigate('/about')}
                    className="bg-vivid-purple hover:bg-vivid-purple/90 text-white"
                  >
                    Learn More
                  </Button>
                </div>
                
                <div className="flex justify-center">
                  <img 
                    src="/navigator.svg" 
                    alt="Host Avatar" 
                    className="max-w-[200px] rounded-full border-4 border-soft-orange/50" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Subscribe Section */}
        <section className="py-16 px-6 bg-primary-purple/30 backdrop-blur-sm">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Subscribe to the Podcast</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Never miss an episode. Subscribe to AI Marketing Navigator on your favorite podcast platform.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="https://spotify.com" 
                className="bg-white/10 hover:bg-bright-orange transition-all duration-300 rounded-xl p-4 flex flex-col items-center w-32"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-10 h-10 flex items-center justify-center mb-2 text-white">
                  <Music className="w-10 h-10" />
                </div>
                <span className="text-white font-medium">Spotify</span>
              </a>
              
              <a 
                href="https://podcasts.apple.com" 
                className="bg-white/10 hover:bg-bright-orange transition-all duration-300 rounded-xl p-4 flex flex-col items-center w-32"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-10 h-10 flex items-center justify-center mb-2 text-white">
                  <Music className="w-10 h-10" />
                </div>
                <span className="text-white font-medium">Apple</span>
              </a>
              
              <a 
                href="https://podcasts.google.com" 
                className="bg-white/10 hover:bg-bright-orange transition-all duration-300 rounded-xl p-4 flex flex-col items-center w-32"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-10 h-10 flex items-center justify-center mb-2 text-white">
                  <Youtube className="w-10 h-10" />
                </div>
                <span className="text-white font-medium">Google</span>
              </a>
              
              <a 
                href="https://overcast.fm" 
                className="bg-white/10 hover:bg-bright-orange transition-all duration-300 rounded-xl p-4 flex flex-col items-center w-32"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-10 h-10 flex items-center justify-center mb-2 text-white">
                  <Rss className="w-10 h-10" />
                </div>
                <span className="text-white font-medium">Overcast</span>
              </a>
              
              <a 
                href="https://pocketcasts.com" 
                className="bg-white/10 hover:bg-bright-orange transition-all duration-300 rounded-xl p-4 flex flex-col items-center w-32"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-10 h-10 flex items-center justify-center mb-2 text-white">
                  <Rss className="w-10 h-10" />
                </div>
                <span className="text-white font-medium">Pocket</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
