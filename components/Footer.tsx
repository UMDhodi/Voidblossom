
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="px-8 py-16 md:px-24 md:py-32 border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="space-y-8">
          <h2 className="text-2xl font-serif tracking-[0.2em]">VOIDBLOSSOM</h2>
          <p className="text-xs uppercase tracking-[0.3em] opacity-30">© 2024 Essence in Abstentia</p>
        </div>

        <div className="flex gap-16 text-[10px] uppercase tracking-widest opacity-60">
          <div className="flex flex-col gap-4">
            <Link to="/product" className="hover:opacity-100 transition-opacity">Void</Link>
            <Link to="/philosophy" className="hover:opacity-100 transition-opacity">Manifesto</Link>
            <Link to="/about" className="hover:opacity-100 transition-opacity">Makers</Link>
          </div>
          <div className="flex flex-col gap-4">
            <Link to="/contact" className="hover:opacity-100 transition-opacity">Inquiry</Link>
            <a href="#" className="hover:opacity-100 transition-opacity">Legal</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
          </div>
        </div>

        <div className="text-right hidden md:block">
          <p className="text-xs italic opacity-30 leading-relaxed font-serif">
            "We are the space between the notes."
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
