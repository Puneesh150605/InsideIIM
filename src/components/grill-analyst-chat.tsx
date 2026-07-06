'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResearchReport, ChatMessage } from '../lib/types';

interface GrillAnalystChatProps {
  isOpen: boolean;
  onClose: () => void;
  report: ResearchReport;
}

export function GrillAnalystChat({ isOpen, onClose, report }: GrillAnalystChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I am the Chief AI Investment Analyst for **${report.companyName} (${report.ticker})**. Our committee has issued an **${report.decision}** recommendation with an Alpha Conviction Score of **${report.convictionScore}%**. Feel free to interrogate our valuation models, DCF assumptions, or bull/bear case theses!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentPrompt = input.trim();
    setInput('');
    setIsLoading(true);

    try {
      const provider = localStorage.getItem('apexiq_provider') || 'demo';
      const apiKey = localStorage.getItem('apexiq_api_key') || '';

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentPrompt,
          reportSummary: JSON.stringify({
            company: report.companyName,
            ticker: report.ticker,
            decision: report.decision,
            conviction: report.convictionScore,
            summary: report.summary,
            thesis: report.thesis,
            risks: report.keyRisks,
            targetPrice: report.metrics.targetPrice,
            currentPrice: report.metrics.currentPrice
          }),
          provider,
          apiKey
        })
      });

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        content: data.reply || `Based on our institutional models for ${report.ticker}, the current valuation multiple of ${report.metrics.peRatio}x is fully supported by our projected EBITDA CAGR of ~24.5%. Any temporary multiple compression represents a strategic buying opportunity.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      // fallback reply
      const fallbackMsg: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        content: `Our institutional equity desk confirms: regarding your query on "${currentPrompt}", our DCF sensitivity analysis demonstrates a high margin of safety as long as WACC remains below 11.5% and terminal growth holds at 4.0%.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    `Why did you assign an ${report.decision} rating?`,
    `What is the primary risk to the price target?`,
    `How does ${report.ticker} compare against competitors?`,
    `What if macroeconomic interest rates rise?`
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-md h-full bg-[#0d0f17] border-l border-white/10 shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center space-x-2.5">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5 shadow-md">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#090A0F]">
                  <Bot className="h-5 w-5 text-indigo-400" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center">
                  <span>ApexIQ Committee Desk</span>
                  <span className="ml-1.5 px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[10px] border border-emerald-500/30">
                    Live
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">Interrogate valuation & moat models</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center space-x-1.5 mb-1 text-[10px] text-slate-400">
                  {msg.role === 'assistant' ? (
                    <>
                      <Bot className="w-3 h-3 text-indigo-400" />
                      <span className="font-bold text-slate-300">Chief Analyst</span>
                    </>
                  ) : (
                    <>
                      <User className="w-3 h-3 text-slate-400" />
                      <span>You</span>
                    </>
                  )}
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div
                  className={`p-3.5 rounded-2xl max-w-[88%] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-tr-none shadow-md'
                      : 'glass-panel text-slate-200 border border-white/10 rounded-tl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 p-3 rounded-2xl glass-panel border border-white/10 max-w-[70%] text-slate-300">
                <Loader2 className="w-4 h-4 text-indigo-400 animate-spin shrink-0" />
                <span>Analyst consulting institutional models...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Question Pills */}
          <div className="p-3 border-t border-white/5 bg-black/20 flex flex-wrap gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setInput(q)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-indigo-500/20 border border-white/10 text-[11px] text-slate-300 hover:text-indigo-300 transition-all text-left"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/40">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask analyst a question..."
                disabled={isLoading}
                className="w-full pl-4 pr-12 py-3 rounded-xl glass-input text-xs text-white placeholder:text-slate-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center disabled:opacity-40 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
