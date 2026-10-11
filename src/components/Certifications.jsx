import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { certificates } from '../data/certificatesData';

export default function Certifications() {
  const [filter, setFilter] = useState('ALL');
  const [selectedCert, setSelectedCert] = useState(null);

  // Derive categories from data
  const categories = ['ALL', ...new Set(certificates.map(c => c.category))];
  
  const filteredCerts = filter === 'ALL' 
    ? certificates 
    : certificates.filter(c => c.category === filter);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedCert]);

  const handleNext = (e) => {
    e.stopPropagation();
    const currentIndex = filteredCerts.findIndex(c => c.id === selectedCert.id);
    const nextIndex = (currentIndex + 1) % filteredCerts.length;
    setSelectedCert(filteredCerts[nextIndex]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const currentIndex = filteredCerts.findIndex(c => c.id === selectedCert.id);
    const prevIndex = (currentIndex - 1 + filteredCerts.length) % filteredCerts.length;
    setSelectedCert(filteredCerts[prevIndex]);
  };

  // Scroll Slider Logic
  const sliderRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScrollSlider = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const itemWidth = sliderRef.current.offsetWidth / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
      const index = Math.round(scrollLeft / itemWidth);
      setActiveIndex(index);
    }
  };

  const slideNext = () => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.offsetWidth / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
      sliderRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
    }
  };

  const slidePrev = () => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.offsetWidth / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
      sliderRef.current.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    }
  };

  // Format number to have leading zero
  const formatNum = (num) => (num + 1).toString().padStart(2, '0');

  return (
    <section id="certifications" className="w-full bg-[#080808] text-[#F5F3EF] py-24 sm:py-32 border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header & Custom Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="font-mono text-xs text-[#FF941F] tracking-[0.25em] font-semibold block mb-4 uppercase">
              // CERTIFICATIONS & ACHIEVEMENTS
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#F5F3EF] tracking-tight mb-4 uppercase">
              Certificates &<br />Credentials
            </h2>
            <p className="text-[#929292] text-base max-w-2xl font-normal leading-relaxed">
              Curated verified certifications and specializations in AI, Generative Models, Cloud, and Software Development.
            </p>
          </div>

          {/* Custom Slider Navigation */}
          {filteredCerts.length > 0 && (
            <div className="flex items-center gap-6 shrink-0">
              <div className="flex gap-3">
                <button 
                  onClick={slidePrev}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#F5F3EF] hover:bg-white/[0.05] hover:border-[#FF941F]/60 transition-all cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={slideNext}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#F5F3EF] hover:bg-white/[0.05] hover:border-[#FF941F]/60 transition-all cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="font-mono flex items-baseline gap-2 select-none">
                <span className="text-4xl font-light text-[#F5F3EF] border-b-2 border-[#FF941F] pb-1 leading-none">
                  {formatNum(activeIndex)}
                </span>
                <span className="text-lg text-[#929292]">
                  / {formatNum(filteredCerts.length - 1)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Filters */}
        {categories.length > 2 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setActiveIndex(0);
                  if (sliderRef.current) sliderRef.current.scrollLeft = 0;
                }}
                className={`font-mono text-xs px-4 py-2 rounded-full transition-all duration-300 border ${
                  filter === cat 
                    ? 'bg-[#FF941F] text-[#080808] border-[#FF941F] font-bold' 
                    : 'bg-[#111111] text-[#929292] border-white/10 hover:border-[#FF941F]/50 hover:text-[#F5F3EF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Certificates Grid / Slider */}
        <div 
          ref={sliderRef}
          onScroll={handleScrollSlider}
          className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-8 lg:pb-12 hide-scrollbar scroll-smooth"
        >
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedCert(cert)}
                className="w-[85vw] sm:w-[45vw] lg:w-[calc(33.333%-16px)] shrink-0 snap-start bg-[#111111] border border-white/[0.08] rounded-2xl overflow-hidden cursor-pointer group hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#FF941F]/10 hover:border-[#FF941F]/50 transition-all duration-300 flex flex-col"
              >
                {/* Image Preview Container */}
                <div className="w-full aspect-[4/3] bg-[#0c0c0c] relative overflow-hidden border-b border-white/[0.06] flex items-center justify-center p-4">
                  {cert.image ? (
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-contain filter transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-[#929292]/40 font-mono text-xs uppercase flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white/20 animate-pulse" />
                      Pending Upload
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow text-left">
                  <h3 className="font-sans text-xl font-bold text-[#F5F3EF] mb-1 group-hover:text-[#FF941F] transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-[#929292] text-sm mb-4">
                    {cert.issuer}
                  </p>

                  <div className="mt-auto space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[9px] text-[#929292] bg-[#080808] px-2 py-1 rounded border border-white/10">
                        {cert.category}
                      </span>
                      <span className="font-mono text-[9px] text-[#929292] bg-[#080808] px-2 py-1 rounded border border-white/10">
                        {cert.date}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#FF941F] font-semibold tracking-wider flex items-center gap-1">
                        VIEW CREDENTIAL
                      </span>
                      <ArrowRight size={14} className="text-[#929292] group-hover:text-[#FF941F] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setSelectedCert(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 p-2.5 bg-[#111111] text-[#F5F3EF] rounded-full border border-white/15 hover:border-[#FF941F] hover:text-[#FF941F] transition-colors z-50 shadow-xl cursor-pointer"
              onClick={() => setSelectedCert(null)}
            >
              <X size={20} />
            </button>

            {/* Navigation Buttons (Desktop) */}
            {filteredCerts.length > 1 && (
              <>
                <button 
                  onClick={handlePrev}
                  className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-[#111111] text-[#F5F3EF] rounded-full border border-white/15 hover:border-[#FF941F] hover:text-[#FF941F] transition-colors z-50 shadow-xl cursor-pointer"
                >
                  <ChevronLeft size={22} />
                </button>
                <button 
                  onClick={handleNext}
                  className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-[#111111] text-[#F5F3EF] rounded-full border border-white/15 hover:border-[#FF941F] hover:text-[#FF941F] transition-colors z-50 shadow-xl cursor-pointer"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-[#111111] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Image Area */}
              <div className="w-full flex-grow relative bg-[#080808] flex items-center justify-center p-4 sm:p-8 min-h-[40vh] overflow-y-auto">
                {selectedCert.image ? (
                  <img 
                    src={selectedCert.image} 
                    alt={selectedCert.title} 
                    className="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
                  />
                ) : (
                  <div className="text-[#929292] font-mono text-sm uppercase flex flex-col items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-white/20 animate-pulse" />
                    Awaiting Certificate Image
                  </div>
                )}
              </div>

              {/* Modal Details Area */}
              <div className="bg-[#111111] p-6 sm:p-8 border-t border-white/10 shrink-0 text-left">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F3EF] mb-2">
                      {selectedCert.title}
                    </h3>
                    <p className="text-[#929292] text-sm sm:text-base">
                      Issued by <span className="font-semibold text-[#F5F3EF]">{selectedCert.issuer}</span> • {selectedCert.date}
                    </p>
                    {selectedCert.credentialId && (
                      <p className="font-mono text-[10px] sm:text-xs text-[#929292] mt-2 bg-[#080808] inline-block px-3 py-1 rounded border border-white/10">
                        ID: {selectedCert.credentialId}
                      </p>
                    )}
                  </div>
                  
                  {selectedCert.verificationUrl && selectedCert.verificationUrl !== '#' && (
                    <a 
                      href={selectedCert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF941F] text-[#080808] font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#FFB356] transition-colors self-start sm:self-auto shrink-0 shadow-lg shadow-[#FF941F]/20"
                    >
                      Verify Credential
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* CSS snippet for hiding scrollbar horizontally on mobile */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
