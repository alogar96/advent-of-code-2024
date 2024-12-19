// Solution for day 19 part 1
// Puzzle: https://adventofcode.com/2024/day/19

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').split('\n');
let combinations = data[0].split(',').map(x => x.trim());

let result = 0;

// Check if design is valid
function validDesign(match) {
    let parts = [''];
    while (parts.length > 0) {
        let str = parts.pop();

        // design found
        if (str == match && str != '') {
            return true;
        }

        let start = str.length;
        for (let i = start; i < match.length; i++) {
            let part = match.substring(start, i+1);
            if (combinations.includes(part)) {
                let newStr = str + part;
                parts.push(newStr)
            }
        }
    }

    return false;
}

// Check which patterns 
for (let p = 2; p < data.length; p++) {
    if (validDesign(data[p]))
        result = result +1;
}

// Show the result
console.log(result)