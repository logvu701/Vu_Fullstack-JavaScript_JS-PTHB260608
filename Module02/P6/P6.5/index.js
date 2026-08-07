function sumAllNumbers(...numbers) {
    let sum = 0;

    for (const number of numbers) {
        sum += number;
    }

    return sum;
}

console.log(sumAllNumbers(1, 2, 3));
console.log(sumAllNumbers(10, 20, 30, 40));
console.log(sumAllNumbers(5, 15, 25, 35, 45));
