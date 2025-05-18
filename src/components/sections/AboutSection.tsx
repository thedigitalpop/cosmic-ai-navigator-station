
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutSection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="bg-secondary-purple/20 backdrop-blur-sm rounded-2xl p-8 border border-vivid-purple/30">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">About The Podcast</h2>
              <p className="text-white/80 mb-4">
                The AI Marketing Navigator is your compass in the complex journey of artificial intelligence in marketing. 
                Hosted by Alex Carlson, each episode explores new frontiers and provides actionable insights to help your business 
                thrive in this rapidly evolving landscape.
              </p>
              <p className="text-white/80 mb-2">
                Whether you're new to AI marketing or an experienced navigator, our mission is to guide you to success 
                as we help you "keep navigating the AI revolution!"
              </p>
              <p className="text-white/80 mb-6">
                <span className="font-medium">AI Marketing Navigator</span> is produced by <a 
                  href="https://thedigitalpop.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-bright-orange hover:underline"
                >
                  Digital Pop
                </a>
              </p>
              <Button 
                onClick={() => navigate('/about')}
                className="bg-vivid-purple hover:bg-vivid-purple/90 text-white"
              >
                Learn More
              </Button>
            </div>
            
            <div className="flex justify-center">
              <img 
                src="/navigator.svg" 
                alt="Host Avatar" 
                className="max-w-[200px] rounded-full border-4 border-soft-orange/50" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
