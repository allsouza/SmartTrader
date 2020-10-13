export default function search() {
    let stocks;
    
    const fetchStocks = async () => {
        stocks = await fetch(
            'https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bu2clnn48v6uohsq5dd0')
            .then(res => res.json());
    }

    const result = document.getElementById('results');

    const showStocks = async () => {
        await fetchStocks();
        
        const ul = document.createElement('ul');
        ul.classList.add('stocks');

        stocks.forEach(stock => {
            const li = document.createElement('li');
            li.classList.add('stock-item');

            const symbol = document.createElement('p');
            symbol.innerText = stock.symbol;

            const name = document.createElement('p');
            name.innerText = stock.description;

            li.appendChild(symbol);
            li.appendChild(name);

            ul.appendChild(li);
        })

        results.appendChild(ul);
    }

    showStocks();
}