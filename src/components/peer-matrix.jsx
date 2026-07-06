'use client';
import React from 'react';
import { Users } from 'lucide-react';
export function PeerMatrix({ report }) {
    return (<div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center">
            <Users className="w-5 h-5 mr-2 text-indigo-400"/>
            Competitive Peer Benchmarking
          </h3>
          <p className="text-xs text-slate-400">Relative valuation and efficiency metrics against top sector competitors</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-semibold">
          Sector: {report.sector}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-white/5 text-slate-300 uppercase tracking-wider font-sans border-b border-white/10">
            <tr>
              <th className="py-3 px-4 rounded-tl-xl">Company & Ticker</th>
              <th className="py-3 px-4 font-mono">Market Cap</th>
              <th className="py-3 px-4 font-mono">P/E Ratio</th>
              <th className="py-3 px-4 font-mono">Rev Growth YoY</th>
              <th className="py-3 px-4 font-mono">Margin</th>
              <th className="py-3 px-4 font-mono rounded-tr-xl">ROE (%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05] font-mono">
            {/* Target Company (Highlighted) */}
            <tr className="bg-indigo-500/15 font-bold text-white border-l-4 border-indigo-500">
              <td className="py-3.5 px-4 font-sans flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                <span>{report.companyName} ({report.ticker})</span>
                <span className="px-1.5 py-0.2 rounded bg-indigo-500/30 text-[10px] text-indigo-200">TARGET</span>
              </td>
              <td className="py-3.5 px-4">{report.metrics.marketCap}</td>
              <td className="py-3.5 px-4">{report.metrics.peRatio}x</td>
              <td className="py-3.5 px-4 text-emerald-400">+{report.metrics.revenueYoY}%</td>
              <td className="py-3.5 px-4 text-emerald-400">{report.metrics.ebitdaMargin}%</td>
              <td className="py-3.5 px-4 text-indigo-300">{report.metrics.roe}%</td>
            </tr>

            {/* Peers */}
            {report.peers.map((peer, idx) => (<tr key={idx} className="hover:bg-white/[0.02] text-slate-300 transition-colors">
                <td className="py-3 px-4 font-sans font-semibold text-white">
                  {peer.name} <span className="text-slate-400 font-mono">({peer.ticker})</span>
                </td>
                <td className="py-3 px-4">{peer.marketCap}</td>
                <td className="py-3 px-4">{peer.peRatio <= 0 ? 'N/A' : `${peer.peRatio}x`}</td>
                <td className={`py-3 px-4 ${peer.revGrowth >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {peer.revGrowth >= 0 ? '+' : ''}{peer.revGrowth}%
                </td>
                <td className={`py-3 px-4 ${peer.margin >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {peer.margin}%
                </td>
                <td className={`py-3 px-4 ${peer.roe >= 0 ? 'text-slate-200' : 'text-rose-400'}`}>
                  {peer.roe}%
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>);
}
