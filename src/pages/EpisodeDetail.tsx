
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AudioPlayer from '../components/AudioPlayer';
import { fetchEpisodeById } from '../services/rssService';
import { Episode } from '../components/EpisodeCard';
import { Button } from '@/components/ui/button';

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
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  // Function to decode HTML entities and convert URLs to clickable links
  const formatDescription = (description: string): React.ReactNode => {
    if (!description) return "";
    
    // Decode HTML entities (like &apos; to apostrophe)
    const decodedText = decodeHtmlEntities(description);
    
    // This regex matches URLs in text
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // Split the description by paragraphs for better formatting
    // Looking for multiple line breaks as paragraph separators
    const paragraphs = decodedText.split(/\n\n+/);
    
    return (
      <>
        {paragraphs.map((paragraph, i) => {
          // Skip empty paragraphs
          if (!paragraph.trim()) return null;
          
          // Create links for URLs inside paragraphs
          const parts = paragraph.split(urlRegex);
          const formatted = parts.map((part, j) => {
            // If the part matches a URL pattern
            if (part.match(urlRegex)) {
              return (
                <a 
                  key={j}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bright-orange hover:underline"
                >
                  {part}
                </a>
              );
            }
            return part;
          });
          
          // Handle single line breaks within paragraphs
          const lines = formatted.map((item) => {
            if (typeof item === 'string') {
              return item.split('\n').map((line, k, array) => (
                <React.Fragment key={k}>
                  {line}
                  {k < array.length - 1 && <br />}
                </React.Fragment>
              ));
            }
            return item;
          });
          
          return <p key={i} className="mb-4">{lines}</p>;
        })}
      </>
    );
  };
  
  // Function to decode HTML entities
  const decodeHtmlEntities = (text: string): string => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-space-gradient bg-fixed">
      <Header />
      
      <main className="flex-grow py-16 px-6">
        <div className="container mx-auto">
          <Link to="/episodes" className="flex items-center text-white hover:text-bright-orange mb-6">
            <ArrowLeft size={20} className="mr-2" />
            Back to Episodes
          </Link>
          
          {isLoading ? (
            <div className="bg-white/5 animate-pulse h-64 rounded-xl p-6"></div>
          ) : episode ? (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-vivid-purple/30">
              <div className="mb-6">
                <span className="text-bright-orange font-bold">Episode {episode.episodeNumber}</span>
                <h1 className="text-3xl font-bold text-white mt-2">{episode.title}</h1>
                <div className="flex text-sm text-white/60 mt-2">
                  <span>{formatDate(episode.publishDate)}</span>
                  <span className="mx-2">•</span>
                  <span>{episode.duration}</span>
                </div>
              </div>
              
              <div className="mb-8">
                <AudioPlayer audioUrl={episode.audioUrl} title={episode.title} />
              </div>
              
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold text-white mb-4">Episode Notes</h2>
                <div className="text-white/80 leading-relaxed">
                  {formatDescription(episode.description)}
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Share This Episode</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" className="border-white/40 text-white hover:bg-white/10">
                    Twitter
                  </Button>
                  <Button variant="outline" className="border-white/40 text-white hover:bg-white/10">
                    Facebook
                  </Button>
                  <Button variant="outline" className="border-white/40 text-white hover:bg-white/10">
                    Copy Link
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-white mb-4">Episode Not Found</h2>
              <p className="text-white/80 mb-6">Sorry, we couldn't find the episode you're looking for.</p>
              <Button onClick={() => window.location.href = '/episodes'} className="bg-bright-orange hover:bg-bright-orange/90 text-white">
                Browse All Episodes
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EpisodeDetail;
