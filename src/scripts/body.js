export default function body (){
    const main = document.querySelector('.main');
    clear();
    logo();

    function logo(){
        const logo = document.createElement('object');

        logo.type="image/svg+xml";
        logo.data="./src/images/atom.svg";
        logo.classList.add('logo');

        main.appendChild(logo);
    }

    function clear(){
        main.innerHTML = "";
    }
}