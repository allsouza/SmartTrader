import setBackground from "../background";
import { formatThousands } from "../format_util";
import chart from "./chart";

export default async function show(symbol) {
    const main = document.querySelector('.main');
    main.innerHTML = "";
    setBackground('neutral')

    const info = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=bu2clnn48v6uohsq5dd0`).then(res =>  res.json());

    if(info["ticker"] !== undefined){
        const header = document.createElement('div');
        const firstLine = document.createElement('div');
        const name = document.createElement('h1');
        const ticker = document.createElement('h3');
        const logo = document.createElement('img');
        const secondLine = document.createElement('div');
        const left = document.createElement('div');
        const right = document.createElement('div');
        const country = document.createElement('p');
        const exchange = document.createElement('p');
        const ipo = document.createElement('p');
        const industry = document.createElement('p');
        const marketCap = document.createElement('p');
        const outstandingShares = document.createElement('p');
    
        if(info.logo) logo.src=`${info.logo}`;
        name.innerText = `${info.name}`;
        ticker.innerText = `(${info.ticker})`;
        firstLine.appendChild(logo);
        firstLine.appendChild(name);
        firstLine.appendChild(ticker);
        firstLine.classList.add('first-line');

        country.innerText = `Country: ${info.country}`;
        exchange.innerText = `Exchange: ${info.exchange}`;
        ipo.innerText = `IPO Date: ${info.ipo}`;
        industry.innerText = `Industry: ${info.finnhubIndustry}`;
        marketCap.innerText = `Market Cap: ${formatThousands(info.marketCapitalization)}`;
        outstandingShares.innerText = `Shares Outstanding: ${formatThousands(info.shareOutstanding)}`;
        console.log(info.marketCapitalization);
        console.log(info.shareOutstanding);

        left.appendChild(country);
        left.appendChild(exchange);
        left.appendChild(ipo);
        right.appendChild(industry);
        right.appendChild(marketCap);
        right.appendChild(outstandingShares);
        left.classList.add('left-header');
        right.classList.add('right-header');
        secondLine.classList.add('second-line');
        secondLine.appendChild(left);
        secondLine.appendChild(right);
        
        header.appendChild(firstLine);
        header.appendChild(secondLine);
        header.classList.add('body-header');

        main.appendChild(header);
    }
    else{
        const header = document.createElement('div');
        const firstLine = document.createElement('div');
        const name = document.createElement('h1');
        const ticker = document.createElement('h3');

        name.innerText = `${window.stocks[symbol].description}`;
        ticker.innerText = `(${symbol})`;
        firstLine.appendChild(name);
        firstLine.appendChild(ticker);
        firstLine.classList.add('first-line');

        header.appendChild(firstLine);
        header.classList.add('body-header');

        main.appendChild(header);
    }

    const chartEle = document.createElement('div');
    chartEle.id = "chart";
    main.appendChild(chartEle);

    chart(symbol);


}