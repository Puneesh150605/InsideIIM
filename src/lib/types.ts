export type InvestmentDecision = 'INVEST' | 'PASS' | 'WATCH';
export type InvestmentHorizon = '6-12m' | '1-3y' | '5y+';

export interface FinancialMetrics {
  currentPrice: number;
  targetPrice: number;
  currency: string;
  marketCap: string;
  peRatio: number;
  forwardPE: number;
  revenueYoY: number; // in percentage e.g. 124.5
  ebitdaMargin: number; // e.g. 42.1
  netMargin: number;
  roe: number;
  fcfYield: number;
  debtToEquity: number;
  beta: number;
  high52w: number;
  low52w: number;
}

export interface ProjectionYear {
  year: string;
  revenue: number; // in Billions or Millions
  ebitda: number;
  fcf: number;
}

export interface RadarMetric {
  category: string;
  score: number; // 0 - 100
  benchmark: number; // 0 - 100
  fullMark: number;
}

export interface DCFSensitivity {
  wacc: string;
  terminalGrowth: string;
  impliedPrice: number;
  upsidePct: number;
}

export interface BullBearArgument {
  id: string;
  title: string;
  description: string;
  probability: number; // e.g. 75%
  impact: 'High' | 'Medium' | 'Low';
}

export interface CompetitorPeer {
  name: string;
  ticker: string;
  peRatio: number;
  revGrowth: number;
  margin: number;
  roe: number;
  marketCap: string;
}

export interface SWOTItem {
  category: 'strength' | 'weakness' | 'opportunity' | 'threat';
  title: string;
  description: string;
}

export type AgentName =
  | 'Market Data Collector'
  | 'Competitive Analyst'
  | 'Sentiment & Risk Engine'
  | 'Valuation Modeler'
  | 'Chief Investment Officer';

export interface AgentLog {
  id: string;
  timestamp: string;
  agent: AgentName;
  message: string;
  status: 'active' | 'completed' | 'warning';
}

export interface ResearchReport {
  companyName: string;
  ticker: string;
  sector: string;
  horizon: InvestmentHorizon;
  decision: InvestmentDecision;
  convictionScore: number; // 0 - 100
  summary: string;
  thesis: string[];
  keyCatalysts: string[];
  keyRisks: string[];
  metrics: FinancialMetrics;
  projections: ProjectionYear[];
  radarMetrics: RadarMetric[];
  dcfMatrix: DCFSensitivity[];
  bullCase: BullBearArgument[];
  bearCase: BullBearArgument[];
  peers: CompetitorPeer[];
  swot: SWOTItem[];
  sentimentScore: number; // -100 to +100
  generatedAt: string;
  isLiveLLM?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
