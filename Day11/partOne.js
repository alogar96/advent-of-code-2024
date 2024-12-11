// Solution for day 11 part 1 
// Puzzle: https://adventofcode.com/2024/day/11

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim().split(" ").map(x => Number(x));

let result = 0;
let numbers = [...data];
for (let i = 0; i < 25; i++) {
    let newNumbers = [];
    for (let j = 0; j < numbers.length; j++) {
        let numberStr = numbers[j].toString();
        if (numbers[j] == 0)
            newNumbers.push(1)
        else if (numberStr.length % 2 == 0) {
            newNumbers.push(Number(numberStr.substring(0, numberStr.length/2)));
            newNumbers.push(Number(numberStr.substring(numberStr.length/2, numberStr.length)));
        }
        else 
            newNumbers.push(numbers[j] * 2024);
    }
    numbers = [...newNumbers];
}

// Show result
result = numbers.length;
console.log(result);