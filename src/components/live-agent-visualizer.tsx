'use client';

import React, { useEffect, useRef } from 'react';
import { Terminal, Cpu, CheckCircle2, Loader2, AlertTriangle, ArrowRight, Activity, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AgentLog, AgentName } from '../lib/types';

interface LiveAgentVisualizerProps {
  logs: AgentLog[];
  company: string;
  isComplete: boolean;
}

const AGENT_NODES: { id: AgentName; label: string; role: string; icon: string }[] = [
  { id: 'Market Data Collector', label: 'Fundamentals & Market Data', role: 'Equities Analyst', icon: '📊' },
  { id: 'Competitive Analyst', label: 'Competitive & Moat Strategy', role: 'Industry Strategist', icon: '🏰' },
  { id: 'Sentiment & Risk Engine', label: 'Sentiment & Tail Risk Engine', role: 'Hedge Fund Quant', icon: '⚖️' },
  { id: 'Valuation Modeler', label: 'DCF & Multiples Valuation', role: 'Valuation Head', icon: '📐' },
  { id: 'Chief Investment Officer', label: 'CIO Committee Synthesis', role: 'Investment Chair', icon: '🏛️' },
];

export function LiveAgentVisualizer({ logs, company, isComplete }: LiveAgentVisualizerProps) {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  // Determine current active node based on latest logs
  const getAgentStatus = (agentName: AgentName) => {
    const agentLogs = logs.filter((l) => l.agent === agentName);
    if (agentLogs.length === 0) return 'pending';
    const hasError = agentLogs.some((l) => l.status === 'warning');
    if (hasError) return 'warning';
    const isDone = agentLogs.some((l) => l.status === 'completed');
    if (isDone && (isComplete || logs[logs.length - 1].agent !== agentName)) return 'completed';
    return 'active';
  };

  const completedCount = AGENT_NODES.filter((n) => getAgentStatus(n.id) === 'completed').length;
  const progressPct = isComplete ? 100 : Math.max(15, Math.round((completedCount / AGENT_NODES.length) * 100));

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-xs font-semibold text-indigo-400">
          <Activity className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
          <span>Live Autonomous Committee Execution</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-white font-sans">
          Auditing <span className="text-gradient-primary">{company}</span>
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Watch our 5 specialized LangGraph AI agents gather fundamentals, construct financial models, and debate risk-reward in real-time.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-300 flex items-center">
            <Cpu className="w-4 h-4 mr-1.5 text-indigo-400" />
            LangGraph Pipeline Status: <span className="text-indigo-400 ml-1">{isComplete ? 'Analysis Compiled & Approved' : `Phase ${completedCount + 1} of 5 Active`}</span>
          </span>
          <span className="text-white font-mono">{progressPct}%</span>
        </div>
        <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Animated DAG Node Map */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {AGENT_NODES.map((node, idx) => {
          const status = getAgentStatus(node.id);
          return (
            <div
              key={node.id}
              className={`relative p-4 rounded-2xl border transition-all ${
                status === 'active'
                  ? 'bg-indigo-500/15 border-indigo-500/50 glow-indigo scale-105 z-10'
                  : status === 'completed'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : status === 'warning'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-white/5 border-white/10 opacity-60'
              }`}
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold font-mono text-slate-400">0{idx + 1}</span>
                {status === 'active' && <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />}
                {status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                {status === 'pending' && <span className="w-2 h-2 rounded-full bg-white/20"></span>}
              </div>

              <div className="text-2xl mb-1">{node.icon}</div>
              <h4 className="text-xs font-bold text-white leading-snug">{node.label}</h4>
              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{node.role}</span>

              {/* Connecting Arrow for desktop */}
              {idx < AGENT_NODES.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-500">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Live Terminal Console */}
      <div className="glass-panel rounded-2xl border border-white/15 overflow-hidden shadow-2xl">
        <div className="bg-[#090A0F]/90 px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            <span className="text-xs font-mono font-bold text-slate-300 ml-2 flex items-center">
              <Terminal className="w-3.5 h-3.5 mr-1.5 text-indigo-400" />
              ApexIQ LangGraph Terminal (Live State Stream)
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {logs.length} logs recorded
          </span>
        </div>

        <div
          ref={terminalRef}
          className="p-4 h-64 overflow-y-auto font-mono text-xs space-y-2 bg-[#06070a]"
        >
          <AnimatePresence>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-start space-x-2 py-1 border-b border-white/[0.03] ${
                  log.status === 'warning'
                    ? 'text-amber-400'
                    : log.status === 'active'
                    ? 'text-indigo-300 font-semibold'
                    : 'text-slate-300'
                }`}
              >
                <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
                <span className="font-bold shrink-0 text-indigo-400">[{log.agent}]:</span>
                <span className="break-all">{log.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>

          {!isComplete && (
            <div className="flex items-center space-x-2 text-indigo-400 animate-pulse pt-2 font-semibold">
              <span>&gt; LangGraph graph processing state transitions...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
