function openAbout() {
    const modal = document.querySelector('.about-modal');
    const background = document.querySelector('.modal-background');

    modal.classList.add('show');
    background.classList.add('show');

    background.addEventListener('click', closeModal);
    document.querySelector('#close-modal').addEventListener('click', closeModal)
}

function closeModal() { 
    Array.from(document.querySelector('.modal').children).forEach(ele => {
        ele.classList.remove('show');
    })
}

module.exports = {
    openAbout,
    closeModal
}