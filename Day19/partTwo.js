// Solution for day 19 part 2
// Puzzle: https://adventofcode.com/2024/day/19

const fs = require('node:fs');
const data = fs.readFileSync('test.txt', 'utf-8').split('\r\n');
let combinations = data[0].split(',').map(x => x.trim());

let result = 0;

// Check if design is valid
function validDesign(match) {
    let solutions = [];
    let parts = [match.substring(0,1)];
    while (parts.length > 0 && match != '') {
        let str = parts.pop();

        let start = str.length;
        for (let i = start; i < match.length; i++) {
            let part = match.substring(start, i+1);
            if (combinations.includes(part)) {
                let newStr = str + part;
                if (newStr == match)
                    solutions.push(newStr)
                else
                    parts.push(newStr)
            }
        }
    }

    return solutions.length;
}

// Check which patterns 
for (let p = 2; p < data.length; p++) {
    console.log(p)
    result = result + validDesign(data[p]);
}

// Show the result
console.log(result)