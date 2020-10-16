export function formatThousands(num){
    if(num >= 1000){
        const result = [];
        const float = num % 1 !== 0;
        while (num > 1000){
            result.unshift(num%1000 >= 100 ? num%1000 : `0`+`${num%1000}`);
            num = parseInt(num/1000);
        }
        result.unshift(num);
        if(float) result.push(result.pop().toFixed(2));
        return result.join(',');
    }
    else{
        return num.toFixed(2);
    }
}