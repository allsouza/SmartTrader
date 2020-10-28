
import newsIndexItem from './news_index_item';

export default async function newsIndex() {
    const newsList = document.createElement('ul');
    newsList.id = "home-news";
    document.querySelector('.main').appendChild(newsList);

    const news = await fetch(
        `https://finnhub.io/api/v1/news?category=general&token=bu2clnn48v6uohsq5dd0`
    ).then(res => res.json());

    for(let i=0; i<9; i++){
        setTimeout(() => {
            newsIndexItem(news[i], '#home-news');
        }, i*500)
    }
}