import body from './body';

export default function search() {
    const result = document.getElementById('results');
    const searchInput = document.getElementById('searchBar');
    const clear = document.getElementById('clear');

    let stocks;
    let searchTerm = searchInput.value;
    
    const fetchStocks = async () => {
        stocks = await fetch(
            'https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bu2clnn48v6uohsq5dd0')
            .then(res => res.json());
    }

    const showStocks = async () => {
        await fetchStocks();
        
        stocks = stocks.filter(stock => stock.symbol.includes(searchTerm.toUpperCase()));
        results.innerHTML = '';
        stocks.forEach(stock => {
            const li = document.createElement('li');
            li.classList.add('stock-item');

            const symbol = document.createElement('p');
            symbol.innerText = stock.symbol;

            const name = document.createElement('p');
            name.innerText = stock.description;

            li.appendChild(symbol);
            li.appendChild(name);

            li.addEventListener('click', () => select(stock.symbol))

            results.appendChild(li);
        })
        results.style.borderBottom = "10px solid rgba(255, 255, 255, 0)";
        results.style.borderTop = "10px solid rgba(255, 255, 255, 0)";
    }

    function select(symbol) {
        body(symbol);
        reset();
    }

    const reset = () => {
        results.innerHTML = "";
        results.style.border = "none";
        searchInput.value = "";
    }

    clear.addEventListener('click', reset)
    searchTerm !== "" ? showStocks() : reset();
}