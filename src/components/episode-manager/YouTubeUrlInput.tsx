
import React from 'react';
import { Input } from '@/components/ui/input';

interface YouTubeUrlInputProps {
  youtubeUrl: string;
  setYoutubeUrl: (url: string) => void;
}

const YouTubeUrlInput: React.FC<YouTubeUrlInputProps> = ({
  youtubeUrl,
  setYoutubeUrl,
}) => {
  return (
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
  );
};

export default YouTubeUrlInput;
