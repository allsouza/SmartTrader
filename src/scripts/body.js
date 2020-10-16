import setBackground from "./background";
import newsIndex from "./news/news_index";

export default function body (){
    const main = document.querySelector('.main');
    clear();
    logo();
    newsIndex();

    function logo(){
        const logo = document.createElement('object');

        logo.type="image/svg+xml";
        logo.data="./src/images/atom.svg";
        logo.classList.add('logo');

        main.appendChild(logo);
    }

    function clear(){
        setBackground('neutral');
        if(document.querySelector('.suggestion')) document.querySelector('.suggestion').classList.remove('show');
        main.innerHTML = "";
    }
}