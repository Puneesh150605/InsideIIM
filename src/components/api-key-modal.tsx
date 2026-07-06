'use client';

import React, { useState, useEffect } from 'react';
import { Key, ShieldCheck, Zap, X, Check, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: 'gemini' | 'openai' | 'demo';
  setProvider: (p: 'gemini' | 'openai' | 'demo') => void;
  apiKey: string;
  setApiKey: (key: string) => void;
}

export function ApiKeyModal({
  isOpen,
  onClose,
  provider,
  setProvider,
  apiKey,
  setApiKey,
}: ApiKeyModalProps) {
  const [localKey, setLocalKey] = useState(apiKey);
  const [localProvider, setLocalProvider] = useState<'gemini' | 'openai' | 'demo'>(provider);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLocalKey(apiKey);
    setLocalProvider(provider);
  }, [apiKey, provider, isOpen]);

  const handleSave = () => {
    setApiKey(localKey);
    setProvider(localProvider);
    localStorage.setItem('apexiq_provider', localProvider);
    if (localKey) {
      localStorage.setItem('apexiq_api_key', localKey);
    } else {
      localStorage.removeItem('apexiq_api_key');
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl glass-panel border border-white/10 shadow-2xl p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">AI Engine & LLM Configuration</h3>
                <p className="text-xs text-slate-400">Select live LLM execution or Instant Institutional Demo mode</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Provider Selection */}
          <div className="mt-5 space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Select Execution Mode
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setLocalProvider('demo')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  localProvider === 'demo'
                    ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400 glow-emerald'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                <Zap className="w-5 h-5 mb-1 text-emerald-400" />
                <span className="text-xs font-bold">Instant Demo</span>
                <span className="text-[10px] text-slate-400">Zero Latency / No Key</span>
              </button>

              <button
                type="button"
                onClick={() => setLocalProvider('gemini')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  localProvider === 'gemini'
                    ? 'bg-indigo-500/15 border-indigo-500/50 text-indigo-400 glow-indigo'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                <Sparkles className="w-5 h-5 mb-1 text-indigo-400" />
                <span className="text-xs font-bold">Google Gemini</span>
                <span className="text-[10px] text-slate-400">Live 1.5 Pro AI</span>
              </button>

              <button
                type="button"
                onClick={() => setLocalProvider('openai')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  localProvider === 'openai'
                    ? 'bg-purple-500/15 border-purple-500/50 text-purple-400'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                <ShieldCheck className="w-5 h-5 mb-1 text-purple-400" />
                <span className="text-xs font-bold">OpenAI GPT-4o</span>
                <span className="text-[10px] text-slate-400">Live GPT-4o AI</span>
              </button>
            </div>
          </div>

          {/* API Key Input */}
          {localProvider !== 'demo' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-5 space-y-2"
            >
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>{localProvider === 'gemini' ? 'Google Gemini API Key' : 'OpenAI API Key'}</span>
                <span className="text-[10px] text-slate-400 font-normal">Stored locally in browser</span>
              </label>
              <input
                type="password"
                value={localKey}
                onChange={(e) => setLocalKey(e.target.value)}
                placeholder={localProvider === 'gemini' ? 'AIzaSy...' : 'sk-...'}
                className="w-full px-4 py-2.5 rounded-xl glass-input text-sm placeholder:text-slate-500"
              />
              <div className="flex items-start space-x-2 text-[11px] text-slate-400 mt-1">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  If left blank or if rate limit is reached, ApexIQ will automatically fall back to the institutional deep-demo dataset so your research never gets interrupted.
                </p>
              </div>
            </motion.div>
          )}

          {localProvider === 'demo' && (
            <div className="mt-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center space-x-2.5">
              <Sparkles className="w-5 h-5 shrink-0 text-emerald-400 animate-pulse" />
              <p>
                <strong>Instant Institutional Demo Mode selected.</strong> You will get instant, professional 5-agent research reports for NVIDIA, Zomato, Apple, TCS, Tesla, or any custom company without API rate limits!
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 transition-all"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
