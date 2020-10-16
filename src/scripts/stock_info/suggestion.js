export default async function suggestion(symbol) {
    let container;
    if (document.querySelector('.suggestion')){
        container = document.querySelector('.suggestion');
    }
    else{
        container = document.createElement('div');
        container.classList.add('suggestion');
    }
    const arrow = document.createElement('div');
    arrow.classList.add('arrow');

    const suggestions = await fetch(`
        https://finnhub.io/api/v1/stock/recommendation?symbol=${symbol}&token=bu2clnn48v6uohsq5dd0
    `).then(res => res.json());

    const buy = suggestions[0].buy + (suggestions[0].strongBuy * 1.5);
    const hold = suggestions[0].hold;
    const sell = suggestions[0].sell + (suggestions[0].strongSell * 1.5);

    let suggestion = "";

    switch (Math.max(buy, hold, sell)) {
        case buy:
            suggestion= 'BUY';
            break;
        case hold:
            suggestion= 'HOLD';
            break;
        case sell:
            suggestion= 'SELL';
            break;
        default:
            break;
    }

    container.innerText = `You should ${suggestion} this stock.`;
    container.appendChild(arrow);
    document.querySelector('body').appendChild(container);
}