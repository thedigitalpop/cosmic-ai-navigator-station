
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { fetchEpisodes } from '../services/rssService';
import { Episode } from '../components/EpisodeCard';
import { saveEpisodeDetails, getCustomEpisodeDetails } from '../services/episodeService';
import { useFileUpload } from '../hooks/use-file-upload';
import { toast } from '@/components/ui/use-toast';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Upload, X } from 'lucide-react';

const EpisodeManager = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { uploadImage } = useFileUpload();

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file",
        description: "Please select an image file",
        variant: "destructive"
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    try {
      const imageUrl = await uploadImage(file);
      setThumbnailUrl(imageUrl);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Failed to upload image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageRemove = () => {
    setThumbnailUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const extractYoutubeId = (url: string) => {
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/i,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/i,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return null;
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
                        selectedEpisode?.id === episode.id
                          ? 'bg-bright-orange text-white'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                      onClick={() => handleEpisodeSelect(episode)}
                    >
                      <div className="font-semibold truncate">{episode.title}</div>
                      <div className="text-xs opacity-70">Episode {episode.episodeNumber}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Episode Details Form */}
            <div className="md:col-span-2 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-vivid-purple/30">
              {selectedEpisode ? (
                <>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Edit Episode: {selectedEpisode.title}
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white mb-2">YouTube URL</label>
                      <Input
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="bg-white/10 border-secondary-purple/50 text-white"
                      />
                      <p className="text-sm text-white/60 mt-1">
                        Enter the full YouTube URL for this episode
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2">Thumbnail Image (16:9 recommended)</label>
                      
                      {/* Hidden file input */}
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        className="hidden" 
                      />
                      
                      {/* Upload UI */}
                      <div className="mt-2">
                        {thumbnailUrl ? (
                          <div className="relative rounded-md overflow-hidden">
                            <AspectRatio ratio={16 / 9} className="bg-black/40">
                              <img 
                                src={thumbnailUrl} 
                                alt="Episode thumbnail preview" 
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                                }}
                              />
                            </AspectRatio>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={handleImageRemove}
                              className="absolute top-2 right-2 h-8 w-8"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            onClick={triggerFileInput}
                            disabled={isUploading}
                            variant="outline"
                            className="w-full h-32 border-dashed border-secondary-purple/50 bg-black/20 hover:bg-black/30 text-white"
                          >
                            <div className="flex flex-col items-center">
                              <Upload className="h-6 w-6 mb-2" />
                              {isUploading ? 'Uploading...' : 'Click to upload thumbnail image'}
                              <p className="text-xs text-white/60 mt-1">PNG, JPG or WebP up to 5MB</p>
                            </div>
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {/* Preview Section */}
                    <div className="border-t border-white/10 pt-6">
                      <h3 className="text-xl font-bold text-white mb-4">Preview</h3>
                      
                      {youtubeUrl && extractYoutubeId(youtubeUrl) && (
                        <div>
                          <p className="text-white mb-2">YouTube Embed:</p>
                          <div className="aspect-w-16 aspect-h-9 bg-black/40 rounded-md overflow-hidden">
                            <iframe
                              src={`https://www.youtube.com/embed/${extractYoutubeId(youtubeUrl)}`}
                              title="YouTube video player"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            ></iframe>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-end space-x-4 pt-4">
                      <Button 
                        variant="outline" 
                        className="border-bright-orange text-bright-orange hover:bg-bright-orange hover:text-white"
                        onClick={handlePreview}
                      >
                        Preview Episode
                      </Button>
                      <Button 
                        className="bg-bright-orange text-white hover:bg-bright-orange/90"
                        onClick={handleSave}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-white text-xl">Select an episode from the list to edit</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EpisodeManager;
