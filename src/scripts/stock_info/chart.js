const d3 = require('d3');
import setBackground from '../background';

export default async function chart(symbol) {
    // symbol = 'AAPL';
    const today = + new Date();
    const past = (today - 7776000000); 
    
    const finnhubData = await fetch(
        `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${Math.floor(past/1000)}&to=${Math.floor(today/1000)}&token=bu2clnn48v6uohsq5dd0`
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

        // Create empty chart
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

        // Moving Avg Line
        const movingAvgData = movingAvg(data, 90);

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

        // Volume bars
        const volData = data.filter(d => d['volume'] !== null && d['volume'] !== 0)
        const yMinVol = d3.min(volData, d => Math.min(d['volume']));
        const yMaxVol = d3.max(volData, d => Math.max(d['volume']));
        const yVolScale = d3.scaleLinear().domain([yMinVol, yMaxVol]).range([height, height * (3/4)]);

        svg
            .selectAll()
            .data(volData)
            .enter()
            .append('rect')
            .attr('x', d => xScale(d['date']))
            .attr('y', d => yVolScale(d['volume']))
            .attr('fill', (d, i) => {
                if(i === 0){
                    return '#03a678';
                }
                else{
                    return volData[i-1]['close'] > d['close'] ? '#c0392b' : '#03a678'; 
                }
            })
            .attr('width', 1)
            .attr('height', d => (height - yVolScale(d['volume'])));

        // Mouseover info display
        const focus = svg
            .append('g')
            .attr('class', 'focus')
            .style('display', 'none');
        focus.append('circle').attr('r', 4.5);
        focus.append('line').classed('x', true); // sets the class x with a value of true to add the class and a value of false to remove the class https://jaketrent.com/post/d3-class-operations/
        focus.append('line').classed('y', true);
        svg
            .append('rect')
            .attr('class', 'overlay')
            .attr('width', width)
            .attr('height', height)
            .on('mouseover', () => focus.style('display', null))
            .on('mouseout', () => focus.style('display', 'none'))
            .on('mousemove', e => generateCrosshair(e));
        d3.select('.overlay').style('fill', 'none');
        d3.select('.overlay').style('pointer-events', 'all');
        d3.selectAll('.focus line').style('fill', 'none');
        d3.selectAll('.focus line').style('stroke', '#67809f');
        d3.selectAll('.focus line').style('stroke-width', '1.5px');
        d3.selectAll('.focus line').style('stroke-dasharray', '3 3');  
        
        const bisectDate = d3.bisector(d => d.date).left;
        function generateCrosshair(e) {
            //returns corresponding value from the domain
            const correspondingDate = xScale.invert(d3.pointer(e)[0]);
            //gets insertion point
            const i = bisectDate(data, correspondingDate, 1);
            
            const d0 = data[i - 1];
            const d1 = data[i];
            const currentPoint = correspondingDate - d0['date'] > d1['date'] - correspondingDate ? d1 : d0;
            
            focus.attr('transform',`translate(${xScale(currentPoint['date'])}, ${yScale(currentPoint['close'])})`);
        focus
            .select('line.x')
            .attr('x1', 0)
            .attr('x2', width - xScale(currentPoint['date']))
            .attr('y1', 0)
            .attr('y2', 0);
        focus
            .select('line.y')
            .attr('x1', 0)
            .attr('x2', 0)
            .attr('y1', 0)
            .attr('y2', height - yScale(currentPoint['close']));
         updateDisplay(currentPoint);
        }
        
        const updateDisplay = currentData => {
            d3.selectAll('.lineDisplay').remove();
            const displayKeys = Object.keys(data[0]);
            const lineDisplay = svg
              .selectAll('.lineDisplay')
              .data(displayKeys)
              .enter()
              .append('g')
              .attr('class', 'lineDisplay')
              .attr('transform', (d, i) => `translate(0, ${i * 20})`);
            lineDisplay
              .append('text')
              .text(d => {
                if (d === 'date') {
                  return `${d[0].toUpperCase()+d.slice(1)}: ${currentData[d].toLocaleDateString()}`;
                } else if ( d === 'high' || d === 'low' || d === 'open' || d === 'close') {
                  return `${d[0].toUpperCase()+d.slice(1)}: ${currentData[d].toFixed(2)}`;
                } else {
                  return `${d[0].toUpperCase()+d.slice(1)}: ${currentData[d]}`;
                }
              })
              .style('fill', 'white')
              .attr('transform', 'translate(15,9)');
            };
    }

    function movingAvg(data, days){
        
        return data.map((row, index, total) => {
            const start = Math.max(0, index - days);
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