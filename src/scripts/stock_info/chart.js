import * as d3 from 'd3';

export default async function chart(symbol) {
    symbol = 'AAPL';
    const today = + new Date();
    const past = (today - 604800000); 
    
    const finnhubData = await fetch(
        `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=1&from=${Math.floor(past/1000)}&to=${Math.floor(today/1000)}&token=bu2clnn48v6uohsq5dd0`
    ).then(res => res.json());

    console.log(finnhubData);

    
}