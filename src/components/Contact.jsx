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
      className="editorial-section min-h-screen w-full bg-brand-bg relative flex items-center justify-center py-24 px-6 sm:px-10 lg:px-16 border-t border-brand-border/40"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-between min-h-[80vh]">
        
        {/* Top Bar */}
        <div className="flex items-end justify-between border-b border-brand-border/40 pb-6 mb-12 text-left">
          <div>
            <span className="editorial-tag text-xs text-brand-accent tracking-[0.25em] font-semibold block mb-2">
              // GET IN TOUCH
            </span>
            <h2 className="editorial-title text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-brand-textPrimary uppercase leading-none">
              CONTACT
            </h2>
          </div>

          <span className="editorial-number text-5xl sm:text-6xl font-light text-brand-textSecondary/25 tracking-tighter">
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
            <h3 className="editorial-title text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-brand-textPrimary uppercase leading-none mb-6">
              LET'S BUILD<br />
              <span className="text-brand-accent">SOMETHING.</span>
            </h3>

            <p className="font-sans text-base sm:text-lg text-brand-textSecondary max-w-xl mb-10 font-normal">
              Have an idea, research project, or engineering opportunity? Let's connect and build intelligent solutions.
            </p>

            {/* Direct Email Interaction Pill */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 bg-brand-card hover:bg-brand-surface-2 border border-brand-border/80 hover:border-brand-accent/50 px-6 py-3.5 rounded-full font-mono text-sm text-brand-textPrimary transition-all duration-200 shadow-sm"
              >
                <Mail size={16} className="text-brand-accent" />
                <span>{email}</span>
              </a>

              <button
                onClick={handleCopyEmail}
                title="Copy Email to Clipboard"
                className="flex items-center gap-2 border border-brand-border bg-brand-card/60 hover:bg-brand-card px-5 py-3.5 rounded-full font-mono text-xs text-brand-textSecondary hover:text-brand-textPrimary transition-all cursor-pointer"
              >
                {copied ? <Check size={14} className="text-brand-accent" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>

              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 bg-brand-accent text-brand-bg px-6 py-3.5 rounded-full font-semibold font-mono text-xs uppercase tracking-wider transition-all duration-200 hover:shadow-lg hover:shadow-brand-accent/20 cursor-pointer"
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
                className="max-w-xl p-6 rounded-2xl border border-brand-border/80 bg-brand-card/90 backdrop-blur-md mb-12 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] uppercase text-brand-textSecondary block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-brand-bg border border-brand-border rounded-lg px-3.5 py-2 font-sans text-xs text-brand-textPrimary focus:border-brand-accent outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] uppercase text-brand-textSecondary block mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-brand-bg border border-brand-border rounded-lg px-3.5 py-2 font-sans text-xs text-brand-textPrimary focus:border-brand-accent outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase text-brand-textSecondary block mb-1">Message</label>
                  <textarea
                    rows={3}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-brand-bg border border-brand-border rounded-lg px-3.5 py-2 font-sans text-xs text-brand-textPrimary focus:border-brand-accent outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="bg-brand-accent text-brand-bg px-6 py-2.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-brand-border/40">
              <a
                href="https://github.com/BharathKulal"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-brand-border/60 hover:border-brand-accent/50 bg-brand-card/40 hover:bg-brand-card transition-all"
              >
                <div>
                  <span className="editorial-tag text-[9px] text-brand-textSecondary block">CODE REPOSITORY</span>
                  <span className="font-mono text-xs text-brand-textPrimary font-semibold">GitHub</span>
                </div>
                <ArrowUpRight size={14} className="text-brand-textSecondary group-hover:text-brand-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-brand-border/60 hover:border-brand-accent/50 bg-brand-card/40 hover:bg-brand-card transition-all"
              >
                <div>
                  <span className="editorial-tag text-[9px] text-brand-textSecondary block">PROFESSIONAL</span>
                  <span className="font-mono text-xs text-brand-textPrimary font-semibold">LinkedIn</span>
                </div>
                <ArrowUpRight size={14} className="text-brand-textSecondary group-hover:text-brand-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-brand-border/60 hover:border-brand-accent/50 bg-brand-card/40 hover:bg-brand-card transition-all"
              >
                <div>
                  <span className="editorial-tag text-[9px] text-brand-textSecondary block">CREDENTIALS</span>
                  <span className="font-mono text-xs text-brand-textPrimary font-semibold">Resume PDF</span>
                </div>
                <Download size={14} className="text-brand-textSecondary group-hover:text-brand-accent transition-transform" />
              </a>

              <div className="p-4 rounded-xl border border-brand-border/60 bg-brand-card/40 flex flex-col justify-center">
                <span className="editorial-tag text-[9px] text-brand-textSecondary block">TIMEZONE</span>
                <span className="font-mono text-xs text-brand-textPrimary font-semibold">IST (UTC+5:30)</span>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Minimal Bottom Footer */}
        <div className="pt-8 border-t border-brand-border/30 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-brand-textSecondary gap-2">
          <span>BHARATH KULAL // EDITORIAL PORTFOLIO</span>
          <span>DESIGNED & ENGINEERED • 2026</span>
        </div>

      </div>
    </section>
  );
}
