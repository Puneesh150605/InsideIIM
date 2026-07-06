import { NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance({ suppressNotices: ['yahooSurvey'] });
const POPULAR_INDIAN_GLOBAL = {
    'bajaj finance': { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance Limited', exch: 'NSE' },
    'bajaj auto': { symbol: 'BAJAJ-AUTO.NS', name: 'Bajaj Auto Limited', exch: 'NSE' },
    'bajaj': { symbol: 'BAJFINANCE.NS', name: 'Bajaj Finance Limited', exch: 'NSE' },
    'reliance': { symbol: 'RELIANCE.NS', name: 'Reliance Industries Limited', exch: 'NSE' },
    'reliance industries': { symbol: 'RELIANCE.NS', name: 'Reliance Industries Limited', exch: 'NSE' },
    'tcs': { symbol: 'TCS.NS', name: 'Tata Consultancy Services Limited', exch: 'NSE' },
    'tata consultancy': { symbol: 'TCS.NS', name: 'Tata Consultancy Services Limited', exch: 'NSE' },
    'tata motors': { symbol: 'TATAMOTORS.NS', name: 'Tata Motors Limited', exch: 'NSE' },
    'tata steel': { symbol: 'TATASTEEL.NS', name: 'Tata Steel Limited', exch: 'NSE' },
    'infosys': { symbol: 'INFY.NS', name: 'Infosys Limited', exch: 'NSE' },
    'infy': { symbol: 'INFY.NS', name: 'Infosys Limited', exch: 'NSE' },
    'wipro': { symbol: 'WIPRO.NS', name: 'Wipro Limited', exch: 'NSE' },
    'hdfc': { symbol: 'HDFCBANK.NS', name: 'HDFC Bank Limited', exch: 'NSE' },
    'hdfc bank': { symbol: 'HDFCBANK.NS', name: 'HDFC Bank Limited', exch: 'NSE' },
    'icici': { symbol: 'ICICIBANK.NS', name: 'ICICI Bank Limited', exch: 'NSE' },
    'sbi': { symbol: 'SBIN.NS', name: 'State Bank of India', exch: 'NSE' },
    'airtel': { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel Limited', exch: 'NSE' },
    'bharti': { symbol: 'BHARTIARTL.NS', name: 'Bharti Airtel Limited', exch: 'NSE' },
    'zomato': { symbol: 'ETERNAL.NS', name: 'Eternal Limited (formerly Zomato)', exch: 'NSE' },
    'eternal': { symbol: 'ETERNAL.NS', name: 'Eternal Limited (formerly Zomato)', exch: 'NSE' },
    'blinkit': { symbol: 'ETERNAL.NS', name: 'Eternal Limited (Zomato/Blinkit)', exch: 'NSE' },
    'swiggy': { symbol: 'SWIGGY.NS', name: 'Swiggy Limited', exch: 'NSE' },
    'paytm': { symbol: 'PAYTM.NS', name: 'One 97 Communications (Paytm)', exch: 'NSE' },
    'nykaa': { symbol: 'NYKAA.NS', name: 'FSN E-Commerce Ventures (Nykaa)', exch: 'NSE' },
    'mahindra': { symbol: 'M&M.NS', name: 'Mahindra & Mahindra Limited', exch: 'NSE' },
    'maruti': { symbol: 'MARUTI.NS', name: 'Maruti Suzuki India Limited', exch: 'NSE' },
    'asian paints': { symbol: 'ASIANPAINT.NS', name: 'Asian Paints Limited', exch: 'NSE' },
    'sun pharma': { symbol: 'SUNPHARMA.NS', name: 'Sun Pharmaceutical Industries', exch: 'NSE' },
    'titan': { symbol: 'TITAN.NS', name: 'Titan Company Limited', exch: 'NSE' },
    'hal': { symbol: 'HAL.NS', name: 'Hindustan Aeronautics Limited', exch: 'NSE' },
    'itc': { symbol: 'ITC.NS', name: 'ITC Limited', exch: 'NSE' },
    'l&t': { symbol: 'LT.NS', name: 'Larsen & Toubro Limited', exch: 'NSE' },
    'larsen': { symbol: 'LT.NS', name: 'Larsen & Toubro Limited', exch: 'NSE' },
    'apple': { symbol: 'AAPL', name: 'Apple Inc.', exch: 'NASDAQ' },
    'aapl': { symbol: 'AAPL', name: 'Apple Inc.', exch: 'NASDAQ' },
    'nvidia': { symbol: 'NVDA', name: 'NVIDIA Corporation', exch: 'NASDAQ' },
    'nvda': { symbol: 'NVDA', name: 'NVIDIA Corporation', exch: 'NASDAQ' },
    'google': { symbol: 'GOOGL', name: 'Alphabet Inc. (Google)', exch: 'NASDAQ' },
    'alphabet': { symbol: 'GOOGL', name: 'Alphabet Inc.', exch: 'NASDAQ' },
    'microsoft': { symbol: 'MSFT', name: 'Microsoft Corporation', exch: 'NASDAQ' },
    'msft': { symbol: 'MSFT', name: 'Microsoft Corporation', exch: 'NASDAQ' },
    'amazon': { symbol: 'AMZN', name: 'Amazon.com Inc.', exch: 'NASDAQ' },
    'amzn': { symbol: 'AMZN', name: 'Amazon.com Inc.', exch: 'NASDAQ' },
    'meta': { symbol: 'META', name: 'Meta Platforms Inc.', exch: 'NASDAQ' },
    'tesla': { symbol: 'TSLA', name: 'Tesla Inc.', exch: 'NASDAQ' },
    'tsla': { symbol: 'TSLA', name: 'Tesla Inc.', exch: 'NASDAQ' },
    'netflix': { symbol: 'NFLX', name: 'Netflix Inc.', exch: 'NASDAQ' }
};
export async function GET(req) {
    try {
        const url = new URL(req.url);
        const query = (url.searchParams.get('q') || '').trim();
        if (query.length < 1) {
            return NextResponse.json({ suggestions: [] });
        }
        const lower = query.toLowerCase();
        const suggestions = [];
        const seenSymbols = new Set();
        // 1. Check popular Indian/Global instant prefix matches first for lightning fast feedback
        for (const [key, val] of Object.entries(POPULAR_INDIAN_GLOBAL)) {
            if (key.startsWith(lower) || val.name.toLowerCase().includes(lower) || val.symbol.toLowerCase().startsWith(lower)) {
                if (!seenSymbols.has(val.symbol)) {
                    seenSymbols.add(val.symbol);
                    suggestions.push({
                        symbol: val.symbol,
                        name: val.name,
                        exchange: val.exch,
                        type: 'EQUITY'
                    });
                }
            }
        }
        // 2. Query Yahoo Finance live exchange search API in real time
        try {
            const results = await yahooFinance.search(query, { quotesCount: 10, newsCount: 0 });
            if (results && results.quotes) {
                for (const q of results.quotes) {
                    const sym = String(q.symbol || '');
                    if (!sym || seenSymbols.has(sym))
                        continue;
                    const exch = String(q.exchange || q.exch || 'MKT');
                    const type = String(q.quoteType || 'EQUITY');
                    const name = String(q.shortname || q.longname || sym);
                    // Filter out unwanted obscure derivative options or empty symbols
                    if (type === 'OPTION' || type === 'CURRENCY')
                        continue;
                    seenSymbols.add(sym);
                    suggestions.push({
                        symbol: sym,
                        name,
                        exchange: exch,
                        type
                    });
                }
            }
        }
        catch (err) {
            console.warn('Live suggestion search error:', err);
        }
        return NextResponse.json({ suggestions: suggestions.slice(0, 8) });
    }
    catch (error) {
        console.error('Suggest API error:', error);
        return NextResponse.json({ suggestions: [] }, { status: 500 });
    }
}
