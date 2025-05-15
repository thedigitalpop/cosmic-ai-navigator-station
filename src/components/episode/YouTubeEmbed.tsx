
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Youtube } from 'lucide-react';

interface YouTubeEmbedProps {
  videoId: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId }) => {
  if (!videoId) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Youtube className="h-6 w-6 text-red-500" />
        <h2 className="text-2xl font-bold text-white">Watch Episode</h2>
      </div>
      <div className="rounded-lg overflow-hidden border-2 border-bright-orange/30 shadow-lg shadow-bright-orange/10">
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            loading="lazy"
          ></iframe>
        </AspectRatio>
      </div>
    </div>
  );
};

export default YouTubeEmbed;
