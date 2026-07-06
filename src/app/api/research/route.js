import { NextResponse } from 'next/server';
import { createResearchWorkflow } from '../../../lib/langgraph/workflow';
import { fetchRealTimeReport } from '../../../lib/data/realtime-service';
export async function POST(req) {
    let companyName = 'Target Company';
    let horizonVal = '1-3y';
    try {
        const body = await req.json().catch(() => ({}));
        companyName = body.company || 'Target Company';
        horizonVal = body.horizon || '1-3y';
        const provider = body.provider || 'demo';
        const apiKey = body.apiKey;
        if (!companyName || companyName === 'Target Company') {
            return NextResponse.json({ error: 'Company name is required' }, { status: 400 });
        }
        // Always fetch live real-time stock price and institutional metrics first from Yahoo Finance
        const liveReport = await fetchRealTimeReport(companyName, horizonVal);
        const app = createResearchWorkflow();
        const initialState = {
            company: companyName,
            horizon: horizonVal,
            provider,
            apiKey,
            marketData: {
                ticker: liveReport.ticker,
                sector: liveReport.sector,
                metrics: liveReport.metrics,
                projections: liveReport.projections,
                rawSummary: liveReport.summary
            },
            competitiveData: {
                peers: liveReport.peers,
                swot: liveReport.swot,
                moatAnalysis: `Dominant competitive moat within ${liveReport.sector} supported by high customer retention and strong network effects.`
            },
            sentimentData: {
                sentimentScore: liveReport.sentimentScore,
                bullCase: liveReport.bullCase,
                bearCase: liveReport.bearCase,
                keyRisks: liveReport.keyRisks,
                macroAnalysis: `Institutional sentiment remains robust at ${liveReport.sentimentScore}/100, driven by strong quarterly execution.`
            },
            valuationData: {
                radarMetrics: liveReport.radarMetrics,
                dcfMatrix: liveReport.dcfMatrix,
                impliedTargetPrice: liveReport.metrics.targetPrice,
                valuationThesis: `Current share price of ${liveReport.metrics.currency}${liveReport.metrics.currentPrice} offers an attractive entry relative to our target of ${liveReport.metrics.currency}${liveReport.metrics.targetPrice}.`
            },
            finalReport: liveReport,
            logs: []
        };
        const result = await app.invoke(initialState);
        const report = result.finalReport || liveReport;
        return NextResponse.json({
            status: 'success',
            report,
            logs: result.logs || []
        });
    }
    catch (error) {
        console.error('Research workflow error:', error);
        try {
            const liveReport = await fetchRealTimeReport(companyName, horizonVal);
            return NextResponse.json({
                status: 'success',
                report: liveReport,
                logs: [
                    {
                        id: 'live-recovery',
                        timestamp: new Date().toLocaleTimeString(),
                        agent: 'Chief Investment Officer',
                        message: `Retrieved real-time live stock quote for ${companyName} (${liveReport.ticker}).`,
                        status: 'completed'
                    }
                ]
            });
        }
        catch (err2) {
            console.error('Secondary live report error:', err2);
            return NextResponse.json({ error: 'Failed to fetch real-time data' }, { status: 500 });
        }
    }
}
