// Solution for day 4 part 1 
// Puzzle: https://adventofcode.com/2024/day/4

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim().split("\n").map(x => x.split(""));
let result = 0;

let directions = [[1,0], [0,1], [-1,0], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]]

// Count "MAS" matches on all directions
function LookupXmas(x, y) {
    let found = 0;
    for(let dir = 0; dir < directions.length; dir++) {
        let str = '';
        for(let i = 1; i < 4; i++) {
            let nextX = x + (i * directions[dir][0]);
            let nextY = y + (i * directions[dir][1]);
            if (nextX >= 0 && nextX < data[y].length && nextY >= 0 && nextY < data.length) {
                str = str + data[nextY][nextX];
            }
        }
        if (str == 'MAS') {
            found++;
        }
    }
    return found;
}

// Look for "A" and check if matches the requirements
for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[y].length; x++) {
        if (data[y][x] == 'X')
            result = result + LookupXmas(x, y);
    }
}

// Show puzzle result  
console.log(result);
