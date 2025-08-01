import React, { useState } from 'react';
import { generateImageAlt } from '../../utils/seoUtils';

interface ImageWithSEOProps {
  src: string;
  episodeTitle?: string;
  episodeNumber?: number;
  customAlt?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  onError?: () => void;
}

const ImageWithSEO: React.FC<ImageWithSEOProps> = ({
  src,
  episodeTitle,
  episodeNumber,
  customAlt,
  className = '',
  width,
  height,
  loading = 'lazy',
  onError
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate SEO-optimized alt text
  const altText = customAlt || 
    (episodeTitle ? generateImageAlt(episodeTitle, episodeNumber) : 'AI Navigator Station podcast');

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Fallback image for podcast thumbnails
  const fallbackSrc = '/podcast-placeholder.jpg';

  if (imageError) {
    return (
      <div className={`bg-vivid-purple/20 flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <div className="text-2xl mb-2">🎙️</div>
          <div className="text-sm text-muted-foreground">Podcast Episode</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-vivid-purple/10 animate-pulse rounded-lg" />
      )}
      <img
        src={src || fallbackSrc}
        alt={altText}
        width={width}
        height={height}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        className={`${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ${className}`}
      />
    </div>
  );
};

export default ImageWithSEO;