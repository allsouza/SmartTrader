export default function body (symbol){
    const main = document.querySelector('.main');
    
    if(typeof symbol !== 'undefined'){
        clear();
        window.alert(symbol);
    }
    else{
        logo();
    }

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