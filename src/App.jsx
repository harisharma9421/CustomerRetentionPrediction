import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Charts from './pages/Charts';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/charts" element={<Charts />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

