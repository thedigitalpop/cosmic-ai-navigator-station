
import React from 'react';

interface YouTubePreviewProps {
  youtubeUrl: string;
  extractYoutubeId: (url: string) => string | null;
}

const YouTubePreview: React.FC<YouTubePreviewProps> = ({
  youtubeUrl,
  extractYoutubeId,
}) => {
  const youtubeId = extractYoutubeId(youtubeUrl);
  
  if (!youtubeUrl || !youtubeId) {
    return null;
  }
  
  return (
    <div>
      <p className="text-white mb-2">YouTube Embed:</p>
      <div className="aspect-w-16 aspect-h-9 bg-black/40 rounded-md overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};

export default YouTubePreview;
