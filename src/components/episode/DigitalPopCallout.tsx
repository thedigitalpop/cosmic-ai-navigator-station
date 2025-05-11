
import React from 'react';
import { ExternalLink } from 'lucide-react';

const DigitalPopCallout: React.FC = () => {
  return (
    <div className="bg-vivid-purple/20 backdrop-blur-sm rounded-xl p-6 border border-vivid-purple/30 mt-8">
      <h3 className="text-xl font-bold text-white mb-2">Produced by Digital Pop</h3>
      <p className="text-white/80 mb-4">
        This episode is brought to you by Digital Pop, experts in digital marketing and content creation.
        Discover more innovative marketing insights and services at our website.
      </p>
      <a 
        href="https://thedigitalpop.com" 
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-bright-orange hover:underline"
      >
        Visit Digital Pop <ExternalLink size={16} className="ml-1" />
      </a>
    </div>
  );
};

export default DigitalPopCallout;
