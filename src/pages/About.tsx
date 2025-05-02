
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Rocket, Star, Navigation } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-space-gradient bg-fixed">
      <Header />
      
      <main className="flex-grow py-16 px-6">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">About AI Marketing Navigator</h1>
          
          {/* Mission Section */}
          <div className="bg-secondary-purple/20 backdrop-blur-sm rounded-2xl p-8 border border-vivid-purple/30 mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-white/80 mb-4">
                  At AI Marketing Navigator, our mission is to demystify the complex world of AI marketing and make it accessible to businesses of all sizes. We believe that artificial intelligence is revolutionizing the marketing landscape, and we're here to be your guide through this new frontier.
                </p>
                <p className="text-white/80">
                  Through in-depth interviews, case studies, and practical advice, we help marketers understand how to leverage AI tools effectively, ethically, and strategically.
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
                  Meet Captain AI (aka Alex Innovations), your guide through the cosmos of AI marketing. With over a decade of experience in digital marketing and a passion for emerging technologies, Alex brings expert insights and a sense of adventure to each episode.
                </p>
                <p className="text-white/80">
                  As an early adopter of AI marketing tools and strategies, Alex has helped numerous businesses transform their marketing approach and achieve stellar results in this new frontier.
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
          
          {/* Topics Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Cosmic Topics We Explore</h2>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-vivid-purple/30">
                <div className="bg-vivid-purple rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Rocket className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">AI Strategy</h3>
                <p className="text-white/80">
                  Building comprehensive AI-powered marketing strategies that propel brands forward.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-vivid-purple/30">
                <div className="bg-vivid-purple rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Star className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Content Creation</h3>
                <p className="text-white/80">
                  Using AI tools to create engaging, personalized content at scale.
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-vivid-purple/30">
                <div className="bg-vivid-purple rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Navigation className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Data Analysis</h3>
                <p className="text-white/80">
                  Leveraging AI for deeper insights and more effective campaign optimization.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Begin Your Journey?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Join us as we navigate the exciting universe of AI marketing together. Subscribe to the podcast and never miss an episode.
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
                className="border-white/40 text-white hover:bg-white/10"
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
