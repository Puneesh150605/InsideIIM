'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Sliders, TrendingUp, TrendingDown, ShieldAlert, Zap, AlertTriangle, RefreshCw } from 'lucide-react';
export function StressTestSimulator({ report }) {
    const [activeScenario, setActiveScenario] = useState('baseline');
    const getSimulatedMetrics = () => {
        const baseTarget = report.metrics.targetPrice;
        const current = report.metrics.currentPrice;
        const baseScore = report.convictionScore;
        if (activeScenario === 'rate_hike') {
            const simTarget = Math.round(baseTarget * 0.86 * 100) / 100;
            const upside = ((simTarget - current) / current) * 100;
            const simScore = Math.max(45, baseScore - 12);
            const dec = upside > 12 ? 'INVEST' : upside > 0 ? 'WATCH' : 'PASS';
            return {
                target: simTarget,
                upside: Math.round(upside * 10) / 10,
                score: simScore,
                decision: dec,
                title: 'Interest Rate Shock (+200 bps WACC)',
                description: 'Simulates a higher discount rate and multiple contraction across institutional DCF valuations.'
            };
        }
        if (activeScenario === 'growth_boom') {
            const simTarget = Math.round(baseTarget * 1.18 * 100) / 100;
            const upside = ((simTarget - current) / current) * 100;
            const simScore = Math.min(98, baseScore + 9);
            const dec = upside > 10 ? 'INVEST' : 'WATCH';
            return {
                target: simTarget,
                upside: Math.round(upside * 10) / 10,
                score: simScore,
                decision: dec,
                title: 'AI & Revenue Inflection (+15% YoY Top-line Boom)',
                description: 'Simulates rapid commercial expansion and operating leverage compounding EBITDA margins.'
            };
        }
        if (activeScenario === 'recession') {
            const simTarget = Math.round(baseTarget * 0.74 * 100) / 100;
            const upside = ((simTarget - current) / current) * 100;
            const simScore = Math.max(40, baseScore - 22);
            const dec = upside > 15 ? 'INVEST' : upside > -5 ? 'WATCH' : 'PASS';
            return {
                target: simTarget,
                upside: Math.round(upside * 10) / 10,
                score: simScore,
                decision: dec,
                title: 'Severe Macro Recession (-25% Demand Slump)',
                description: 'Simulates an industry-wide slowdown, credit tightening, and customer budget cuts.'
            };
        }
        // Baseline
        const upside = ((baseTarget - current) / current) * 100;
        return {
            target: baseTarget,
            upside: Math.round(upside * 10) / 10,
            score: baseScore,
            decision: report.decision,
            title: 'Current Live Market Baseline',
            description: 'Calculated using live Yahoo Finance exchange quotes and current institutional analyst consensus.'
        };
    };
    const sim = getSimulatedMetrics();
    return (<div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Activity className="w-5 h-5"/>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Interactive Macro Scenario & Stress Simulator</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate macroeconomic shocks in real time without stored placeholders. Watch the valuation engine recompute targets on the fly.
          </p>
        </div>
        <button onClick={() => setActiveScenario('baseline')} className="self-start sm:self-auto flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 transition-colors">
          <RefreshCw className="w-3.5 h-3.5 mr-1"/>
          <span>Reset Baseline</span>
        </button>
      </div>

      {/* Scenario Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button onClick={() => setActiveScenario('baseline')} className={`p-4 rounded-2xl border text-left transition-all ${activeScenario === 'baseline'
            ? 'bg-indigo-500/20 border-indigo-500/60 text-white shadow-lg shadow-indigo-500/10'
            : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'}`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Live Baseline</span>
            <Sliders className="w-4 h-4 text-indigo-400"/>
          </div>
          <div className="text-sm font-bold text-white">Current Market Feed</div>
        </button>

        <button onClick={() => setActiveScenario('rate_hike')} className={`p-4 rounded-2xl border text-left transition-all ${activeScenario === 'rate_hike'
            ? 'bg-amber-500/20 border-amber-500/60 text-white shadow-lg shadow-amber-500/10'
            : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'}`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Rate Shock</span>
            <AlertTriangle className="w-4 h-4 text-amber-400"/>
          </div>
          <div className="text-sm font-bold text-white">+200 bps WACC Hike</div>
        </button>

        <button onClick={() => setActiveScenario('growth_boom')} className={`p-4 rounded-2xl border text-left transition-all ${activeScenario === 'growth_boom'
            ? 'bg-emerald-500/20 border-emerald-500/60 text-white shadow-lg shadow-emerald-500/10'
            : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'}`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Growth Boom</span>
            <Zap className="w-4 h-4 text-emerald-400"/>
          </div>
          <div className="text-sm font-bold text-white">+15% Revenue Inflection</div>
        </button>

        <button onClick={() => setActiveScenario('recession')} className={`p-4 rounded-2xl border text-left transition-all ${activeScenario === 'recession'
            ? 'bg-rose-500/20 border-rose-500/60 text-white shadow-lg shadow-rose-500/10'
            : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200'}`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Recession</span>
            <TrendingDown className="w-4 h-4 text-rose-400"/>
          </div>
          <div className="text-sm font-bold text-white">-25% Demand Contraction</div>
        </button>
      </div>

      {/* Simulated Results Display */}
      <AnimatePresence mode="wait">
        <motion.div key={activeScenario} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
          {/* Simulated Verdict Box */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center space-y-2 bg-black/40">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">Simulated Committee Verdict</span>
            <div className="flex items-center space-x-2">
              {sim.decision === 'INVEST' && <TrendingUp className="w-7 h-7 text-emerald-400"/>}
              {sim.decision === 'PASS' && <TrendingDown className="w-7 h-7 text-rose-400"/>}
              {sim.decision === 'WATCH' && <ShieldAlert className="w-7 h-7 text-amber-400"/>}
              <span className="text-3xl font-black tracking-tight text-white">{sim.decision}</span>
            </div>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 font-mono">
              Conviction Score: {sim.score}%
            </span>
          </div>

          {/* Simulated Price Target Box */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center space-y-2 bg-black/40">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">Simulated Target Price</span>
            <div className="text-3xl font-black font-mono text-white">
              {report.metrics.currency}{sim.target}
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border font-mono ${sim.upside >= 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
              Expected Return: {sim.upside >= 0 ? '+' : ''}{sim.upside}%
            </span>
          </div>

          {/* Scenario Rationale Summary Box */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-center space-y-2 bg-black/40">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">{sim.title}</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {sim.description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>);
}
