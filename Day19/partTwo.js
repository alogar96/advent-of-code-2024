// Solution for day 19 part 2
// Puzzle: https://adventofcode.com/2024/day/19

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').split('\n');
let combinations = data[0].split(',').map(x => x.trim());

let result = 0;

function countDesigns(match) {
    let search = []
    let parts = [''];
    // Split match to substrings parts
    for (let i = 0; i < match.length-1; i++) {
        parts.push(match.substring(0, i+1));
    }

    // Look for number of solutions for each math part
    for (let p = parts.length-1; p >= 0; p--) {
        let solutions = 0;
        for (let c = 0; c < combinations.length; c++) {
            let str = parts[p] + combinations[c];
            if (str == match)
                solutions++;
            else {
                for (let s = 0; s < search.length; s++) {
                    if (str == search[s][0]) 
                        solutions = solutions + search[s][1];
                }
            }
        }
        // Remember number of solutions for each part
        search.push([parts[p], solutions]);
    }

    // Return total count of solutions 
    let count = search[search.length-1][1];
    return count;
}

// Check which patterns 
for (let p = 2; p < data.length; p++) {
    result = result + countDesigns(data[p]);
}

// Show the result
console.log(result);