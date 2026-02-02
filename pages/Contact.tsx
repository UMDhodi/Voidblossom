
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="pt-48 pb-64 px-8 md:px-24 flex flex-col items-center">
      <div className="max-w-2xl w-full text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-serif mb-8">Inquiry</h1>
        <p className="text-lg font-light opacity-60">
          For private acquisition, press inquiries, or to be notified of the next batch release.
        </p>
      </div>

      <form className="max-w-xl w-full space-y-12">
        <div className="group border-b border-white/20 focus-within:border-white transition-colors py-4">
          <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-2">Name</label>
          <input 
            type="text" 
            className="w-full bg-transparent border-none outline-none font-serif text-xl"
            placeholder="Identity"
          />
        </div>

        <div className="group border-b border-white/20 focus-within:border-white transition-colors py-4">
          <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-2">Email</label>
          <input 
            type="email" 
            className="w-full bg-transparent border-none outline-none font-serif text-xl"
            placeholder="Vibration@frequency.com"
          />
        </div>

        <div className="group border-b border-white/20 focus-within:border-white transition-colors py-4">
          <label className="block text-[10px] uppercase tracking-widest opacity-40 mb-2">Nature of Inquiry</label>
          <textarea 
            rows={4}
            className="w-full bg-transparent border-none outline-none font-serif text-xl resize-none"
            placeholder="Share your thoughts in the silence..."
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-6 bg-[#F6F5F3] text-[#0E0E0E] uppercase tracking-[0.4em] text-xs font-medium hover:bg-[#C5B358] transition-colors duration-500"
        >
          Send into the void
        </button>
      </form>
    </div>
  );
};

export default Contact;
