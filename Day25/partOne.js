// Solution for day 25 part 1
// Puzzle: https://adventofcode.com/2024/day/25

const fs = require('node:fs');
let data = fs.readFileSync('input.txt', 'utf-8').split('\n\n').map(x => x.split('\n'));
let result = 0;

let keys = [];
let locks = [];

// Parse input data into array of locks and keys
for (let i = 0; i < data.length; i++) {
    let heights = [0,0,0,0,0];
    for (let j = 1; j < data[i].length-1; j++) {
        let columns  = data[i][j].split('');
        for (let k = 0; k < columns .length; k++) {
            if (columns [k] == '#')
                heights[k] = heights[k] + 1;
        }
    }
    // Check if input is lock or a key
    if (data[i][0] == '#####')
        locks.push(heights);
    else
        keys.push(heights);
}

//  Check how many unique lock/key pairs fit
for (let i = 0; i < locks.length; i++) {
    for (let j = 0; j < keys.length; j++) {
        let fits = true;
        for (let k = 0; k < locks[i].length; k++) {
            if (locks[i][k] + keys[j][k] > 5) {
                fits = false;
                break;
            }
        }
        if (fits)
            result = result + 1;
    }
}



// Show the result
console.log(result)