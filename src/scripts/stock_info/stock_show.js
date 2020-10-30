import companyNews from "../news/company_news";
import financials from "./financials";
import priceTarget from "./price_target";
import suggestion from "./suggestion";
import quote from './quote';
import stock from './stock';

export default async function StockShow(symbol) {
    stock(symbol);
    await financials(symbol);
    await quote(symbol);
    priceTarget(symbol);
    companyNews(symbol);
    await suggestion(symbol);
    setTimeout(() => document.querySelector('.suggestion').classList.add('show'), 1000);
}