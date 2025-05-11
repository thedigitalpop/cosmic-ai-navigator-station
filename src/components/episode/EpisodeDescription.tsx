
import React from 'react';

interface EpisodeDescriptionProps {
  description: string;
  formatDescription: (description: string) => React.ReactNode;
}

const EpisodeDescription: React.FC<EpisodeDescriptionProps> = ({ 
  description, 
  formatDescription 
}) => {
  return (
    <div className="prose prose-invert max-w-none">
      <h2 className="text-2xl font-bold text-white mb-4">Episode Notes</h2>
      <div className="text-white/80 leading-relaxed">
        {formatDescription(description)}
      </div>
    </div>
  );
};

export default EpisodeDescription;
