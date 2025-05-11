
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Headphones, Book, Podcast, Rocket } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-primary-purple text-white py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-col items-center sm:items-start mb-4 sm:mb-0">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <Rocket className="h-6 w-6" />
            <span>AI Marketing Navigator</span>
          </Link>
          <div className="text-sm text-white/80 mt-1">
            by <a 
              href="https://thedigitalpop.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-bright-orange hover:underline"
            >
              Digital Pop
            </a>
          </div>
        </div>
        
        <nav>
          <ul className="flex space-x-1 sm:space-x-8">
            <li>
              <Link 
                to="/" 
                className="flex flex-col sm:flex-row items-center p-2 hover:bg-vivid-purple rounded-md transition-colors"
              >
                <Home className="h-5 w-5 sm:mr-1" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/episodes" 
                className="flex flex-col sm:flex-row items-center p-2 hover:bg-vivid-purple rounded-md transition-colors"
              >
                <Headphones className="h-5 w-5 sm:mr-1" />
                <span>Episodes</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="flex flex-col sm:flex-row items-center p-2 hover:bg-vivid-purple rounded-md transition-colors"
              >
                <Book className="h-5 w-5 sm:mr-1" />
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/subscribe" 
                className="flex flex-col sm:flex-row items-center p-2 hover:bg-vivid-purple rounded-md transition-colors"
              >
                <Podcast className="h-5 w-5 sm:mr-1" />
                <span>Subscribe</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
