
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Youtube } from 'lucide-react';

interface YouTubeEmbedProps {
  videoId: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId }) => {
  if (!videoId) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Youtube className="h-5 w-5 text-red-500" />
        <h2 className="text-2xl font-bold text-white">Watch This Episode</h2>
      </div>
      <div className="rounded-lg overflow-hidden border border-white/10">
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
