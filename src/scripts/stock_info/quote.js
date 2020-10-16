import { formatThousands } from "../format_util";

export default async function financials(symbol) {
    const container = document.createElement('div');
    const main = document.createElement('div');
    main.id = "top";
    const other = document.createElement('div');
    other.id = 'bottom';
    const lineOne = document.createElement('span');
    const lineTwo = document.createElement('span');
    container.id ="center";
    
    const quote = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=bu2clnn48v6uohsq5dd0`
        ).then(res => res.json());

    const open = document.createElement('p');
    const high = document.createElement('p');
    const low = document.createElement('p');
    const current = document.createElement('h1');
    const prevClose = document.createElement('p');
    const time = document.createElement('p');

    open.innerText = `Open: \$${formatThousands(quote.o)}`;
    high.innerText = `High: \$${formatThousands(quote.h)}`;
    low.innerText = `Low: \$${formatThousands(quote.l)}`;
    current.innerText = `\$${formatThousands(quote.c)}`;
    prevClose.innerText = `Prev. Close: \$${formatThousands(quote.pc)}`;
    time.innerText = `Updated on ${new Date(Date.now()).toString().slice(0,25)}`;
    
    main.appendChild(current);
    main.appendChild(time);
    lineOne.appendChild(high);
    lineOne.appendChild(low);
    lineTwo.appendChild(open);
    lineTwo.appendChild(prevClose);

    other.appendChild(lineOne);
    other.appendChild(lineTwo);

    container.appendChild(main);
    container.appendChild(other);

    document.querySelector('.under-chart').appendChild(container);
}