// Solution for day 11 part 2
// Puzzle: https://adventofcode.com/2024/day/11

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim().split(" ").map(x => Number(x));

let result = 0;
let cache = {};

function calc(number, steps) {
    // Check if solution is already in cache
    const key = JSON.stringify([ number, steps ]);
    if (cache[key] !== undefined) {
       return cache[key];
    }

    if (steps == 0)
        value = 1; // base
    else if (number == 0) {
        value = calc(1, steps-1);
    }
    else if (number.toString().length % 2 == 0) {
        let numberStr = number.toString();
        let numLeft = Number(numberStr.substring(0, numberStr.length/2));
        let numRight = Number(numberStr.substring(numberStr.length/2, numberStr.length));
        value = calc(numLeft, steps-1) + calc(numRight, steps-1);
    }
    else {
        value = calc(number * 2024, steps-1);
    }

    // Save solution in cache for value,steps
    cache[key] = value;
    return value;
}

for (let i = 0; i < data.length; i++) {
    result = result + calc(data[i], 75);
}

// Show result
console.log(result);


