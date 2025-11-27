import React from 'react';
import { Heart, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Customer Retention AI</h3>
            <p className="text-gray-400">
              Advanced machine learning platform for predicting customer retention
              and optimizing business strategies.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-primary-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#insights" className="hover:text-primary-400 transition-colors">
                  Insights
                </a>
              </li>
              <li>
                <a href="#models" className="hover:text-primary-400 transition-colors">
                  Models
                </a>
              </li>
              <li>
                <a href="#predict" className="hover:text-primary-400 transition-colors">
                  Predict
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="flex items-center justify-center space-x-2">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by the team | © 2025 Customer Retention Analysis</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

