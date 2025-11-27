import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Link
              to="/"
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img 
                src="/assets/logo.png" 
                alt="Logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-2xl font-bold gradient-text">
                Customer Retention AI
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className={`transition-colors ${
                isActive('/') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('insights')}
              className={`transition-colors ${
                isActive('/') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              Insights
            </button>
            <Link
              to="/charts"
              className={`transition-colors ${
                isActive('/charts') ? 'text-primary-600 dark:text-primary-400 font-semibold' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              Charts
            </Link>
            <button
              onClick={() => scrollToSection('models')}
              className={`transition-colors ${
                isActive('/') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              Models
            </button>
            <button
              onClick={() => scrollToSection('model-metrics')}
              className={`transition-colors ${
                isActive('/') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              Metrics
            </button>
            <button
              onClick={() => scrollToSection('predict')}
              className={`transition-colors ${
                isActive('/') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              Predict
            </button>
            <button
              onClick={() => scrollToSection('team')}
              className={`transition-colors ${
                isActive('/') ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              Team
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-slide-up">
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('insights')}
              className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              Insights
            </button>
            <Link
              to="/charts"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              Charts
            </Link>
            <button
              onClick={() => scrollToSection('models')}
              className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              Models
            </button>
            <button
              onClick={() => scrollToSection('model-metrics')}
              className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              Metrics
            </button>
            <button
              onClick={() => scrollToSection('predict')}
              className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              Predict
            </button>
            <button
              onClick={() => scrollToSection('team')}
              className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              Team
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

