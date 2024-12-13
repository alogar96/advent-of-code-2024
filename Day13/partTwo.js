// Solution for day 13 part 2
// Puzzle: https://adventofcode.com/2024/day/13
const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim().split('\n\n');

let result = 0;
let inputs = [];

// Parse the input data in 2d array
for (let d = 0; d < data.length; d++) {
    let parsed = [];
    let rows = data[d].split('\n');
    for (let r = 0; r < rows.length; r++) {
        let x = Number(rows[r].substring(rows[r].indexOf('X')+2, rows[r].indexOf(',')));
        let y = Number(rows[r].substring(rows[r].indexOf('Y')+2));
        if (r == 2) {
            x = x + 10000000000000;
            y = y + 10000000000000;
        }
        parsed.push([x, y]);
    }
    inputs.push(parsed);
}

// Solve the system of equations 
for (let n = 0; n < inputs.length; n++) {
    let aX = inputs[n][0][0];
    let aY = inputs[n][0][1];
    let bX = inputs[n][1][0];
    let bY = inputs[n][1][1];
    let pX = inputs[n][2][0];
    let pY = inputs[n][2][1];

    const b = (aY * pX - aX * pY) / (aY * bX - aX * bY);
    const a = (pX - (bX * b)) / aX;

    // Check if values are integers
    if ((aY * pX - aX * pY) % (aY * bX - aX * bY) === 0 && (pX - (bX * b)) % aX === 0) {
        result = result + (a * 3) + b;
    }
}

// Show the result
console.log(result);