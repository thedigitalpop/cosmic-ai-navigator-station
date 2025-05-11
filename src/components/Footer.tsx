
import React from 'react';
import { Twitter, Facebook, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary-purple text-white py-10 px-6">
      <div className="container mx-auto grid gap-10 md:grid-cols-3">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">AI Marketing Navigator</h3>
          <p className="text-sm opacity-80">
            Exploring the cosmic frontiers of AI marketing. Join us on this journey through stars, strategies, and success stories.
          </p>
          <p className="text-sm">
            A podcast by <a 
              href="https://thedigitalpop.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-bright-orange hover:underline"
            >
              Digital Pop
            </a>
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Connect</h3>
          <div className="flex space-x-4">
            <a href="https://twitter.com" className="hover:text-bright-orange transition-colors" aria-label="Twitter">
              <Twitter />
            </a>
            <a href="https://facebook.com" className="hover:text-bright-orange transition-colors" aria-label="Facebook">
              <Facebook />
            </a>
            <a href="https://instagram.com" className="hover:text-bright-orange transition-colors" aria-label="Instagram">
              <Instagram />
            </a>
            <a href="mailto:contact@aimarketingnavigator.com" className="hover:text-bright-orange transition-colors" aria-label="Email">
              <Mail />
            </a>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Subscribe</h3>
          <p className="text-sm opacity-80">
            Get the latest episodes delivered to your inbox
          </p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your email" 
              className="px-4 py-2 rounded-l-md focus:outline-none text-gray-800 w-full"
            />
            <button 
              className="bg-bright-orange px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-opacity"
            >
              Go
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto mt-8 pt-6 border-t border-white/20 text-sm opacity-70">
        <p>© {new Date().getFullYear()} AI Marketing Navigator by <a 
          href="https://thedigitalpop.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-bright-orange hover:underline"
        >
          Digital Pop
        </a>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
