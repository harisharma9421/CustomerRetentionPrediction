import React from 'react';
import { TrendingUp, Users, BarChart3, ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToNext = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-full bg-primary-100 dark:bg-primary-900/30 animate-float">
            <TrendingUp className="w-10 h-10 text-primary-600 dark:text-primary-400" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Customer Retention</span>
            <br />
            <span className="text-gray-800 dark:text-gray-200">
              Analysis Platform
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Advanced AI/ML models to predict customer behavior and optimize retention strategies
            for online retail businesses
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg border border-primary-100 dark:border-primary-900/30">
              <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-gray-700 dark:text-gray-300 font-semibold">
                397K+ Transactions
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg border border-primary-100 dark:border-primary-900/30">
              <BarChart3 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-gray-700 dark:text-gray-300 font-semibold">
                8 ML Models
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-lg border border-primary-100 dark:border-primary-900/30">
              <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <span className="text-gray-700 dark:text-gray-300 font-semibold">
                99%+ Accuracy
              </span>
            </div>
          </div>

          <button
            onClick={scrollToNext}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span>Explore Analysis</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

