import { Annotation } from '@langchain/langgraph';
import {
  InvestmentHorizon,
  AgentLog,
  FinancialMetrics,
  ProjectionYear,
  CompetitorPeer,
  SWOTItem,
  BullBearArgument,
  RadarMetric,
  DCFSensitivity,
  ResearchReport
} from '../types';

export const ResearchStateAnnotation = Annotation.Root({
  company: Annotation<string>({
    reducer: (_, next) => next,
    default: () => '',
  }),
  horizon: Annotation<InvestmentHorizon>({
    reducer: (_, next) => next,
    default: () => '1-3y',
  }),
  apiKey: Annotation<string | undefined>({
    reducer: (_, next) => next,
    default: () => undefined,
  }),
  provider: Annotation<'gemini' | 'openai' | 'demo'>({
    reducer: (_, next) => next,
    default: () => 'demo',
  }),
  logs: Annotation<AgentLog[]>({
    reducer: (curr, next) => [...curr, ...next],
    default: () => [],
  }),
  marketData: Annotation<{
    ticker?: string;
    sector?: string;
    metrics?: FinancialMetrics;
    projections?: ProjectionYear[];
    rawSummary?: string;
  }>({
    reducer: (curr, next) => ({ ...curr, ...next }),
    default: () => ({}),
  }),
  competitiveData: Annotation<{
    peers?: CompetitorPeer[];
    swot?: SWOTItem[];
    moatAnalysis?: string;
  }>({
    reducer: (curr, next) => ({ ...curr, ...next }),
    default: () => ({}),
  }),
  sentimentData: Annotation<{
    sentimentScore?: number;
    bullCase?: BullBearArgument[];
    bearCase?: BullBearArgument[];
    keyRisks?: string[];
    macroAnalysis?: string;
  }>({
    reducer: (curr, next) => ({ ...curr, ...next }),
    default: () => ({}),
  }),
  valuationData: Annotation<{
    radarMetrics?: RadarMetric[];
    dcfMatrix?: DCFSensitivity[];
    impliedTargetPrice?: number;
    valuationThesis?: string;
  }>({
    reducer: (curr, next) => ({ ...curr, ...next }),
    default: () => ({}),
  }),
  finalReport: Annotation<ResearchReport | null>({
    reducer: (_, next) => next,
    default: () => null,
  }),
  error: Annotation<string | undefined>({
    reducer: (_, next) => next,
    default: () => undefined,
  }),
});

export type ResearchState = typeof ResearchStateAnnotation.State;
