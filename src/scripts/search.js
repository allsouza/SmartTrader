import show from './stock_info/stock';

export default function search() {
    const result = document.getElementById('results');
    const searchInput = document.getElementById('searchBar');
    const clear = document.getElementById('clear');

    let searchTerm = searchInput.value;
    
    const fetchStocks = async () => {
        if(window.stocksArray.length === 0){
            window.stocksArray = await fetch(
                'https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bu2clnn48v6uohsq5dd0')
                .then(res => res.json());
            window.stocks = {};
            window.stocksArray.forEach(ele => window.stocks[ele.symbol] = ele);
        }
    }

    const showStocks = async () => {
        await fetchStocks();
        let stocks = window.stocksArray;
        stocks = stocks.filter(stock => stock.symbol.includes(searchTerm.toUpperCase()));
        results.innerHTML = '';
        if(stocks.length > 0){
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
        }
        else{
            const text = document.createElement('p');
            text.innerText="No results";
            result.appendChild(text);
        }
        results.style.borderBottom = "10px solid rgba(255, 255, 255, 0)";
        results.style.borderTop = "10px solid rgba(255, 255, 255, 0)";
    }

    function select(symbol) {
        show(symbol);
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