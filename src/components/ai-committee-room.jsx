'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, TrendingUp, TrendingDown, ShieldAlert, Cpu, BarChart2, Shield, DollarSign } from 'lucide-react';
export function AiCommitteeRoom({ report }) {
    const intel = report.committeeIntelligence;
    if (!intel || !intel.votes || intel.votes.length === 0)
        return null;
    const getAgentIcon = (name) => {
        if (name.includes('Market'))
            return <BarChart2 className="w-5 h-5 text-indigo-400"/>;
        if (name.includes('Competitive'))
            return <Shield className="w-5 h-5 text-emerald-400"/>;
        if (name.includes('Sentiment'))
            return <Cpu className="w-5 h-5 text-purple-400"/>;
        return <DollarSign className="w-5 h-5 text-amber-400"/>;
    };
    const getVoteBadge = (vote) => {
        if (vote === 'INVEST') {
            return (<span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
          <TrendingUp className="w-3.5 h-3.5"/>
          <span>INVEST</span>
        </span>);
        }
        if (vote === 'PASS') {
            return (<span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 font-bold text-xs border border-rose-500/30">
          <TrendingDown className="w-3.5 h-3.5"/>
          <span>PASS</span>
        </span>);
        }
        return (<span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
        <ShieldAlert className="w-3.5 h-3.5"/>
        <span>WATCH</span>
      </span>);
    };
    return (<div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Users className="w-5 h-5"/>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">LangGraph AI Committee Intelligence Room</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time specialist agent findings, confidence calibration, and individual votes leading to the final institutional verdict.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
            Committee Size: 5 AI Agents
          </span>
        </div>
      </div>

      {/* Specialist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {intel.votes.map((v, i) => (<motion.div key={v.agent} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }} className="glass-card p-5 rounded-2xl border border-white/10 space-y-3 hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  {getAgentIcon(v.agent)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{v.agent}</h4>
                  <span className="text-[10px] uppercase font-mono text-slate-400">LangGraph Specialist Node</span>
                </div>
              </div>
              {getVoteBadge(v.vote)}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/5">
              {v.rationale}
            </p>

            {/* Confidence Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-slate-400">Calibrated Confidence</span>
                <span className="text-indigo-400 font-bold">{v.confidence}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${v.confidence}%` }} transition={{ duration: 0.8, delay: 0.2 }} className={`h-full rounded-full ${v.confidence >= 85 ? 'bg-emerald-400' : v.confidence >= 70 ? 'bg-indigo-400' : 'bg-amber-400'}`}/>
              </div>
            </div>
          </motion.div>))}
      </div>

      {/* Master Synthesis Footer */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="glass-panel p-6 rounded-2xl border border-indigo-500/40 bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-indigo-900/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-indigo-400"/>
            <h4 className="font-bold text-base text-white">Chief Investment Officer Final Consensus</h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            After confronting the 4 specialist analyses, the Chief Investment Officer synthesized all bull catalysts and tail risks into a final committee verdict of <strong className="text-white font-mono uppercase">{report.decision}</strong> with an alpha conviction score of <strong className="text-indigo-400 font-mono">{report.convictionScore}%</strong>.
          </p>
        </div>
        <div className="shrink-0 flex flex-col items-center justify-center p-4 rounded-xl bg-black/40 border border-white/10 min-w-[140px]">
          <span className="text-[10px] font-mono text-slate-400 uppercase">Master Ruling</span>
          <span className={`text-2xl font-black mt-0.5 ${report.decision === 'INVEST' ? 'text-emerald-400' : report.decision === 'PASS' ? 'text-rose-400' : 'text-amber-400'}`}>
            {report.decision}
          </span>
        </div>
      </motion.div>
    </div>);
}
