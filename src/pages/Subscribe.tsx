
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  siSpotify, 
  siApplepodcasts, 
  siYoutube, 
  siOvercast, 
  siPocketcasts,
  siAmazonmusic,
  siGooglepodcasts,
  siIheartradio
} from 'simple-icons';
import { toast } from '@/components/ui/use-toast';

const Subscribe = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const platforms = [
    {
      name: "Spotify",
      icon: siSpotify.path,
      link: "https://spotify.com",
      color: "bg-[#1ED760]"
    },
    {
      name: "Apple Podcasts",
      icon: siApplepodcasts.path,
      link: "https://podcasts.apple.com",
      color: "bg-[#872EC4]"
    },
    {
      name: "YouTube",
      icon: siYoutube.path,
      link: "https://www.youtube.com",
      color: "bg-[#FF0000]"
    },
    {
      name: "Amazon Music",
      icon: siAmazonmusic.path,
      link: "https://music.amazon.com",
      color: "bg-[#00A8E1]"
    },
    {
      name: "Overcast",
      icon: siOvercast.path,
      link: "https://overcast.fm",
      color: "bg-[#FC7E0F]"
    },
    {
      name: "Pocket Casts",
      icon: siPocketcasts.path,
      link: "https://pocketcasts.com",
      color: "bg-[#F43E37]"
    },
    {
      name: "Google Podcasts",
      icon: siGooglepodcasts.path,
      link: "https://podcasts.google.com",
      color: "bg-[#4285F4]"
    },
    {
      name: "iHeartRadio",
      icon: siIheartradio.path,
      link: "https://iheart.com",
      color: "bg-[#C6002B]"
    }
  ];

  const handleSubmitEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    toast({
      title: "Subscribed!",
      description: "You've successfully subscribed to our newsletter.",
    });
    setEmailSubmitted(true);
  };
  
  const handleCopyRSS = () => {
    navigator.clipboard.writeText('https://aimarketingnavigator.com/feed/podcast');
    toast({
      title: "RSS Feed Copied!",
      description: "The RSS feed URL has been copied to your clipboard.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-space-gradient bg-fixed">
      <Header />
      
      <main className="flex-grow py-16 px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4 text-center">Subscribe to AI Marketing Navigator</h1>
          <p className="text-white/80 mb-12 text-center max-w-2xl mx-auto">
            Choose your favorite podcast platform to subscribe and never miss an episode on your journey through the cosmos of AI marketing.
          </p>
          
          {/* Platforms Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
            {platforms.map((platform) => (
              <a 
                key={platform.name}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-xl p-6 border border-vivid-purple/30 flex flex-col items-center group"
              >
                <div className={`w-16 h-16 rounded-full ${platform.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <svg 
                    role="img" 
                    viewBox="0 0 24 24" 
                    className="w-8 h-8 fill-white"
                    dangerouslySetInnerHTML={{ __html: platform.icon }}
                  />
                </div>
                <h3 className="text-xl font-bold text-white">{platform.name}</h3>
                <p className="text-bright-orange mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Subscribe Now
                </p>
              </a>
            ))}
          </div>
          
          {/* Newsletter Section */}
          <div className="bg-secondary-purple/30 backdrop-blur-sm rounded-2xl p-8 border border-vivid-purple/30">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Get Episodes in Your Inbox</h2>
            <p className="text-white/80 mb-6 text-center max-w-2xl mx-auto">
              Subscribe to our newsletter and receive new episodes, exclusive content, and AI marketing tips directly to your email.
            </p>
            
            <form className="max-w-md mx-auto" onSubmit={handleSubmitEmail}>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-md bg-white/10 border border-white/30 focus:border-bright-orange focus:outline-none text-white"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-bright-orange hover:bg-bright-orange/90 text-white font-medium px-6 py-3 rounded-md transition-colors"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-white/60 text-sm mt-2">
                We respect your privacy and will never share your information.
              </p>
            </form>
          </div>
          
          {/* RSS Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Direct RSS Feed</h2>
            <p className="text-white/80 mb-4">
              For podcast apps that support direct RSS subscription:
            </p>
            <div className="bg-white/10 py-3 px-4 rounded-md inline-flex items-center gap-2">
              <code className="text-bright-orange">https://aimarketingnavigator.com/feed/podcast</code>
              <button 
                className="bg-vivid-purple hover:bg-vivid-purple/90 text-white text-sm px-2 py-1 rounded"
                onClick={handleCopyRSS}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Subscribe;
