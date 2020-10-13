import "./styles/index.scss"; 
import { openAbout } from './scripts/modal';
import setBackground from "./scripts/background";
import search from "./scripts/search";
import 'regenerator-runtime/runtime'

document.addEventListener("DOMContentLoaded", () => {

    document.querySelector('#about-button').addEventListener('click', openAbout);

    document.querySelector('#neutral').addEventListener('click', () => setBackground('neutral'));
    document.querySelector('#positive').addEventListener('click', () => setBackground("positive"));
    document.querySelector('#negative').addEventListener('click', () => setBackground("negative"));

    document.querySelector('#searchBar').addEventListener('input', () => {
        setTimeout(() => {
          search()}, 500)
    })

})