const d3 = require('d3');
import setBackground from '../background';

export default async function chart(symbol) {
    // symbol = 'AAPL';
    const today = + new Date();
    const past = (today - 604800000); 
    
    const finnhubData = await fetch(
        `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=15&from=${Math.floor(past/1000)}&to=${Math.floor(today/1000)}&token=bu2clnn48v6uohsq5dd0`
    ).then(res => res.json());

    let chartResultData = [];
        
    for(let i=0; i<finnhubData.t.length; i++){
        chartResultData.push({
            date: new Date(finnhubData.t[i] * 1000),
            high: finnhubData.h[i],
            low: finnhubData.l[i],
            open: finnhubData.o[i],
            close: finnhubData.c[i],
            volume: finnhubData.v[i]
        })
    }

    initializeChart(chartResultData);

    function initializeChart(data) {
        
        (data[data.length-1].close - data[0].close) >= 0 ? setBackground('positive') : setBackground('negative');

        const margin = { top: 50, right: 50, bottom: 50, left: 50 };
        const width = 600 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom; 

        const svg = d3
            .select('#chart')
            .append('svg')
            .attr('width', width + margin['left'] + margin['right'])
            .attr('height', height + margin['top'] + margin['bottom'])
            .append('g')
            .attr('transform', `translate(${margin['left']},  ${margin['top']})`);

        const xMin = d3.min(data, d => d['date']);
        const xMax = d3.max(data, d => d['date']);

        const yMin = d3.min(data, d => d['close']);
        const yMax = d3.max(data, d => d['close']);

        const xScale = d3
            .scaleTime()
            .domain([xMin, xMax])
            .range([0,width]);
        const yScale = d3
            .scaleLinear()
            .domain([yMin, yMax])
            .range([height, 0]);

        svg
            .append('g')
            .attr('id', 'xAxis')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));
        svg
            .append('g')
            .attr('id', 'yAxis')
            .attr('transform', `translate(${width}, 0)`)
            .call(d3.axisRight(yScale));

        const line = d3
            .line()
            .x(d => {
              return xScale(d['date']);
            })
            .y(d => {
              return yScale(d['close']);
            });
   
        svg
           .append('path')
           .data([data])
           .style('fill', 'none')
           .attr('id', 'priceChart')
           .attr('stroke', 'steelblue')
           .attr('stroke-width', '1.5')
           .attr('d', line);

        // Moving Avg
        const movingAvgData = movingAvg(data, 6);
        debugger
        const movingAverageLine = d3
            .line()
            .x(d => {
            return xScale(d['date']);
            })
            .y(d => {
            return yScale(d['average']);
            })
            .curve(d3.curveBasis);
       svg
            .append('path')
            .data([movingAvgData])
            .style('fill', 'none')
            .attr('id', 'movingAverageLine')
            .attr('stroke', '#FF8900')
            .attr('d', movingAverageLine);
    }

    function movingAvg(data, numberOfPricePoints){
        return data.map((row, index, total) => {
          const start = Math.max(0, index - numberOfPricePoints);
          const end = index;
          const subset = total.slice(start, end + 1);
          const sum = subset.reduce((a, b) => {
            return a + b['close'];
          }, 0);
          return {
            date: row['date'],
            average: sum / subset.length
          };
        });
      };
}