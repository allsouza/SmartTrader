export default function newsIndexItem(data, container) {
    const ul = document.querySelector(container);
    const li = document.createElement('li');
    li.classList.add('news-index-item');
    li.addEventListener('click', () => window.open(data.url));

    const img = document.createElement('img');
    const headline = document.createElement('h1');
    const summary = document.createElement('p');
    const source = document.createElement('h3');

    img.src=data.image;
    headline.innerText = data.headline;
    summary.innerText = data.summary;
    source.innerText = data.source;

    li.appendChild(img);
    li.appendChild(headline);
    li.appendChild(source);
    li.appendChild(summary);

    ul.appendChild(li);
}