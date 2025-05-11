
import React from 'react';
import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';

const EpisodeShare: React.FC = () => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const shareOnTwitter = () => {
    const text = "Check out this amazing podcast episode!";
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="mt-8 pt-8 border-t border-white/10">
      <h3 className="text-xl font-bold text-white mb-4">Share This Episode</h3>
      <div className="flex space-x-4">
        <Button 
          variant="outline" 
          className="border-bright-orange text-bright-orange hover:bg-bright-orange hover:text-white flex gap-2 transition-colors"
          onClick={shareOnTwitter}
        >
          <Twitter size={18} />
          Twitter
        </Button>
        <Button 
          variant="outline" 
          className="border-bright-orange text-bright-orange hover:bg-bright-orange hover:text-white flex gap-2 transition-colors"
          onClick={shareOnFacebook}
        >
          <Facebook size={18} />
          Facebook
        </Button>
        <Button 
          variant="outline" 
          className="border-bright-orange text-bright-orange hover:bg-bright-orange hover:text-white flex gap-2 transition-colors"
          onClick={handleCopyLink}
        >
          <LinkIcon size={18} />
          Copy Link
        </Button>
      </div>
    </div>
  );
};

export default EpisodeShare;
