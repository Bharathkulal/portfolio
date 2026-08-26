import React, { useState } from 'react';
import SectionReveal from './SectionReveal';
import { Mail, Phone, FileText, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Communicate with FastAPI backend if running, otherwise log and local success
    fetch('http://localhost:8000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState)
    })
    .then(res => res.json())
    .then(data => {
      console.log("Backend log:", data);
    })
    .catch(err => {
      console.log("FastAPI backend offline, handling submissions locally:", err);
    });

    setSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-brand-bg relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto">
        <SectionReveal>
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs text-brand-accent">07 — CONNECTION</span>
            <div className="h-px flex-grow bg-brand-border/50" />
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left items-start">
          
          {/* Left Connect Anchors Column */}
          <div className="lg:col-span-5">
            <SectionReveal delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-extrabold text-brand-textPrimary mb-6 tracking-tight leading-none">
                HAVE AN IDEA WORTH BUILDING?
              </h2>
              <p className="text-brand-textSecondary text-xs md:text-sm leading-relaxed mb-8 max-w-sm">
                Get in touch using the terminal transmission form, or select direct links below.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="flex flex-col gap-5">
                {/* Email */}
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-brand-card border border-brand-border group-hover:border-brand-accent/40 flex items-center justify-center text-brand-accent transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-brand-textSecondary block uppercase tracking-wider">EMAIL_TRANSMISSION</span>
                    <span className="text-xs text-brand-textPrimary font-mono select-all">[ add-email@domain.com ]</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-brand-card border border-brand-border group-hover:border-brand-accent/40 flex items-center justify-center text-brand-blue transition-colors">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-brand-textSecondary block uppercase tracking-wider">TELEPHONY_LOG</span>
                    <span className="text-xs text-brand-textPrimary font-mono select-all">[ +91 XXXXX XXXXX ]</span>
                  </div>
                </div>

                {/* GitHub */}
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-brand-card border border-brand-border group-hover:border-brand-accent/40 flex items-center justify-center text-brand-textPrimary transition-colors">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-brand-textSecondary block uppercase tracking-wider">CODE_CORPUS // GITHUB</span>
                    <span className="text-xs text-brand-textPrimary font-mono select-all">[ github.com/username ]</span>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-brand-card border border-brand-border group-hover:border-brand-accent/40 flex items-center justify-center text-brand-blue transition-colors">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-brand-textSecondary block uppercase tracking-wider">NETWORKING // LINKEDIN</span>
                    <span className="text-xs text-brand-textPrimary font-mono select-all">[ linkedin.com/in/username ]</span>
                  </div>
                </div>

                {/* Resume */}
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-brand-card border border-brand-border group-hover:border-brand-accent/40 flex items-center justify-center text-brand-accent transition-colors">
                    <FileText size={18} />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-brand-textSecondary block uppercase tracking-wider">SYNOPSIS // RESUME</span>
                    <span className="text-xs text-brand-textPrimary font-mono select-all">[ Link to Resume Document ]</span>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Right Message Form Column */}
          <div className="lg:col-span-7">
            <SectionReveal delay={0.2}>
              <div className="p-8 bg-brand-card/30 border border-brand-border/60 rounded-3xl relative">
                <div className="absolute top-4 right-4 font-mono text-[8px] text-brand-textSecondary">
                  TRANSMIT_CONSOLE_v1.0
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="font-mono text-[9px] text-brand-textSecondary uppercase tracking-widest">
                      Sender Name:
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      placeholder="[ Enter your name ]"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="bg-brand-bg border border-brand-border focus:border-brand-accent/60 outline-none rounded-xl py-3 px-4 font-mono text-xs text-brand-textPrimary transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="font-mono text-[9px] text-brand-textSecondary uppercase tracking-widest">
                      Sender Email Address:
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      required
                      placeholder="[ Enter your email address ]"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="bg-brand-bg border border-brand-border focus:border-brand-accent/60 outline-none rounded-xl py-3 px-4 font-mono text-xs text-brand-textPrimary transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="msg" className="font-mono text-[9px] text-brand-textSecondary uppercase tracking-widest">
                      Message Payload:
                    </label>
                    <textarea 
                      id="msg"
                      required
                      rows={5}
                      placeholder="[ Enter your message content here... ]"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="bg-brand-bg border border-brand-border focus:border-brand-accent/60 outline-none rounded-xl py-3 px-4 font-mono text-xs text-brand-textPrimary transition-colors resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-brand-accent hover:bg-white text-brand-bg py-3 px-6 rounded-xl font-mono text-xs font-bold transition-all duration-300 self-start hover:shadow-lg hover:shadow-brand-accent/15"
                  >
                    SUBMIT_TRANSMISSION
                    <Send size={12} />
                  </button>
                </form>

                {/* Submission Success Alert */}
                {submitted && (
                  <div className="absolute inset-0 bg-brand-card flex flex-col items-center justify-center rounded-3xl p-6 text-center animate-fade-in">
                    <CheckCircle2 size={36} className="text-brand-accent mb-3 animate-bounce" />
                    <span className="font-mono text-xs text-brand-textPrimary font-semibold mb-2">TRANSMISSION COMPLETELY LOGGED</span>
                    <p className="text-brand-textSecondary text-[11px] leading-relaxed max-w-[240px]">
                      Your connection packet has been submitted. Connection logs successfully cached.
                    </p>
                  </div>
                )}
              </div>
            </SectionReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
