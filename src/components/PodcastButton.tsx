
import React from 'react';

interface PodcastButtonProps {
  name: string;
  url: string;
  iconPath: string;
}

const PodcastButton: React.FC<PodcastButtonProps> = ({ name, url, iconPath }) => {
  return (
    <a 
      href={url} 
      className="bg-white/10 hover:bg-bright-orange transition-all duration-300 rounded-xl p-4 flex flex-col items-center w-32"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="w-10 h-10 flex items-center justify-center mb-2 text-white">
        <svg 
          role="img" 
          viewBox="0 0 24 24" 
          className="w-10 h-10 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={iconPath} />
        </svg>
      </div>
      <span className="text-white font-medium">{name}</span>
    </a>
  );
};

export default PodcastButton;
