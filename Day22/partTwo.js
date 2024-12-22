// Solution for day 22 part 2
// Puzzle: https://adventofcode.com/2024/day/22

const fs = require('node:fs');
let data = fs.readFileSync('input.txt', 'utf-8').split('\n').map(x => Number(x));

let result = 0;
let prices = [];
let changes = [];

// Calculate the value of the number modulo 16777216
function mod(value) {
    let modulo = 16777216;
    return ((value % modulo) + modulo) % modulo;
}

// Return last digit
function getLastDigit(num) {
    let lastDigit = num.toString();
    lastDigit = Number(lastDigit.charAt(lastDigit.length-1));
    return lastDigit;
}

// Generate secret number for 2000 times and set prices 
for (let i = 0; i < data.length; i++) {
    let p = [getLastDigit(data[i])];
    for (let n = 0; n < 2000; n++) {
        let secret = data[i];
    
        let operation = secret * 64;
        secret = operation ^ secret;
        secret = mod(secret);
    
        operation = Math.floor(secret / 32);
        secret = operation ^ secret;
        secret = mod(secret);
    
        operation = secret * 2048;
        secret = operation ^ secret;
        secret = mod(secret);
    
        data[i] = secret;

        p.push(getLastDigit(data[i]));
    }
    prices.push(p);
}

// Calculate changes from prices 
for (let i = 0; i < prices.length; i++) {
    let change = []
    for (let j = 0; j < prices[i].length-1; j++) {
        let c = prices[i][j+1] - prices[i][j];
        change.push(c);
    }
    changes.push(change);
}

// Find sequence that gets you the most bananans
const count = new Map();
for (let i = 0; i < changes.length; i++) {
    const seen = new Set();
    for (let j = 0; j < changes[i].length-3; j++) {
        let d1 = changes[i][j].toString();
        let d2 = changes[i][j+1].toString();
        let d3 = changes[i][j+2].toString();
        let d4 = changes[i][j+3].toString();

        const key = d1 + d2 + d3 + d4;
        const bananas = prices[i][j+4];

        if (!seen.has(key)) {
            seen.add(key);
            const sum = (count.get(key) || 0) + bananas;
            count.set(key, sum);
            if (sum > result)
                result = sum;
        }
    }
}


// Show the result
console.log(result);