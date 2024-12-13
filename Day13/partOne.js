// Solution for day 13 part 1 
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
        parsed.push([x, y]);
    }
    inputs.push([...parsed]);
}

// Find all possible solutions
for (let n = 0; n < inputs.length; n++) {
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            let x = i * inputs[n][0][0] + j * inputs[n][1][0];
            let y = i * inputs[n][0][1] + j * inputs[n][1][1];
            if (x == inputs[n][2][0] && y == inputs[n][2][1]) {
                result = result + (i*3 + j);
                break;
            }
        }
    }
}

// Show the result
console.log(result);