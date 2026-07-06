import { StateGraph, START, END } from '@langchain/langgraph';
import { ResearchStateAnnotation } from './state';
import {
  marketDataNode,
  competitiveNode,
  sentimentNode,
  valuationNode,
  cioNode
} from './agents';

export function createResearchWorkflow() {
  const workflow = new StateGraph(ResearchStateAnnotation)
    .addNode('marketData', marketDataNode)
    .addNode('competitive', competitiveNode)
    .addNode('sentiment', sentimentNode)
    .addNode('valuation', valuationNode)
    .addNode('cio', cioNode)
    // Directed Acyclic Graph (DAG) institutional workflow
    .addEdge(START, 'marketData')
    .addEdge('marketData', 'competitive')
    .addEdge('marketData', 'sentiment')
    .addEdge('competitive', 'valuation')
    .addEdge('sentiment', 'valuation')
    .addEdge('valuation', 'cio')
    .addEdge('cio', END);

  return workflow.compile();
}
