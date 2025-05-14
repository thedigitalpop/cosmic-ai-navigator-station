
import React from 'react';

interface YouTubeEmbedProps {
  videoId: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId }) => {
  if (!videoId) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">Watch This Episode</h2>
      <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default YouTubeEmbed;
