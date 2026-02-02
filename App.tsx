
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import Product from './pages/Product';
import Philosophy from './pages/Philosophy';
import About from './pages/About';
import Contact from './pages/Contact';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      <div className={`min-h-screen bg-[#0E0E0E] text-[#F6F5F3] selection:bg-[#C5B358] selection:text-[#0E0E0E] transition-opacity duration-1000 ${!isLoading ? 'opacity-100' : 'opacity-0'}`}>
        <CustomCursor />
        {!isLoading && <Navbar />}
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/philosophy" element={<Philosophy />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {!isLoading && <Footer />}
      </div>
    </>
  );
};

export default App;
