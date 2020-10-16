import { formatDate } from '../format_util';
import newsIndexItem from './news_index_item';

export default async function companyNews(symbol) {
    const newsList = document.createElement('ul');
    newsList.id = "company-news";

    document.querySelector('.main').appendChild(newsList);
    
    const news = await fetch(
        `https://finnhub.io/api/v1//company-news?symbol=${symbol}&from=${formatDate(new Date(Date.now() - 604800000))}&to=${formatDate(new Date(Date.now()))}&token=bu2clnn48v6uohsq5dd0`
    ).then(res => res.json());

    for(let i=0; i<5; i++){
        newsIndexItem(news[i], '#company-news');
    }
}