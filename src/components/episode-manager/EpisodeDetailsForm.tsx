
import React from 'react';
import { Button } from '@/components/ui/button';
import { Episode } from '@/components/EpisodeCard';
import ThumbnailUploader from './ThumbnailUploader';
import YouTubeUrlInput from './YouTubeUrlInput';
import YouTubePreview from './YouTubePreview';
import { extractYoutubeId } from '@/utils/youtubeUtils';

interface EpisodeDetailsFormProps {
  selectedEpisode: Episode | null;
  youtubeUrl: string;
  thumbnailUrl: string;
  setYoutubeUrl: (url: string) => void;
  setThumbnailUrl: (url: string) => void;
  onSave: () => void;
  onPreview: () => void;
}

const EpisodeDetailsForm: React.FC<EpisodeDetailsFormProps> = ({
  selectedEpisode,
  youtubeUrl,
  thumbnailUrl,
  setYoutubeUrl,
  setThumbnailUrl,
  onSave,
  onPreview,
}) => {
  if (!selectedEpisode) {
    return (
      <div className="text-center py-12">
        <p className="text-white text-xl">Select an episode from the list to edit</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-white mb-4">
        Edit Episode: {selectedEpisode.title}
      </h2>
      
      <div className="space-y-6">
        <YouTubeUrlInput 
          youtubeUrl={youtubeUrl} 
          setYoutubeUrl={setYoutubeUrl} 
        />
        
        <ThumbnailUploader 
          thumbnailUrl={thumbnailUrl}
          setThumbnailUrl={setThumbnailUrl}
        />
        
        {/* Preview Section */}
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-xl font-bold text-white mb-4">Preview</h3>
          
          <YouTubePreview 
            youtubeUrl={youtubeUrl}
            extractYoutubeId={extractYoutubeId}
          />
        </div>
        
        <div className="flex justify-end space-x-4 pt-4">
          <Button 
            variant="outline" 
            className="border-bright-orange text-bright-orange hover:bg-bright-orange hover:text-white"
            onClick={onPreview}
          >
            Preview Episode
          </Button>
          <Button 
            className="bg-bright-orange text-white hover:bg-bright-orange/90"
            onClick={onSave}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </>
  );
};

export default EpisodeDetailsForm;
