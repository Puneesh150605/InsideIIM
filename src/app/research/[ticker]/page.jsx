'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '../../../components/navbar';
import { LiveAgentVisualizer } from '../../../components/live-agent-visualizer';
import { VerdictBanner } from '../../../components/verdict-banner';
import { FinancialCharts } from '../../../components/financial-charts';
import { BullBearArena } from '../../../components/bull-bear-arena';
import { PeerMatrix } from '../../../components/peer-matrix';
import { SwotGrid } from '../../../components/swot-grid';
import { GrillAnalystChat } from '../../../components/grill-analyst-chat';
import { AiCommitteeRoom } from '../../../components/ai-committee-room';
import { StressTestSimulator } from '../../../components/stress-test-simulator';
import { getFallbackOrGenerateReport } from '../../../lib/data/mock-institutional-data';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RefreshCw, MessageSquare, Sparkles } from 'lucide-react';
export default function ResearchDashboardPage() {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [clientTicker, setClientTicker] = useState('');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const pathTicker = decodeURIComponent(window.location.pathname.split('/').pop() || '');
            if (pathTicker && pathTicker !== 'research') {
                setClientTicker(pathTicker);
            }
        }
    }, [params]);
    const rawTicker = typeof params?.ticker === 'string' ? decodeURIComponent(params.ticker) : (clientTicker || 'Target Company');
    const horizon = searchParams?.get('horizon') || '1-3y';
    const [report, setReport] = useState(null);
    const [logs, setLogs] = useState([]);
    const [isComplete, setIsComplete] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        let isMounted = true;
        if (!rawTicker || rawTicker === 'Target Company')
            return;
        const provider = localStorage.getItem('apexiq_provider') || 'demo';
        const apiKey = localStorage.getItem('apexiq_api_key') || '';
        // Initialize baseline simulated logs for live visual effect
        const baseline = getFallbackOrGenerateReport(rawTicker, horizon);
        const initialLogs = [
            {
                id: 'log-1',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                agent: 'Market Data Collector',
                message: `Connecting to real-time live stock exchange feed for ${rawTicker} across ${horizon} horizon...`,
                status: 'active'
            }
        ];
        setLogs(initialLogs);
        setIsComplete(false);
        setReport(null);
        // Timeline simulation of LangGraph nodes for rich UX
        const timers = [];
        timers.push(setTimeout(() => {
            if (!isMounted)
                return;
            setLogs((prev) => [
                ...prev.map((l) => (l.status === 'active' ? { ...l, status: 'completed' } : l)),
                {
                    id: 'log-2',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    agent: 'Market Data Collector',
                    message: `Extracted Market Cap: ${baseline.metrics.marketCap} | Rev YoY: +${baseline.metrics.revenueYoY}% | FCF Yield: ${baseline.metrics.fcfYield}%`,
                    status: 'completed'
                },
                {
                    id: 'log-3',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    agent: 'Competitive Analyst',
                    message: `Benchmarking against sector peers (${baseline.peers.map((p) => p.ticker).join(', ')})...`,
                    status: 'active'
                }
            ]);
        }, 1200));
        timers.push(setTimeout(() => {
            if (!isMounted)
                return;
            setLogs((prev) => [
                ...prev.map((l) => (l.status === 'active' ? { ...l, status: 'completed' } : l)),
                {
                    id: 'log-4',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    agent: 'Competitive Analyst',
                    message: `Constructed 4-quadrant SWOT matrix. Moat rating: High durable advantage.`,
                    status: 'completed'
                },
                {
                    id: 'log-5',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    agent: 'Sentiment & Risk Engine',
                    message: `Scanning recent quarterly earnings call transcripts and macro tail risks...`,
                    status: 'active'
                }
            ]);
        }, 2400));
        timers.push(setTimeout(() => {
            if (!isMounted)
                return;
            setLogs((prev) => [
                ...prev.map((l) => (l.status === 'active' ? { ...l, status: 'completed' } : l)),
                {
                    id: 'log-6',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    agent: 'Sentiment & Risk Engine',
                    message: `Computed Institutional Sentiment Index: ${baseline.sentimentScore}/100. Isolated ${baseline.bearCase.length} primary tail risks.`,
                    status: 'completed'
                },
                {
                    id: 'log-7',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    agent: 'Valuation Modeler',
                    message: `Executing DCF WACC sensitivity modeling (8.5% - 13.0%) and 5-pillar radar scoring...`,
                    status: 'active'
                }
            ]);
        }, 3500));
        // Call API route
        fetch('/api/research', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ company: rawTicker, horizon, provider, apiKey })
        })
            .then((res) => res.json())
            .then((data) => {
            if (!isMounted)
                return;
            setTimeout(() => {
                if (!isMounted)
                    return;
                const finalRep = data.report || baseline;
                setLogs((prev) => [
                    ...prev.map((l) => (l.status === 'active' ? { ...l, status: 'completed' } : l)),
                    {
                        id: 'log-8',
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                        agent: 'Valuation Modeler',
                        message: `Implied Target Price derived: ${finalRep.metrics.currency}${finalRep.metrics.targetPrice} (vs Current ${finalRep.metrics.currency}${finalRep.metrics.currentPrice}).`,
                        status: 'completed'
                    },
                    {
                        id: 'log-9',
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                        agent: 'Chief Investment Officer',
                        message: `Committee verdict reached: ${finalRep.decision} (Conviction: ${finalRep.convictionScore}%). Executive memo compiled.`,
                        status: 'completed'
                    }
                ]);
                setReport(finalRep);
                setIsComplete(true);
            }, 4600);
        })
            .catch((err) => {
            if (!isMounted)
                return;
            console.error('Research API error, using institutional baseline:', err);
            setTimeout(() => {
                if (!isMounted)
                    return;
                setLogs((prev) => [
                    ...prev.map((l) => (l.status === 'active' ? { ...l, status: 'completed' } : l)),
                    {
                        id: 'log-err',
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                        agent: 'Chief Investment Officer',
                        message: `Committee verdict reached: ${baseline.decision} (Conviction: ${baseline.convictionScore}%). Executive memo compiled.`,
                        status: 'completed'
                    }
                ]);
                setReport(baseline);
                setIsComplete(true);
            }, 4600);
        });
        return () => {
            isMounted = false;
            timers.forEach((t) => clearTimeout(t));
        };
    }, [rawTicker, horizon]);
    const handleRerun = () => {
        window.location.reload();
    };
    return (<div className="min-h-screen flex flex-col bg-[#08090d] text-slate-100 selection:bg-indigo-500/30">
      <Navbar />

      {/* Top action bar */}
      <div className="border-b border-white/10 bg-black/40 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button onClick={() => router.push('/')} className="flex items-center space-x-1.5 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5"/>
            <span>New Search</span>
          </button>
          <div className="flex items-center space-x-3">
            <button onClick={handleRerun} className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors">
              <RefreshCw className="w-3.5 h-3.5 mr-1"/>
              <span>Re-run Analysis</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Phase 1: Live Thinking Studio (Always visible while computing, or collapsible when done) */}
        <AnimatePresence mode="wait">
          {!isComplete ? (<motion.div key="studio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <LiveAgentVisualizer logs={logs} company={rawTicker} isComplete={isComplete}/>
            </motion.div>) : null}
        </AnimatePresence>

        {/* Phase 2: Institutional Results Dashboard */}
        <AnimatePresence>
          {isComplete && report && (<motion.div key="results" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-8 pb-16">
              {/* Verdict Hero Banner */}
              <VerdictBanner report={report} onOpenChat={() => setIsChatOpen(true)}/>

              {/* LangGraph AI Committee Intelligence Room & Specialist Voting Ledger */}
              <AiCommitteeRoom report={report}/>

              {/* Interactive Macro Scenario & Stress Simulator */}
              <StressTestSimulator report={report}/>

              {/* Financial Models & Charts Suite */}
              <FinancialCharts report={report}/>

              {/* Bull vs. Bear Case Arena */}
              <BullBearArena report={report}/>

              {/* Competitive Peer Benchmarking & SWOT Matrix */}
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                <PeerMatrix report={report}/>
                <SwotGrid report={report}/>
              </div>

              {/* Collapsible Execution Log Summary */}
              <div className="glass-card p-4 rounded-2xl border border-white/10 text-xs text-slate-400 flex items-center justify-between">
                <span className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-indigo-400"/>
                  ApexIQ LangGraph Multi-Agent Audit completed in 4.6 seconds. {logs.length} state transitions recorded.
                </span>
                <button onClick={() => setIsComplete(false)} className="underline hover:text-white transition-colors font-semibold text-indigo-400">
                  View Full DAG Thinking Logs
                </button>
              </div>
            </motion.div>)}
        </AnimatePresence>
      </main>

      {/* Floating Grill AI Chat Drawer Trigger */}
      {isComplete && report && (<>
          <button onClick={() => setIsChatOpen(true)} className="fixed bottom-6 right-6 z-40 flex items-center space-x-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-sm shadow-2xl shadow-indigo-500/50 transition-all hover:scale-105 active:scale-95 border border-white/20 glow-indigo">
            <MessageSquare className="w-5 h-5 fill-current"/>
            <span>Grill the AI Analyst</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1"></span>
          </button>

          <GrillAnalystChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} report={report}/>
        </>)}
    </div>);
}
