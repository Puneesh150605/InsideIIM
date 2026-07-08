'use client';
import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ShieldAlert, Award, ArrowUpRight, Download, MessageSquare, CheckCircle2, Sparkles, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
export function VerdictBanner({ report, onOpenChat }) {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const isInvest = report.decision === 'INVEST';
    const isPass = report.decision === 'PASS';
    const isWatch = report.decision === 'WATCH';
    useEffect(() => {
        if (isInvest) {
            // Celebrate high conviction BUY with confetti!
            const duration = 2.5 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }
                const particleCount = 50 * (timeLeft / duration);
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#10b981', '#6366f1', '#a5b4fc'],
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#10b981', '#6366f1', '#a5b4fc'],
                });
            }, 250);
            return () => clearInterval(interval);
        }
    }, [isInvest]);
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    const upside = ((report.metrics.targetPrice - report.metrics.currentPrice) / report.metrics.currentPrice) * 100;
    const exportMemo = () => {
        const markdown = `# ApexIQ Institutional Investment Memo: ${report.companyName} (${report.ticker})
**Date**: ${new Date().toLocaleDateString()}
**Sector**: ${report.sector}
**Horizon**: ${report.horizon}
**Decision**: ${report.decision} (Alpha Conviction: ${report.convictionScore}%)
**Current Price**: ${report.metrics.currency}${report.metrics.currentPrice} | **Target Price**: ${report.metrics.currency}${report.metrics.targetPrice} (${upside >= 0 ? '+' : ''}${upside.toFixed(1)}%)

---

## 1. Executive Summary
${report.summary}

## 2. Core Investment Thesis
${report.thesis.map((t, idx) => `${idx + 1}. ${t}`).join('\n')}

## 3. Key Catalysts
${report.keyCatalysts.map((c, idx) => `- ${c}`).join('\n')}

## 4. Key Risks & Headwinds
${report.keyRisks.map((r, idx) => `- ${r}`).join('\n')}

---
*Prepared by ApexIQ Institutional Research Committee*
`;
        const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ApexIQ_Memo_${report.ticker}_${new Date().toISOString().slice(0, 10)}.md`;
        a.click();
        URL.revokeObjectURL(url);
    };
    const toggleAudioBriefing = () => {
        if (!('speechSynthesis' in window)) {
            alert('Text-to-speech is not supported in this browser.');
            return;
        }
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
        else {
            window.speechSynthesis.cancel();
            const text = `ApexIQ Institutional Briefing for ${report.companyName}, symbol ${report.ticker}. Our committee verdict is ${report.decision} with an alpha conviction score of ${report.convictionScore} percent. Current price is ${report.metrics.currency}${report.metrics.currentPrice}, with a quantitative target of ${report.metrics.currency}${report.metrics.targetPrice}, representing ${upside >= 0 ? 'an upside' : 'a downside'} of ${upside.toFixed(1)} percent. Summary: ${report.summary}`;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };
    return (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border transition-all ${isInvest
            ? 'glass-panel border-emerald-500/50 glow-emerald bg-gradient-to-br from-[#090A0F] via-[#0E1714] to-[#090A0F]'
            : isPass
                ? 'glass-panel border-rose-500/50 glow-rose bg-gradient-to-br from-[#090A0F] via-[#170E10] to-[#090A0F]'
                : 'glass-panel border-amber-500/50 glow-amber bg-gradient-to-br from-[#090A0F] via-[#17140E] to-[#090A0F]'}`}>
      {/* Background Icon Watermark */}
      <div className="absolute -right-6 -bottom-6 opacity-5 pointer-events-none">
        {isInvest ? (<TrendingUp className="w-64 h-64 text-emerald-400"/>) : isPass ? (<TrendingDown className="w-64 h-64 text-rose-400"/>) : (<ShieldAlert className="w-64 h-64 text-amber-400"/>)}
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left: Company & Verdict */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-white border border-white/10 uppercase tracking-wider">
              {report.sector}
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-xs font-bold text-indigo-300 border border-indigo-500/30">
              Horizon: {report.horizon}
            </span>
            {report.isLiveLLM && (<span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-[11px] font-bold text-purple-300 border border-purple-500/30 flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-purple-300 mr-1"/>
                Live Quantitative Feeds
              </span>)}
          </div>

          <div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {report.companyName} <span className="text-slate-400 font-mono text-2xl sm:text-4xl">({report.ticker})</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {report.summary}
            </p>
            
            {/* Core Thesis Bullets */}
            <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5"/>
                Key Investment Drivers:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {report.thesis.map((point, i) => (<li key={i} className="text-xs sm:text-sm text-slate-200 flex items-start space-x-2 bg-white/5 p-2 rounded-lg border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Metrics & Verdict Box */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-end gap-4 w-full lg:w-auto">
          {/* Verdict Box */}
          <div className={`flex flex-col items-center justify-center p-6 rounded-2xl border text-center shadow-2xl w-full sm:w-64 ${isInvest
            ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300 shadow-emerald-500/20'
            : isPass
                ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 shadow-rose-500/20'
                : 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-amber-500/20'}`}>
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-300 mb-1">Committee Verdict</span>
            <div className="flex items-center space-x-2">
              {isInvest && <TrendingUp className="w-8 h-8 text-emerald-400"/>}
              {isPass && <TrendingDown className="w-8 h-8 text-rose-400"/>}
              {isWatch && <ShieldAlert className="w-8 h-8 text-amber-400"/>}
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{report.decision}</span>
            </div>
            <div className="mt-2 flex items-center space-x-1.5 text-xs font-bold bg-black/40 px-3 py-1 rounded-full border border-white/10">
              <Award className="w-3.5 h-3.5 text-indigo-400"/>
              <span>Conviction Score: {report.convictionScore}%</span>
            </div>
          </div>

          {/* Upside & Valuation Box */}
          <div className="glass-card p-4 rounded-2xl border border-white/10 w-full sm:w-64 text-center space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/10 pb-2">
              <span>Current Price:</span>
              <span className="font-bold text-white font-mono">{report.metrics.currency}{report.metrics.currentPrice}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Implied Target:</span>
              <span className="font-bold text-indigo-400 font-mono text-sm">{report.metrics.currency}{report.metrics.targetPrice}</span>
            </div>
            <div className="pt-2 flex items-center justify-center space-x-1 font-bold text-sm">
              <span>Expected Upside:</span>
              <span className={`font-mono flex items-center ${upside >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {upside >= 0 ? '+' : ''}{upside.toFixed(1)}%
                <ArrowUpRight className="w-4 h-4 ml-0.5"/>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-2 w-full sm:w-64 pt-1">
            <button onClick={toggleAudioBriefing} className={`flex-1 flex items-center justify-center space-x-1 py-2.5 px-2 rounded-xl border font-bold text-xs transition-all ${isSpeaking
            ? 'bg-purple-500/40 border-purple-400 text-white animate-pulse glow-purple'
            : 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/40 text-purple-300'}`}>
              <Volume2 className="w-4 h-4"/>
              <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
            </button>
            <button onClick={onOpenChat} className="flex-1 flex items-center justify-center space-x-1 py-2.5 px-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-indigo-300 font-bold text-xs transition-all">
              <MessageSquare className="w-4 h-4"/>
              <span>Grill AI</span>
            </button>
            <button onClick={exportMemo} className="flex-1 flex items-center justify-center space-x-1 py-2.5 px-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs transition-all shadow-sm">
              <Download className="w-4 h-4"/>
              <span>Memo MD</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>);
}
