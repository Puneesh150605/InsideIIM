'use client';
import React, { useState } from 'react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { BarChart3, PieChart, Table as TableIcon, TrendingUp, ShieldCheck } from 'lucide-react';
export function FinancialCharts({ report }) {
    const [activeTab, setActiveTab] = useState('projections');
    return (<div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-6">
      {/* Header Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-indigo-400"/>
            Institutional Financial Models & Projections
          </h3>
          <p className="text-xs text-slate-400">Interactive financial simulation and DCF sensitivity modeling</p>
        </div>

        <div className="flex items-center space-x-1 bg-black/40 p-1 rounded-xl border border-white/10">
          <button onClick={() => setActiveTab('projections')} className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'projections'
            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
            : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <TrendingUp className="w-3.5 h-3.5"/>
            <span>Revenue & FCF</span>
          </button>
          <button onClick={() => setActiveTab('radar')} className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'radar'
            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
            : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <PieChart className="w-3.5 h-3.5"/>
            <span>5-Pillar Radar</span>
          </button>
          <button onClick={() => setActiveTab('dcf')} className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'dcf'
            ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
            : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
            <TableIcon className="w-3.5 h-3.5"/>
            <span>DCF Sensitivity</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Projections Chart */}
      {activeTab === 'projections' && (<div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>5-Year Trajectory (Revenue in Billions | FCF & EBITDA in Billions)</span>
            <span className="text-indigo-400 font-semibold">Growth CAGR: ~24.5% Est.</span>
          </div>
          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={report.projections}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorEbitda" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="#64748b" fontSize={11} tickLine={false}/>
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false}/>
                <Tooltip contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px'
            }}/>
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}/>
                <Bar name="Revenue ($B)" dataKey="revenue" fill="url(#colorRev)" radius={[6, 6, 0, 0]}/>
                <Bar name="EBITDA ($B)" dataKey="ebitda" fill="url(#colorEbitda)" radius={[6, 6, 0, 0]}/>
                <Line type="monotone" name="Free Cash Flow ($B)" dataKey="fcf" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5, fill: '#f59e0b' }}/>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Current FY Revenue</span>
              <span className="text-base sm:text-lg font-bold text-white font-mono">${report.projections[0]?.revenue || 60.9}B</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Target FY28 Revenue</span>
              <span className="text-base sm:text-lg font-bold text-indigo-400 font-mono">${report.projections[report.projections.length - 1]?.revenue || 268}B</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">FCF Yield</span>
              <span className="text-base sm:text-lg font-bold text-emerald-400 font-mono">{report.metrics.fcfYield}%</span>
            </div>
          </div>
        </div>)}

      {/* Tab 2: Radar Chart */}
      {activeTab === 'radar' && (<div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>5-Pillar Institutional Quality Benchmarking (0-100 Score)</span>
            <div className="flex items-center space-x-4 font-semibold">
              <span className="flex items-center text-indigo-400"><span className="w-3 h-3 rounded-full bg-indigo-500 mr-1.5"></span>{report.ticker} Score</span>
              <span className="flex items-center text-slate-400"><span className="w-3 h-3 rounded-full bg-slate-500 mr-1.5"></span>Industry Benchmark</span>
            </div>
          </div>
          <div className="h-80 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={report.radarMetrics}>
                <PolarGrid stroke="rgba(255,255,255,0.1)"/>
                <PolarAngleAxis dataKey="category" stroke="#cbd5e1" fontSize={12}/>
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748b" fontSize={10}/>
                <Radar name={report.ticker} dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5}/>
                <Radar name="Benchmark" dataKey="benchmark" stroke="#64748b" fill="#64748b" fillOpacity={0.2}/>
                <Tooltip contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '12px'
            }}/>
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 text-center">
            {report.radarMetrics.map((m, idx) => (<div key={idx} className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-[10px] font-bold text-slate-400 block">{m.category}</span>
                <span className="text-sm font-black text-white font-mono">{m.score}/100</span>
              </div>))}
          </div>
        </div>)}

      {/* Tab 3: DCF Sensitivity Matrix */}
      {activeTab === 'dcf' && (<div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Discounted Cash Flow (DCF) Implied Price Matrix</span>
            <span className="text-emerald-400 font-semibold flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1"/>
              Base Case Highlighted
            </span>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/5 text-slate-300 font-sans uppercase tracking-wider text-[11px] border-b border-white/10">
                <tr>
                  <th className="py-3 px-4">WACC (%)</th>
                  <th className="py-3 px-4">Terminal Growth</th>
                  <th className="py-3 px-4">Implied Share Price</th>
                  <th className="py-3 px-4">Upside / Downside (%)</th>
                  <th className="py-3 px-4 text-right font-sans">Valuation Zone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {report.dcfMatrix.map((row, idx) => {
                const isBase = idx === 1 || idx === 2;
                return (<tr key={idx} className={`transition-colors ${isBase
                        ? 'bg-indigo-500/15 font-bold text-white'
                        : 'hover:bg-white/[0.02] text-slate-300'}`}>
                      <td className="py-3 px-4">{row.wacc}</td>
                      <td className="py-3 px-4">{row.terminalGrowth}</td>
                      <td className="py-3 px-4 text-white">{report.metrics.currency}{row.impliedPrice.toFixed(2)}</td>
                      <td className={`py-3 px-4 ${row.upsidePct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {row.upsidePct >= 0 ? '+' : ''}{row.upsidePct.toFixed(1)}%
                      </td>
                      <td className="py-3 px-4 text-right font-sans">
                        {row.upsidePct > 15 ? (<span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">Undervalued</span>) : row.upsidePct < -5 ? (<span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">Overvalued</span>) : (<span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">Fairly Valued</span>)}
                      </td>
                    </tr>);
            })}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 italic">
            * DCF model assumes 5-year discrete forecast period followed by terminal value calculation using Perpetuity Growth formula.
          </p>
        </div>)}
    </div>);
}
