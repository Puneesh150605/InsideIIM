'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, Clock, ArrowRight, ShieldCheck, Cpu, LineChart, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
export function SearchSection() {
    const [query, setQuery] = useState('');
    const [horizon, setHorizon] = useState('1-3y');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const router = useRouter();
    const searchContainerRef = useRef(null);
    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }
        const timer = setTimeout(async () => {
            setIsSuggesting(true);
            try {
                const res = await fetch(`/api/suggest?q=${encodeURIComponent(query.trim())}`);
                const data = await res.json();
                if (data && data.suggestions && data.suggestions.length > 0) {
                    setSuggestions(data.suggestions);
                    setShowDropdown(true);
                    setSelectedIndex(-1);
                }
                else {
                    setSuggestions([]);
                    setShowDropdown(false);
                }
            }
            catch {
                setSuggestions([]);
                setShowDropdown(false);
            }
            finally {
                setIsSuggesting(false);
            }
        }, 200);
        return () => clearTimeout(timer);
    }, [query]);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleSearch = (e) => {
        if (e)
            e.preventDefault();
        if (!query.trim() || isSubmitting)
            return;
        setShowDropdown(false);
        setIsSubmitting(true);
        const encoded = encodeURIComponent(query.trim());
        router.push(`/research/${encoded}?horizon=${horizon}`);
    };
    const handleSuggestionClick = (symbol) => {
        setQuery(symbol);
        setShowDropdown(false);
        setIsSubmitting(true);
        const encoded = encodeURIComponent(symbol);
        router.push(`/research/${encoded}?horizon=${horizon}`);
    };
    const handleKeyDown = (e) => {
        if (!showDropdown || suggestions.length === 0)
            return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        }
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        }
        else if (e.key === 'Enter' && selectedIndex >= 0 && selectedIndex < suggestions.length) {
            e.preventDefault();
            handleSuggestionClick(suggestions[selectedIndex].symbol);
        }
        else if (e.key === 'Escape') {
            setShowDropdown(false);
        }
    };
    const handleQuickClick = (ticker) => {
        setQuery(ticker);
        setShowDropdown(false);
        setIsSubmitting(true);
        const encoded = encodeURIComponent(ticker);
        router.push(`/research/${encoded}?horizon=${horizon}`);
    };
    return (<div className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[200px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      {/* Badge */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-6 backdrop-blur-md shadow-lg">
        <Cpu className="w-4 h-4 text-indigo-400 animate-spin-slow"/>
        <span>LangGraph.js 5-Agent Directed State Graph Architecture</span>
      </motion.div>

      {/* Main Title */}
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white font-sans leading-none mb-6">
        Institutional AI <br className="hidden sm:inline"/>
        <span className="text-gradient-primary">Investment Analyst.</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
        Enter any public ticker or private enterprise. Watch our multi-agent committee autonomously audit balance sheets, benchmark moat defenses, run DCF models, and deliver an authoritative <strong className="text-white">INVEST or PASS</strong> verdict.
      </motion.p>

      {/* Search Card */}
      <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="glass-panel p-3 sm:p-4 rounded-3xl shadow-2xl border border-white/15 max-w-3xl mx-auto backdrop-blur-2xl">
        <form onSubmit={handleSearch} className="space-y-4">
          <div ref={searchContainerRef} className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none"/>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown} onFocus={() => { if (suggestions.length > 0)
        setShowDropdown(true); }} placeholder="Enter company or ticker (e.g., Bajaj, Zomato, Reliance, Apple, TCS)..." disabled={isSubmitting} className="w-full pl-12 pr-32 py-4 rounded-2xl glass-input text-base sm:text-lg text-white placeholder:text-slate-500 font-medium disabled:opacity-50 transition-all focus:ring-2 focus:ring-indigo-500/50"/>
            {isSuggesting && (<div className="absolute right-36 pointer-events-none">
                <Loader2 className="w-5 h-5 text-indigo-400 animate-spin"/>
              </div>)}
            <button type="submit" disabled={!query.trim() || isSubmitting} className="absolute right-2 top-2 bottom-2 px-5 sm:px-6 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/30 flex items-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95">
              {isSubmitting ? (<>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="hidden sm:inline">Auditing...</span>
                </>) : (<>
                  <span>Analyze</span>
                  <ArrowRight className="w-4 h-4"/>
                </>)}
            </button>

            {/* Autocomplete Suggestions Dropdown */}
            <AnimatePresence>
              {showDropdown && suggestions.length > 0 && (<motion.div initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} transition={{ duration: 0.15 }} className="absolute left-0 right-0 top-[64px] z-50 overflow-hidden rounded-2xl border border-white/20 bg-[#0c0f18]/95 p-2 shadow-2xl backdrop-blur-3xl text-left">
                  <div className="px-3 py-2 text-[10px] font-bold tracking-wider text-indigo-400 uppercase flex items-center justify-between border-b border-white/10 mb-1.5">
                    <span className="flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400"/>
                      <span>Live Exchange Autocomplete (Dalal Street & Wall Street)</span>
                    </span>
                    <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>100% Real-Time</span>
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                    {suggestions.map((item, idx) => (<button key={item.symbol + idx} type="button" onClick={() => handleSuggestionClick(item.symbol)} className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left transition-all ${selectedIndex === idx
                    ? 'bg-gradient-to-r from-indigo-600/30 via-indigo-600/20 to-purple-600/30 border border-indigo-500/50 text-white shadow-lg shadow-indigo-500/10 scale-[1.01]'
                    : 'hover:bg-white/5 text-slate-200 border border-transparent hover:border-white/10'}`}>
                        <div className="flex flex-col truncate pr-3">
                          <span className="text-sm font-extrabold text-white truncate flex items-center space-x-2">
                            <span>{item.name}</span>
                          </span>
                          <span className="text-[11px] text-slate-400 flex items-center space-x-2 mt-0.5">
                            <span>Ticker: <strong className="text-indigo-300 font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">{item.symbol}</strong></span>
                            <span>•</span>
                            <span className="text-slate-500">{item.type}</span>
                          </span>
                        </div>
                        <div className="flex items-center space-x-2.5 shrink-0">
                          <span className="px-2.5 py-1 rounded-lg bg-white/5 text-[10px] font-black text-slate-300 border border-white/10 tracking-wide">
                            {item.exchange}
                          </span>
                          <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white">
                            <ArrowRight className="w-3.5 h-3.5"/>
                          </div>
                        </div>
                      </button>))}
                  </div>
                  <div className="px-3 py-1.5 mt-1 border-t border-white/5 text-[10px] text-slate-500 flex justify-between items-center">
                    <span>Use <kbd className="px-1 py-0.5 rounded bg-white/10 text-slate-400 font-mono">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-white/10 text-slate-400 font-mono">↓</kbd> to navigate, <kbd className="px-1 py-0.5 rounded bg-white/10 text-slate-400 font-mono">Enter</kbd> to select</span>
                    <span>No stored data • Live prices</span>
                  </div>
                </motion.div>)}
            </AnimatePresence>
          </div>

          {/* Horizon Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 px-2 text-xs text-slate-400">
            <div className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400"/>
              <span className="font-semibold text-slate-300">Investment Horizon:</span>
            </div>
            <div className="flex items-center space-x-2">
              {['6-12m', '1-3y', '5y+'].map((h) => (<button key={h} type="button" onClick={() => setHorizon(h)} className={`px-3 py-1 rounded-lg font-bold transition-all ${horizon === h
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}>
                  {h === '6-12m' ? 'Short (6-12m)' : h === '1-3y' ? 'Growth (1-3y)' : 'Long (5y+)'}
                </button>))}
            </div>
          </div>
        </form>
      </motion.div>

      {/* Trending Quick Picks */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-slate-400 font-medium mr-1 flex items-center">
          <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-400"/>
          High Conviction Demo Targets:
        </span>
        <button onClick={() => handleQuickClick('NVDA')} disabled={isSubmitting} className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-500/40 text-slate-200 hover:text-emerald-300 font-semibold transition-all flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>NVIDIA Corp (NVDA)</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-1 rounded font-bold">STRONG BUY</span>
        </button>
        <button onClick={() => handleQuickClick('ZOMATO')} disabled={isSubmitting} className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-500/40 text-slate-200 hover:text-emerald-300 font-semibold transition-all flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Zomato Ltd (ZOMATO)</span>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-1 rounded font-bold">BUY</span>
        </button>
        <button onClick={() => handleQuickClick('TCS')} disabled={isSubmitting} className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-indigo-500/15 border border-white/10 hover:border-indigo-500/40 text-slate-200 hover:text-indigo-300 font-semibold transition-all flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
          <span>TCS Ltd</span>
          <span className="text-[10px] text-indigo-300 bg-indigo-500/20 px-1 rounded font-bold">INVEST</span>
        </button>
        <button onClick={() => handleQuickClick('AAPL')} disabled={isSubmitting} className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-amber-500/15 border border-white/10 hover:border-amber-500/40 text-slate-200 hover:text-amber-300 font-semibold transition-all flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>Apple Inc (AAPL)</span>
          <span className="text-[10px] text-amber-400 bg-amber-500/20 px-1 rounded font-bold">WATCH</span>
        </button>
      </motion.div>

      {/* Value Pillars */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/30">
            <LineChart className="w-5 h-5"/>
          </div>
          <h3 className="text-base font-bold text-white mb-2">Institutional Quantitative Models</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Automated DCF sensitivity tables, 5-pillar valuation radar scoring, and EBITDA projection trajectories over 5-year horizons.
          </p>
        </div>
        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
            <ShieldCheck className="w-5 h-5"/>
          </div>
          <h3 className="text-base font-bold text-white mb-2">Bull vs. Bear Debate Engine</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            LangGraph agents argue contrary positions, assigning probability weights to tail risks and upside catalysts before rendering a decision.
          </p>
        </div>
        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/30">
            <Cpu className="w-5 h-5"/>
          </div>
          <h3 className="text-base font-bold text-white mb-2">Live Agent Thinking Visualizer</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Watch the AI committee think in real-time. Transparent terminal streaming logs show every balance sheet extraction and reasoning step.
          </p>
        </div>
      </div>
    </div>);
}
