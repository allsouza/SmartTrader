import "./styles/index.scss"; 
import { openAbout } from './scripts/modal';
import setBackground from "./scripts/background";
import search from "./scripts/search";
import body from './scripts/body';
import 'regenerator-runtime/runtime'
import show from "./scripts/stock_info/stock";

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector('#about-button').addEventListener('click', openAbout);

    // document.querySelector('#neutral').addEventListener('click', () => setBackground('neutral'));
    // document.querySelector('#positive').addEventListener('click', () => setBackground("positive"));
    // document.querySelector('#negative').addEventListener('click', () => setBackground("negative"));

    window.stocksArray = [];

    document.querySelector('#searchBar').addEventListener('input', () => {
        setTimeout(() => {
          search()}, 500)
    })

    document.querySelector('.left').addEventListener('click', body);

    // body();
    show('AAPL')

})