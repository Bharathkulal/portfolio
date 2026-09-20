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

  return (
    <section id="certifications" className="w-full bg-brand-bg py-24 sm:py-32 border-t border-brand-border/40 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-xs text-brand-accent tracking-[0.25em] font-semibold block mb-4 uppercase">
            // CERTIFICATIONS
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-textPrimary tracking-tight mb-4 uppercase">
            Certificates &<br />Achievements
          </h2>
          <p className="text-brand-textSecondary text-base max-w-2xl font-normal leading-relaxed">
            A collection of courses, programs and credentials I've completed to continuously upgrade my skills and knowledge.
          </p>
        </div>

        {/* Filters */}
        {categories.length > 2 && (
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-mono text-xs px-4 py-2 rounded-full transition-all duration-300 border ${
                  filter === cat 
                    ? 'bg-brand-textPrimary text-brand-bg border-brand-textPrimary' 
                    : 'bg-transparent text-brand-textSecondary border-brand-border/60 hover:border-brand-accent hover:text-brand-textPrimary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Certificates Grid / Mobile Scroll */}
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 md:grid-cols-2 gap-6 snap-x snap-mandatory pb-8 lg:pb-0 hide-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
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
                className="min-w-[85vw] sm:min-w-[45vw] lg:min-w-0 snap-center bg-brand-card border border-brand-border/80 rounded-2xl overflow-hidden cursor-pointer group hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-accent/5 hover:border-brand-accent/40 transition-all duration-300 flex flex-col"
              >
                {/* Image Preview Container */}
                <div className="w-full aspect-[4/3] bg-brand-bg relative overflow-hidden border-b border-brand-border/40 flex items-center justify-center p-4">
                  {cert.image ? (
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-contain filter transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-brand-textSecondary/40 font-mono text-xs uppercase flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-border animate-pulse" />
                      Pending Upload
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-sans text-xl font-bold text-brand-textPrimary mb-1 group-hover:text-brand-accent transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-brand-textSecondary text-sm mb-4">
                    {cert.issuer}
                  </p>

                  <div className="mt-auto space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[9px] text-brand-textSecondary bg-brand-bg px-2 py-1 rounded border border-brand-border/60">
                        {cert.category}
                      </span>
                      <span className="font-mono text-[9px] text-brand-textSecondary bg-brand-bg px-2 py-1 rounded border border-brand-border/60">
                        {cert.date}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-brand-border/50 flex items-center justify-between">
                      <span className="font-mono text-[10px] text-brand-accent font-semibold tracking-wider flex items-center gap-1">
                        VIEW CERTIFICATE
                      </span>
                      <ArrowRight size={14} className="text-brand-textSecondary group-hover:text-brand-accent group-hover:translate-x-1 transition-transform" />
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
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-textPrimary/90 backdrop-blur-sm p-4 sm:p-8"
            onClick={() => setSelectedCert(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 p-2 bg-brand-bg text-brand-textPrimary rounded-full hover:bg-brand-accent hover:text-white transition-colors z-50 shadow-lg"
              onClick={() => setSelectedCert(null)}
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons (Desktop mostly) */}
            {filteredCerts.length > 1 && (
              <>
                <button 
                  onClick={handlePrev}
                  className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-brand-bg text-brand-textPrimary rounded-full hover:bg-brand-accent hover:text-white transition-colors z-50 shadow-lg"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={handleNext}
                  className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-brand-bg text-brand-textPrimary rounded-full hover:bg-brand-accent hover:text-white transition-colors z-50 shadow-lg"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-brand-bg rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Image Area */}
              <div className="w-full flex-grow relative bg-[#EAF4FB] flex items-center justify-center p-4 sm:p-8 min-h-[40vh] overflow-y-auto">
                {selectedCert.image ? (
                  <img 
                    src={selectedCert.image} 
                    alt={selectedCert.title} 
                    className="max-w-full max-h-full object-contain shadow-lg"
                  />
                ) : (
                  <div className="text-brand-textSecondary font-mono text-sm uppercase flex flex-col items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-brand-border animate-pulse" />
                    Awaiting Certificate Image
                  </div>
                )}
              </div>

              {/* Modal Details Area */}
              <div className="bg-brand-card p-6 sm:p-8 border-t border-brand-border/60 shrink-0">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-brand-textPrimary mb-2">
                      {selectedCert.title}
                    </h3>
                    <p className="text-brand-textSecondary text-sm sm:text-base">
                      Issued by <span className="font-semibold text-brand-textPrimary">{selectedCert.issuer}</span> • {selectedCert.date}
                    </p>
                    {selectedCert.credentialId && (
                      <p className="font-mono text-[10px] sm:text-xs text-brand-textSecondary mt-2 bg-brand-bg inline-block px-2 py-1 rounded border border-brand-border/40">
                        ID: {selectedCert.credentialId}
                      </p>
                    )}
                  </div>
                  
                  {selectedCert.verificationUrl && selectedCert.verificationUrl !== '#' && (
                    <a 
                      href={selectedCert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-brand-textPrimary text-brand-bg font-medium rounded-full hover:bg-brand-accent transition-colors self-start sm:self-auto shrink-0"
                    >
                      Verify Credential
                      <ExternalLink size={16} />
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
