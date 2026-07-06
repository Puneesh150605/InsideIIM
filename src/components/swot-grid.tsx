'use client';

import React from 'react';
import { Shield, Zap, Target, AlertOctagon } from 'lucide-react';
import { ResearchReport } from '../lib/types';

interface SwotGridProps {
  report: ResearchReport;
}

export function SwotGrid({ report }: SwotGridProps) {
  const strengths = report.swot.filter((s) => s.category === 'strength');
  const weaknesses = report.swot.filter((s) => s.category === 'weakness');
  const opportunities = report.swot.filter((s) => s.category === 'opportunity');
  const threats = report.swot.filter((s) => s.category === 'threat');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center">
            <Target className="w-5 h-5 mr-2 text-indigo-400" />
            Strategic SWOT Matrix
          </h3>
          <p className="text-xs text-slate-400">Institutional assessment of internal competencies and external forces</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="glass-panel p-5 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-transparent space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
            <Shield className="w-4 h-4" />
            <span className="uppercase tracking-wider">Strengths (Internal Advantage)</span>
          </div>
          <div className="space-y-2">
            {strengths.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <h5 className="text-xs font-bold text-white mb-1">{item.title}</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Weaknesses */}
        <div className="glass-panel p-5 rounded-3xl border border-rose-500/20 bg-gradient-to-br from-rose-500/5 to-transparent space-y-3">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
            <AlertOctagon className="w-4 h-4" />
            <span className="uppercase tracking-wider">Weaknesses (Internal Vulnerability)</span>
          </div>
          <div className="space-y-2">
            {weaknesses.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <h5 className="text-xs font-bold text-white mb-1">{item.title}</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities */}
        <div className="glass-panel p-5 rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-transparent space-y-3">
          <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
            <Zap className="w-4 h-4" />
            <span className="uppercase tracking-wider">Opportunities (External Expansion)</span>
          </div>
          <div className="space-y-2">
            {opportunities.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <h5 className="text-xs font-bold text-white mb-1">{item.title}</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Threats */}
        <div className="glass-panel p-5 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent space-y-3">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
            <Target className="w-4 h-4" />
            <span className="uppercase tracking-wider">Threats (External Headwind)</span>
          </div>
          <div className="space-y-2">
            {threats.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <h5 className="text-xs font-bold text-white mb-1">{item.title}</h5>
                <p className="text-[11px] text-slate-300 leading-relaxed font-normal">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
