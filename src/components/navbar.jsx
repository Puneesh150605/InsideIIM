'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, Settings, Zap, Sparkles, ShieldCheck } from 'lucide-react';
import { ApiKeyModal } from './api-key-modal';
export function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [provider, setProvider] = useState('demo');
    const [apiKey, setApiKey] = useState('');
    useEffect(() => {
        const savedProvider = localStorage.getItem('apexiq_provider');
        const savedKey = localStorage.getItem('apexiq_api_key');
        if (savedProvider)
            setProvider(savedProvider);
        if (savedKey)
            setApiKey(savedKey);
    }, []);
    return (<>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/25 transition-all group-hover:scale-105 group-hover:shadow-indigo-500/40">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#090A0F]">
                <TrendingUp className="h-5 w-5 text-indigo-400 group-hover:text-indigo-300 transition-colors"/>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-black tracking-tight text-white font-mono">APEX<span className="text-gradient-primary">IQ</span></span>
                <span className="rounded-full bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30 uppercase tracking-widest">
                  Inst
                </span>
              </div>
              <span className="text-[10px] text-slate-400 -mt-1 tracking-wider font-sans">Institutional AI Research</span>
            </div>
          </Link>

          {/* Live Market Ticker Pill */}
          <div className="hidden md:flex items-center space-x-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-white">NASDAQ</span>
              <span className="text-emerald-400">18,340.50 (+1.24%)</span>
            </div>
            <div className="h-3 w-[1px] bg-white/15"></div>
            <div className="flex items-center space-x-1.5">
              <span className="font-semibold text-white">NVDA</span>
              <span className="text-emerald-400">$128.50 (+4.52%)</span>
            </div>
            <div className="h-3 w-[1px] bg-white/15"></div>
            <div className="flex items-center space-x-1.5">
              <span className="font-semibold text-white">ZOMATO</span>
              <span className="text-emerald-400">₹264.80 (+3.18%)</span>
            </div>
          </div>

          {/* Settings & Execution Mode Badge */}
          <div className="flex items-center space-x-3">
            <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 transition-all hover:border-white/20">
              {provider === 'demo' ? (<span className="flex items-center space-x-1.5 text-emerald-400">
                  <Zap className="w-3.5 h-3.5 fill-current animate-pulse"/>
                  <span className="hidden sm:inline">Instant Demo Mode</span>
                </span>) : provider === 'gemini' ? (<span className="flex items-center space-x-1.5 text-indigo-400">
                  <Sparkles className="w-3.5 h-3.5 fill-current"/>
                  <span className="hidden sm:inline">Gemini 1.5 Pro</span>
                </span>) : (<span className="flex items-center space-x-1.5 text-purple-400">
                  <ShieldCheck className="w-3.5 h-3.5"/>
                  <span className="hidden sm:inline">OpenAI GPT-4o</span>
                </span>)}
              <Settings className="w-4 h-4 text-slate-400 ml-1"/>
            </button>
          </div>
        </div>
      </header>

      <ApiKeyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} provider={provider} setProvider={setProvider} apiKey={apiKey} setApiKey={setApiKey}/>
    </>);
}
