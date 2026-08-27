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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans text-slate-900">
      {/* Background Subtle Gradient Blurs */}
      <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] bg-slate-200/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] bg-slate-100/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-slate-200/80 shadow-2xl rounded-3xl p-8 relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent mb-4">
            <ShieldCheck size={26} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-950">Portfolio Console</h2>
          <p className="text-[10px] text-slate-400 mt-1.5 font-mono uppercase tracking-widest">
            ADMINISTRATIVE AUTHENTICATION
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl p-4 mb-6 text-left font-mono">
            Error: {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 text-left">
          <div>
            <label className="block text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-2 font-bold">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bharathkulal.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400/60 focus:border-brand-accent focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-2 font-bold">
              Security Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <Lock size={16} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-900 placeholder-slate-400/60 focus:border-brand-accent focus:bg-white focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-slate-950 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-900 transition-all font-mono uppercase tracking-wider text-xs cursor-pointer disabled:opacity-60 shadow-lg shadow-slate-950/10"
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

      <div className="mt-8 text-center text-[10px] font-mono text-slate-400 tracking-wider">
        SYS_STATUS: READY // SECURED: SSL_SESSION
      </div>
    </div>
  );
}
