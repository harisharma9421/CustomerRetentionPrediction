import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import Hero from '../components/Hero';
import About from '../components/About';
import Insights from '../components/Insights';
import Models from '../components/Models';
import ModelMetrics from '../components/ModelMetrics';
import Predict from '../components/Predict';
import Team from '../components/Team';
import { generatePDF } from '../utils/pdfExport';

const Home = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleExportPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await generatePDF();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={handleExportPDF}
          disabled={isGeneratingPDF}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white font-semibold px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-slow"
        >
          {isGeneratingPDF ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Export Full Report PDF</span>
            </>
          )}
        </button>
      </div>
      <Hero />
      <About />
      <Insights />
      <Models />
      <ModelMetrics />
      <Predict />
      <Team />
    </>
  );
};

export default Home;

