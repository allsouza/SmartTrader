
export default function setBackground(status) {
    const background = document.querySelector('html')
    background.classList.remove('positive');
    background.classList.remove('negative');
    switch (status) {
        case 'positive':
            background.classList.add('positive')
            break;
        case 'negative':
            background.classList.add('negative')
            break;
        default:
            break;
    }
}