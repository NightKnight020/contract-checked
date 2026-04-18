'use client';

import { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

const PASSWORD = 'YYZPJS';
const SESSION_KEY = 'acs_authenticated';

export default function ACSLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored === 'true') setAuthenticated(true);
    setChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setInput('');
    }
  };

  if (checking) return null;

  if (authenticated) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#1C2333] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-[#1B4332] rounded-2xl flex items-center justify-center mb-4">
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-800">Restricted Access</h1>
          <p className="text-slate-500 text-sm mt-1 text-center">This page is private. Enter the password to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="Enter password"
              className={`w-full px-4 py-3 rounded-xl border text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] pr-10 ${
                error ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50'
              }`}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">Incorrect password. Please try again.</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#2D6A4F] hover:bg-[#40916C] text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            Access Page
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          <a href="/" className="hover:text-slate-600 transition-colors">← Back to Contract Checked</a>
        </p>
      </div>
    </div>
  );
}
