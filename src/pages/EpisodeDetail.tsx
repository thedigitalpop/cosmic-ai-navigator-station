
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import Header from '../components/Header';
import Footer from '../components/Footer';
import AudioPlayer from '../components/AudioPlayer';
import { fetchEpisodeById, fetchEpisodes } from '../services/rssService';
import { Episode } from '../components/EpisodeCard';
import EpisodeHeader from '../components/episode/EpisodeHeader';
import EpisodeDescription from '../components/episode/EpisodeDescription';
import EpisodeShare from '../components/episode/EpisodeShare';
import EpisodeNotFound from '../components/episode/EpisodeNotFound';
import YouTubeEmbed from '../components/episode/YouTubeEmbed';
import DigitalPopCallout from '../components/episode/DigitalPopCallout';
import { formatDate, formatDescription } from '../utils/formatters';
import { createSlugFromTitle, getEpisodeIdFromSlug } from '../utils/urlUtils';
import SEOHead from '../components/SEO/SEOHead';
import { generateEpisodeSEO } from '../utils/seoUtils';

const EpisodeDetail = () => {
  // We now support both URL formats: /episodes/:id and /podcasts/:slug
  const { id, slug } = useParams<{ id?: string; slug?: string }>();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState<string | null>(null);
  
  useEffect(() => {
    const loadEpisode = async () => {
      try {
        let fetchedEpisode: Episode | undefined;
        
        if (id) {
          // If we have an ID, fetch by ID
          fetchedEpisode = await fetchEpisodeById(id);
          
          // If found, redirect to the new URL format if this is from the old URL pattern
          if (fetchedEpisode && window.location.pathname.startsWith('/episodes/')) {
            const newSlug = fetchedEpisode.slug || createSlugFromTitle(fetchedEpisode.title, fetchedEpisode.episodeNumber);
            setRedirect(`/podcasts/${newSlug}`);
            return;
          }
        } else if (slug) {
          // If we have a slug, first try to find the episode ID from custom details
          const episodeId = getEpisodeIdFromSlug(slug);
          
          if (episodeId) {
            fetchedEpisode = await fetchEpisodeById(episodeId);
          } else {
            // If not found in custom details, fetch all episodes and find by generating a slug
            const allEpisodes = await fetchEpisodes();
            fetchedEpisode = allEpisodes.find(ep => 
              slug === (ep.slug || createSlugFromTitle(ep.title, ep.episodeNumber))
            );
          }
        }
        
        if (fetchedEpisode) {
          setEpisode(fetchedEpisode);
          
          // Show toast if this episode has a YouTube video
          if (fetchedEpisode.youtubeId) {
            toast({
              title: "Video Available",
              description: "This episode includes a YouTube video you can watch below.",
            });
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch episode:', error);
        setIsLoading(false);
      }
    };
    
    loadEpisode();
  }, [id, slug]);
  
  // Handle redirect to the new URL format
  if (redirect) {
    return <Navigate to={redirect} replace />;
  }

  // Generate SEO metadata for the episode
  const seoData = episode ? generateEpisodeSEO(episode) : null;
  
  return (
    <div className="min-h-screen flex flex-col bg-space-gradient bg-fixed">
      {/* SEO Head - Only render if we have episode data */}
      {episode && seoData && (
        <SEOHead
          title={seoData.title}
          description={seoData.description}
          keywords={seoData.keywords}
          image={seoData.image}
          url={seoData.url}
          type="episode"
          publishedTime={episode.publishDate}
          author="Ryan Poplin"
          podcastData={{
            episodeNumber: episode.episodeNumber,
            duration: episode.duration,
            audioUrl: episode.audioUrl
          }}
        />
      )}
      
      <Header />
      
      <main className="flex-grow py-16 px-6">
        <div className="container mx-auto">
          <EpisodeHeader episode={episode} formatDate={formatDate} />
          
          {isLoading ? (
            <div className="bg-white/5 animate-pulse h-64 rounded-xl p-6"></div>
          ) : episode ? (
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-vivid-purple/30">
              {/* Display YouTube video first if available */}
              {episode.youtubeId && (
                <div className="mb-8">
                  <YouTubeEmbed videoId={episode.youtubeId} />
                </div>
              )}
              
              <div className="mb-8">
                <AudioPlayer audioUrl={episode.audioUrl} title={episode.title} />
              </div>
              
              <EpisodeDescription 
                description={episode.description} 
                formatDescription={formatDescription} 
              />
              
              <DigitalPopCallout />
              
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
