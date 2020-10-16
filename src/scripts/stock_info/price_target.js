import { formatThousands } from "../format_util";

export default async function priceTarget(symbol) {
    const container = document.createElement('div');
    container.id ="right";
    
    const target = await fetch(
        `https://finnhub.io/api/v1/stock/price-target?symbol=${symbol}&token=bu2clnn48v6uohsq5dd0`
        ).then(res => res.json());

    const targetHigh = document.createElement('p');
    const targetLow = document.createElement('p');
    const targetMean = document.createElement('p');
    const targetMedian = document.createElement('p');
    const date = document.createElement('p');

    targetHigh.innerText = `Target high: \$${formatThousands(target.targetHigh)}`;
    targetLow.innerText = `Target low: \$${formatThousands(target.targetLow)}`;
    targetMean.innerText = `Target mean: \$${formatThousands(target.targetMean)}`;
    targetMedian.innerText = `Target median: \$${formatThousands(target.targetMedian)}`;
    date.innerText = `Last updated: ${new Date(target.lastUpdated).toString().slice(0,15)}`;

    container.appendChild(targetHigh);
    container.appendChild(targetLow);
    container.appendChild(targetMean);
    container.appendChild(targetMedian);
    container.appendChild(date);

    document.querySelector('.under-chart').appendChild(container);
}