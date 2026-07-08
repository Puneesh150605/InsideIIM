# 🤖 ApexIQ — AI Pair-Programming & LLM Development Transcript

This document summarizes the architectural decisions, thought processes, and collaborative prompts executed during the development of **ApexIQ** alongside our AI coding assistant.

---

## Session 1: Real-Time Quantitative Engine & API Integration
**Developer Goal**: Ensure the platform uses real-time market data without stored placeholders or static conviction scores.

### Key Dialogue Log:
- **User Prompt**: *"dont use stored data i want real time data when i am searching bajaj it is showing nvidia use api tell me steps if i have to do something manually... it should show everything in real time not stored"*
- **AI Analysis & Thought Process**:
  - Investigated `realtime-service.js` and discovered that while Yahoo Finance (`yahoo-finance2`) fetched live quotes, fallback scenarios lacked dynamic conviction score differentiation.
  - Engineered a **10-Factor Quantitative Valuation Model** that dynamically computes financial health from live trailing P/E, ROE, debt-to-equity, free cash flow yield, revenue growth, and EBITDA margins.
- **Outcome**: Every company now receives a unique, mathematically verifiable Implied DCF Target Price and Alpha Conviction Score.

---

## Session 2: LangGraph Institutional Committee Synthesis
**Developer Goal**: Build an AI Investment Research Agent that takes a company name, researches it, and decides whether to invest or pass with detailed reasoning.

### Key Dialogue Log:
- **User Prompt**: *"Build an AI Investment Research Agent: it takes a company name, does its research, and decides whether to invest or pass — with the reasoning behind its decision. Tech stack: React or Next.js, Node.js or Next.js, LangChain.js / LangGraph.js."*
- **AI Analysis & Thought Process**:
  - Structured the backend into a **5-Node Directed Acyclic Graph (DAG)** using `@langchain/langgraph`:
    1. `marketDataNode`: Analyzes top-line revenue velocity and EBITDA margins.
    2. `competitiveNode`: Analyzes ROE compounding and competitive moat defensibility.
    3. `sentimentNode`: Analyzes institutional order flow and macro beta volatility.
    4. `valuationNode`: Computes WACC sensitivity and DCF upside target multiples.
    5. `cioNode`: Synthesizes specialist votes into a structured JSON verdict (`decision`, `thesis`, `keyCatalysts`, `keyRisks`).
- **Outcome**: Created `committeeIntelligence` ledger that exposes individual votes, confidence scores (0–100%), and rationales for each of the 5 specialist agents.

---

## Session 3: UI Innovation & Pure JavaScript Migration
**Developer Goal**: Convert codebase to pristine JavaScript (`.js`/`.jsx`) and add jaw-dropping interactive dashboard features.

### Key Dialogue Log:
- **User Prompt**: *"convert to javascripe i dont want to learn typescript"*
- **AI Analysis & Thought Process**:
  - Transpiled all 25 `.ts` and `.tsx` source files into clean ES module JavaScript (`.js` and `.jsx`), replaced `tsconfig.json` with `jsconfig.json`, and configured `next.config.mjs`.
  - Built two new interactive UI components:
    - `AiCommitteeRoom.jsx`: Visualizes the specialist voting ledger.
    - `StressTestSimulator.jsx`: Lets users test macroeconomic shocks (+200 bps WACC hike, +15% revenue boom, -25% recession slump) in real time.
    - Added HTML5 Web Speech API voice synthesis (`Listen 🎙️` button) on the hero banner.
- **Outcome**: Verified zero compilation errors (`npm run build` in 19.1s) and pushed cleanly to GitHub (`main` and `master`).
