import { formatThousands } from "../format_util";

export default async function financials(symbol) {
    const container = document.createElement('div');
    container.id ="left";
    
    const metrics = await fetch(
        `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=bu2clnn48v6uohsq5dd0`
        ).then(res => res.json());

    const yearLow = document.createElement('p');
    const yearHigh = document.createElement('p');
    const yearLowDate = document.createElement('p');
    const yearHighDate = document.createElement('p');
    const divYield = document.createElement('p');

    yearLow.innerText = `52 week low: \$${formatThousands(metrics.metric['52WeekLow'])}`
    yearLowDate.innerText = `52 week date: ${metrics.metric['52WeekLowDate']}`
    yearHigh.innerText = `52 week high: \$${formatThousands(metrics.metric['52WeekHigh'])}`
    yearHighDate.innerText = `52 week date: ${metrics.metric['52WeekHighDate']}`
    divYield.innerText = `Current Dividend Yield TTM: ${metrics.metric['currentDividendYieldTTM']}%`
    
    container.appendChild(yearHigh);
    container.appendChild(yearHighDate);
    container.appendChild(yearLow);
    container.appendChild(yearLowDate);
    container.appendChild(divYield);

    document.querySelector('.under-chart').appendChild(container);
}