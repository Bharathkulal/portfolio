import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowUpRight, Copy, Check, Send, Download } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);

  const email = "kulalbharath8@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch('https://bharath-portfolio-backend.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });
      if (res.ok) {
        setFormStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setFormStatus('fallback');
      }
    } catch {
      setFormStatus('fallback');
    }
  };

  return (
    <section 
      id="contact" 
      className="editorial-section min-h-screen w-full bg-[#080808] text-[#F5F3EF] relative flex items-center justify-center py-24 px-6 sm:px-10 lg:px-16 border-t border-white/[0.06]"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-between min-h-[80vh]">
        
        {/* Top Bar */}
        <div className="flex items-end justify-between border-b border-white/[0.08] pb-6 mb-12 text-left">
          <div>
            <span className="editorial-tag text-xs text-[#FF941F] tracking-[0.25em] font-semibold block mb-2">
              // GET IN TOUCH
            </span>
            <h2 className="editorial-title text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F5F3EF] uppercase leading-none">
              CONTACT
            </h2>
          </div>

          <span className="editorial-number text-5xl sm:text-6xl font-light text-[#929292]/25 tracking-tighter">
            05
          </span>
        </div>

        {/* Center Main Stage */}
        <div className="my-auto text-left py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Huge Closing Title */}
            <h3 className="editorial-title text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#F5F3EF] uppercase leading-none mb-6">
              LET'S BUILD<br />
              <span className="text-[#FF941F]">SOMETHING.</span>
            </h3>

            <p className="font-sans text-base sm:text-lg text-[#929292] max-w-xl mb-10 font-normal">
              Have an idea, research project, or engineering opportunity? Let's connect and build intelligent solutions.
            </p>

            {/* Direct Email Interaction Pill */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 bg-[#111111] hover:bg-[#181818] border border-white/10 hover:border-[#FF941F]/60 px-6 py-3.5 rounded-full font-mono text-sm text-[#F5F3EF] transition-all duration-200 shadow-sm"
              >
                <Mail size={16} className="text-[#FF941F]" />
                <span>{email}</span>
              </a>

              <button
                onClick={handleCopyEmail}
                title="Copy Email to Clipboard"
                className="flex items-center gap-2 border border-white/10 bg-[#111111]/70 hover:bg-[#161616] px-5 py-3.5 rounded-full font-mono text-xs text-[#929292] hover:text-[#F5F3EF] transition-all cursor-pointer"
              >
                {copied ? <Check size={14} className="text-[#FF941F]" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>

              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 bg-[#FF941F] text-[#080808] px-6 py-3.5 rounded-full font-bold font-mono text-xs uppercase tracking-wider transition-all duration-200 hover:bg-[#FFB356] hover:shadow-lg hover:shadow-[#FF941F]/20 cursor-pointer"
              >
                <Send size={14} />
                <span>{showForm ? 'Hide Form' : 'Send Direct Message'}</span>
              </button>
            </div>

            {/* Inline Fast Message Form (Collapsible) */}
            {showForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleFormSubmit}
                className="max-w-xl p-6 rounded-2xl border border-white/10 bg-[#111111] backdrop-blur-md mb-12 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] uppercase text-[#929292] block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-[#080808] border border-white/10 rounded-lg px-3.5 py-2 font-sans text-xs text-[#F5F3EF] focus:border-[#FF941F] outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase text-[#929292] block mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-[#080808] border border-white/10 rounded-lg px-3.5 py-2 font-sans text-xs text-[#F5F3EF] focus:border-[#FF941F] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase text-[#929292] block mb-1">Message</label>
                  <textarea
                    rows={3}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[#080808] border border-white/10 rounded-lg px-3.5 py-2 font-sans text-xs text-[#F5F3EF] focus:border-[#FF941F] outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="bg-[#FF941F] text-[#080808] px-6 py-2.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#FFB356] cursor-pointer"
                >
                  {formStatus === 'sending' ? 'Sending...' : formStatus === 'success' ? 'Message Sent!' : 'Send Note'}
                </button>
                {formStatus === 'fallback' && (
                  <p className="font-mono text-[11px] text-amber-400 mt-2">
                    Backend offline. Please reach out directly via {email}
                  </p>
                )}
              </motion.form>
            )}

            {/* External Links Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/[0.08]">
              <a
                href="https://github.com/BharathKulal"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-white/[0.08] hover:border-[#FF941F]/60 bg-[#111111]/70 hover:bg-[#161616] transition-all"
              >
                <div>
                  <span className="editorial-tag text-[9px] text-[#929292] block">CODE REPOSITORY</span>
                  <span className="font-mono text-xs text-[#F5F3EF] font-semibold">GitHub</span>
                </div>
                <ArrowUpRight size={14} className="text-[#929292] group-hover:text-[#FF941F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-white/[0.08] hover:border-[#FF941F]/60 bg-[#111111]/70 hover:bg-[#161616] transition-all"
              >
                <div>
                  <span className="editorial-tag text-[9px] text-[#929292] block">PROFESSIONAL</span>
                  <span className="font-mono text-xs text-[#F5F3EF] font-semibold">LinkedIn</span>
                </div>
                <ArrowUpRight size={14} className="text-[#929292] group-hover:text-[#FF941F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-white/[0.08] hover:border-[#FF941F]/60 bg-[#111111]/70 hover:bg-[#161616] transition-all"
              >
                <div>
                  <span className="editorial-tag text-[9px] text-[#929292] block">CREDENTIALS</span>
                  <span className="font-mono text-xs text-[#F5F3EF] font-semibold">Resume PDF</span>
                </div>
                <Download size={14} className="text-[#929292] group-hover:text-[#FF941F] transition-transform" />
              </a>

              <div className="p-4 rounded-xl border border-white/[0.08] bg-[#111111]/70 flex flex-col justify-center">
                <span className="editorial-tag text-[9px] text-[#929292] block">TIMEZONE</span>
                <span className="font-mono text-xs text-[#F5F3EF] font-semibold">IST (UTC+5:30)</span>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Minimal Bottom Footer */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-[#929292] gap-2">
          <span>BHARATH KULAL // CINEMATIC PORTFOLIO</span>
          <span>DESIGNED & ENGINEERED • 2026</span>
        </div>

      </div>
    </section>
  );
}
