import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from './api';
import { ShieldCheck, Lock, Mail, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }
      await api.login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[300px] h-[300px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-brand-card/30 border border-brand-border/60 rounded-3xl p-8 backdrop-blur-md relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-accent/5 border border-brand-accent/30 flex items-center justify-center text-brand-accent mb-4">
            <ShieldCheck size={26} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-brand-textPrimary">Portfolio Console</h2>
          <p className="text-xs text-brand-textSecondary mt-1.5 font-mono uppercase tracking-wider">
            ADMINISTRATIVE AUTHENTICATION
          </p>
        </div>

        {error && (
          <div className="bg-red-500/5 border border-red-500/30 text-red-400 text-xs rounded-xl p-4 mb-6 text-left font-mono">
            Error: {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 text-left">
          <div>
            <label className="block text-[10px] uppercase font-mono tracking-widest text-brand-textSecondary mb-2 font-bold">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-brand-textSecondary">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bharathkulal.com"
                className="w-full bg-black/60 border border-brand-border/60 rounded-xl py-3 pl-11 pr-4 text-sm text-brand-textPrimary placeholder-brand-textSecondary/40 focus:border-brand-accent/40 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-mono tracking-widest text-brand-textSecondary mb-2 font-bold">
              Security Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-brand-textSecondary">
                <Lock size={16} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black/60 border border-brand-border/60 rounded-xl py-3 pl-11 pr-4 text-sm text-brand-textPrimary placeholder-brand-textSecondary/40 focus:border-brand-accent/40 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-brand-accent text-brand-bg font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-accent/90 transition-all font-mono uppercase tracking-wider text-xs cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Validating session...
              </>
            ) : (
              'Access Dashboard'
            )}
          </button>
        </form>
      </div>

      <div className="mt-8 text-center text-[10px] font-mono text-brand-textSecondary tracking-wider">
        SYS_STATUS: READY // ENCRYPTION: SHA-256
      </div>
    </div>
  );
}
