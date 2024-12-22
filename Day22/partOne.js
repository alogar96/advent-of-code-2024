// Solution for day 22 part 1
// Puzzle: https://adventofcode.com/2024/day/22

const fs = require('node:fs');
let data = fs.readFileSync('input.txt', 'utf-8').split('\n').map(x => Number(x));

let result = 0;

// Calculate the value of the number modulo 16777216
function mod(value) {
    let modulo = 16777216;
    return ((value % modulo) + modulo) % modulo;
}

// Generate secret number for 2000 times  
for (let n = 0; n < 2000; n++) {
    for (let i = 0; i < data.length; i++) {
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
    }
}

// Get the sum of all final secret numbers
result = data.reduce((acc, c) => acc + c, 0);

// Show the result
console.log(result)