
import React from 'react';
import { Button } from '@/components/ui/button';

const EpisodeShare: React.FC = () => {
  return (
    <div className="mt-8 pt-8 border-t border-white/10">
      <h3 className="text-xl font-bold text-white mb-4">Share This Episode</h3>
      <div className="flex space-x-4">
        <Button variant="outline" className="border-white/40 text-white hover:bg-white/10">
          Twitter
        </Button>
        <Button variant="outline" className="border-white/40 text-white hover:bg-white/10">
          Facebook
        </Button>
        <Button variant="outline" className="border-white/40 text-white hover:bg-white/10">
          Copy Link
        </Button>
      </div>
    </div>
  );
};

export default EpisodeShare;
