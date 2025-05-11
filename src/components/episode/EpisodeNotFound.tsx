
import React from 'react';
import { Button } from '@/components/ui/button';

const EpisodeNotFound: React.FC = () => {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-white mb-4">Episode Not Found</h2>
      <p className="text-white/80 mb-6">Sorry, we couldn't find the episode you're looking for.</p>
      <Button onClick={() => window.location.href = '/episodes'} className="bg-bright-orange hover:bg-bright-orange/90 text-white">
        Browse All Episodes
      </Button>
    </div>
  );
};

export default EpisodeNotFound;
