
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EpisodeCard from '../components/EpisodeCard';
import { Input } from '@/components/ui/input';
import { fetchEpisodes } from '../services/rssService';
import { Episode } from '../components/EpisodeCard';
import { Search } from 'lucide-react';

const Episodes = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const loadEpisodes = async () => {
      try {
        const allEpisodes = await fetchEpisodes();
        // Sort episodes by date (newest first)
        const sortedEpisodes = allEpisodes.sort((a, b) => 
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
        setEpisodes(sortedEpisodes);
        setFilteredEpisodes(sortedEpisodes);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch episodes:', error);
        setIsLoading(false);
      }
    };
    
    loadEpisodes();
  }, []);
  
  // Filter episodes based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredEpisodes(episodes);
    } else {
      const filtered = episodes.filter(episode => 
        episode.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        episode.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEpisodes(filtered);
    }
  }, [searchTerm, episodes]);
  
  return (
    <div className="min-h-screen flex flex-col bg-space-gradient bg-fixed">
      <Header />
      
      <main className="flex-grow py-16 px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">All Episodes</h1>
          
          {/* Search and Filter */}
          <div className="mb-8 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input 
              type="text"
              placeholder="Search episodes..."
              className="pl-10 py-6 bg-white/10 border-secondary-purple/50 focus:border-vivid-purple text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Episodes Grid */}
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white/5 animate-pulse h-64 rounded-xl"></div>
              ))}
            </div>
          ) : filteredEpisodes.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredEpisodes.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-white text-xl">No episodes found matching your search.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Episodes;
