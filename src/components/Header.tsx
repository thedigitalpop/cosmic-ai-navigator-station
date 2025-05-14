
import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLovableEnvironment, setIsLovableEnvironment] = useState(false);
  
  // Check if we're in the Lovable environment
  useEffect(() => {
    // Always show the episode manager link for development purposes
    // This makes it easier to access during development
    setIsLovableEnvironment(true);
  }, []);
  
  return (
    <header className="bg-black/30 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-white font-bold text-2xl">
          AI Marketing<span className="text-bright-orange">Navigator</span>
        </Link>
        
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? "text-bright-orange" : "text-white hover:text-bright-orange transition-colors"
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/episodes" 
            className={({ isActive }) => 
              isActive ? "text-bright-orange" : "text-white hover:text-bright-orange transition-colors"
            }
          >
            Episodes
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              isActive ? "text-bright-orange" : "text-white hover:text-bright-orange transition-colors"
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/subscribe" 
            className={({ isActive }) => 
              isActive ? "text-bright-orange" : "text-white hover:text-bright-orange transition-colors"
            }
          >
            Subscribe
          </NavLink>
          {isLovableEnvironment && (
            <NavLink 
              to="/episode-manager" 
              className={({ isActive }) => 
                isActive ? "text-bright-orange" : "text-white hover:text-bright-orange transition-colors"
              }
            >
              Manage Episodes
            </NavLink>
          )}
          <a 
            href="https://digitalpop.online" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-bright-orange hover:text-bright-orange/80 transition-colors"
          >
            Digital Pop
          </a>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-space-gradient absolute w-full">
          <nav className="flex flex-col space-y-4 p-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? "text-bright-orange" : "text-white hover:text-bright-orange transition-colors"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/episodes" 
              className={({ isActive }) => 
                isActive ? "text-bright-orange" : "text-white hover:text-bright-orange transition-colors"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Episodes
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive ? "text-bright-orange" : "text-white hover:text-bright-orange transition-colors"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink 
              to="/subscribe" 
              className={({ isActive }) => 
                isActive ? "text-bright-orange" : "text-white hover:text-bright-orange transition-colors"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Subscribe
            </NavLink>
            {isLovableEnvironment && (
              <NavLink 
                to="/episode-manager" 
                className={({ isActive }) => 
                  isActive ? "text-bright-orange" : "text-white hover:text-bright-orange transition-colors"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Manage Episodes
              </NavLink>
            )}
            <a 
              href="https://digitalpop.online" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-bright-orange hover:text-bright-orange/80 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Digital Pop
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
