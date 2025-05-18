import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Rocket, Star, Navigation, MessageSquare, Book, Users } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-space-gradient bg-fixed">
      <Header />
      
      <main className="flex-grow py-16 px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Welcome to The AI Marketing Navigator!</h1>
          
          {/* Mission Section */}
          <div className="bg-secondary-purple/20 backdrop-blur-sm rounded-2xl p-8 border border-vivid-purple/30 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">About The AI Marketing Navigator</h2>
                <p className="text-white/80 mb-4">
                  Navigating the rapidly evolving landscape of Artificial Intelligence in marketing can be complex. 
                  <span className="font-bold"> The AI Marketing Navigator</span> is your compass in this journey, dedicated to simplifying AI marketing 
                  to help you stay ahead of the curve.
                </p>
                <p className="text-white/80">
                  Hosted by Alex Carlson, this podcast aims to be your guide through the ever-shifting world of AI marketing, 
                  offering valuable insights, practical tips, cutting-edge tools, and effective strategies.
                </p>
              </div>
              
              <div className="flex justify-center">
                <img 
                  src="/planet.svg" 
                  alt="Mission" 
                  className="max-w-[250px] animate-float" 
                />
              </div>
            </div>
          </div>
          
          {/* Host Section */}
          <div className="bg-primary-purple/20 backdrop-blur-sm rounded-2xl p-8 border border-vivid-purple/30 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="md:order-2">
                <h2 className="text-3xl font-bold text-white mb-4">Your Host</h2>
                <p className="text-white/80 mb-4">
                  Meet Alex Carlson, your guide through the cosmos of AI marketing. With expertise in digital marketing 
                  and a passion for emerging technologies, Alex brings expert insights and a sense of adventure to each episode.
                </p>
                <p className="text-white/80">
                  Whether you're looking to understand new AI technologies, implement them in your marketing efforts, 
                  or explore their broader implications, The AI Marketing Navigator is here to help you "keep navigating the AI revolution!"
                </p>
              </div>
              
              <div className="flex justify-center md:order-1">
                <img 
                  src="/navigator.svg" 
                  alt="Host" 
                  className="max-w-[200px] rounded-full border-4 border-bright-orange/50" 
                />
              </div>
            </div>
          </div>
          
          {/* What to Expect Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">What to Expect</h2>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-vivid-purple/30">
                <div className="bg-vivid-purple rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Book className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">In-depth Discussions</h3>
                <p className="text-white/80">
                  Explore the latest AI news, tools (ChatGPT, HeyGen, ElevenLabs, and more), and their practical applications for marketers.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-vivid-purple/30">
                <div className="bg-vivid-purple rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Expert Interviews</h3>
                <p className="text-white/80">
                  Hear from leading experts in AI, marketing, and cybersecurity who share their knowledge and experience.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-vivid-purple/30">
                <div className="bg-vivid-purple rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Rocket className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Practical Guides</h3>
                <p className="text-white/80">
                  Learn through detailed walkthroughs, such as how to create your own AI-generated content.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-vivid-purple/30">
                <div className="bg-vivid-purple rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Star className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Thoughtful Analysis</h3>
                <p className="text-white/80">
                  Engage with discussions on the ethical considerations of AI and the importance of transparency in its use.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-vivid-purple/30">
                <div className="bg-vivid-purple rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Navigation className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Digest Episodes</h3>
                <p className="text-white/80">
                  Get updates on significant developments in the AI space and stay informed of the latest trends.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-vivid-purple/30">
                <div className="bg-vivid-purple rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <MessageSquare className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Community Focus</h3>
                <p className="text-white/80">
                  We value our listener community and encourage feedback and engagement as we explore AI together.
                </p>
              </div>
            </div>
          </div>
          
          {/* Digital Pop Section */}
          <div className="bg-vivid-purple/20 backdrop-blur-sm rounded-2xl p-8 border border-vivid-purple/30 mb-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Brought to You By Digital Pop</h2>
              <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                This podcast is brought to you by Digital Pop, which focuses on delivering AI marketing automation 
                to help small businesses thrive. We're committed to sharing knowledge and fostering understanding 
                in the dynamic field of AI.
              </p>
              <a 
                href="https://thedigitalpop.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-bright-orange hover:underline text-lg font-medium"
              >
                Visit Digital Pop
              </a>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Begin Your Journey?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join us as we explore the exciting possibilities and navigate the challenges of AI in marketing together!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={() => navigate('/episodes')}
                className="bg-bright-orange hover:bg-bright-orange/90 text-white"
              >
                Browse Episodes
              </Button>
              <Button 
                onClick={() => navigate('/subscribe')}
                variant="outline"
                className="border-bright-orange text-bright-orange hover:bg-bright-orange/10"
              >
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
