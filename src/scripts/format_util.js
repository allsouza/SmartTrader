export function formatThousands(num){
    if(num >= 1000){
        const result = [];
        const float = num % 1 !== 0;
        while (num > 1000){
            result.unshift(num%1000 >= 100 ? num%1000 : `0`+`${(num%1000).toFixed(2)}`);
            num = parseInt(num/1000);
        }
        result.unshift(num);
        if(float) result.push(result.pop());
        return result.join(',');
    }
    else{
        return num.toFixed(2);
    }
}

export function formatDate(date) {
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}