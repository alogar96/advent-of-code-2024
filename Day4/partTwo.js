// Solution for day 4 part 2
// Puzzle: https://adventofcode.com/2024/day/4

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim().split("\n").map(x => x.split(""));
let result = 0;

function LookupXmas(x, y) {
    let diag1 = data[y+1][x+1] + data[y-1][x-1];
    let diag2 = data[y+1][x-1] + data[y-1][x+1];
    return ((diag1 == 'MS' || diag1 == 'SM') && (diag2 == 'MS' || diag2 == 'SM'))
}

// Look for "A" and check if matches the requirements
for (let y = 1; y < data.length-1; y++) {
    for (let x = 1; x < data[y].length-1; x++) {
        if (data[y][x] == 'A')
            result = result + LookupXmas(x, y);
    }
}

// Show puzzle result  
console.log(result);
