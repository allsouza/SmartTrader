import "./styles/index.scss"; 
import { openAbout } from './scripts/modal';
import search from "./scripts/search";
import body from './scripts/body';
import 'regenerator-runtime/runtime'
import show from './scripts/stock_info/stock_show';

document.addEventListener("DOMContentLoaded", () => {
    const lastVisit = window.localStorage.getItem('lastVisit')
    if (lastVisit === null || new Date(lastVisit).toDateString() !== new Date().toDateString()){
        openAbout();
    }
    window.localStorage.setItem('lastVisit', new Date())

    document.querySelector('#about-button').addEventListener('click', openAbout);

    window.stocksArray = [];

    document.querySelector('#searchBar').addEventListener('input', () => {
        setTimeout(() => {
          search()}, 500)
    })

    document.querySelector('.left').addEventListener('click', body);

    show('AAPL');
    // body();

})