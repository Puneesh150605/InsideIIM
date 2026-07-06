'use client';
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
export function BullBearArena({ report }) {
    return (<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bull Case Arena */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 space-y-4 bg-gradient-to-b from-[#0e1714]/80 to-transparent">
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <TrendingUp className="w-5 h-5"/>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Bull Case Catalysts</h3>
              <span className="text-[11px] text-emerald-300 font-medium">Upside Drivers & Structural Moat</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
            Upside Bias
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {report.bullCase.map((arg, idx) => (<div key={idx} className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-emerald-400 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
                  {arg.title}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {arg.probability}% Prob
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${arg.impact === 'High' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-500/20 text-slate-300'}`}>
                    {arg.impact} Impact
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {arg.description}
              </p>
            </div>))}
        </div>
      </div>

      {/* Bear Case Arena */}
      <div className="glass-panel p-6 rounded-3xl border border-rose-500/30 space-y-4 bg-gradient-to-b from-[#170e10]/80 to-transparent">
        <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <TrendingDown className="w-5 h-5"/>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Bear Case Tail Risks</h3>
              <span className="text-[11px] text-rose-300 font-medium">Headwinds & Downside Scenarios</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 font-bold text-xs border border-rose-500/30">
            Tail Risk
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {report.bearCase.map((arg, idx) => (<div key={idx} className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-rose-400 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-rose-400 mr-2"></span>
                  {arg.title}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {arg.probability}% Prob
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${arg.impact === 'High' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-500/20 text-slate-300'}`}>
                    {arg.impact} Impact
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {arg.description}
              </p>
            </div>))}
        </div>
      </div>
    </div>);
}
