export default async function financials(symbol) {
    const metrics = fetch(
        `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=bu2clnn48v6uohsq5dd0`
        ).then(res => res.json());

    const yearLow = document.createElement('p');
    const yearHigh = document.createElement('p');
    const yearLowDate = document.createElement('p');
    const yearHighDate = document.createElement('p');
    const divYield = document.createElement('p');

    yearLow.innerText = `52 week low: ${metrics['52WeekLow']}`

}