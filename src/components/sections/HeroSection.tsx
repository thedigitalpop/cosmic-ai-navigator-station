import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import AudioPlayer from '../AudioPlayer';
import { Episode } from '../EpisodeCard';

interface HeroSectionProps {
  latestEpisode: Episode | null;
  isLoading: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ latestEpisode, isLoading }) => {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const navigate = useNavigate();
  
  return (
    <section className="relative pt-16 pb-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-space-pattern opacity-20 z-0"></div>
      
      {/* Animated stars */}
      <div className="absolute top-20 left-1/4 w-2 h-2 bg-white rounded-full animate-float"></div>
      <div className="absolute top-40 right-1/3 w-1 h-1 bg-white rounded-full animate-float-slow"></div>
      <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-white rounded-full animate-float-slower"></div>
      <div className="absolute top-60 right-1/4 w-2 h-2 bg-white rounded-full animate-float"></div>
      
      {/* Additional star dots */}
      <div className="absolute top-28 left-1/6 w-1.5 h-1.5 bg-white rounded-full animate-float-slow"></div>
      <div className="absolute top-44 left-2/3 w-1 h-1 bg-white opacity-70 rounded-full animate-float-slower"></div>
      <div className="absolute top-72 left-1/2 w-2 h-2 bg-white opacity-60 rounded-full animate-float"></div>
      <div className="absolute bottom-40 right-1/5 w-1.5 h-1.5 bg-white rounded-full animate-float-slow"></div>
      <div className="absolute bottom-56 left-1/5 w-1 h-1 bg-white opacity-80 rounded-full animate-float"></div>
      <div className="absolute top-36 left-3/4 w-1 h-1 bg-white rounded-full animate-float-slower"></div>
      <div className="absolute top-80 right-2/3 w-1.5 h-1.5 bg-white opacity-70 rounded-full animate-float"></div>
      <div className="absolute bottom-64 right-1/4 w-1 h-1 bg-white opacity-60 rounded-full animate-float-slow"></div>
      
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
          
          {showAudioPlayer && latestEpisode && (
            <div className="mt-8">
              <AudioPlayer 
                audioUrl={latestEpisode.audioUrl} 
                title={latestEpisode.title} 
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
  );
};

export default HeroSection;
