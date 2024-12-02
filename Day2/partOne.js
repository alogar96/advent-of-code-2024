// Solution for day 2 part 1 
// Puzzle: https://adventofcode.com/2024/day/2

const fs = require('node:fs');
let data = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');
let result = 0;

// Checks if two leves are safe
function validLevel(inc, v1, v2) {
    let diff = Math.abs(v1 - v2);
    if (diff == 0 || diff > 3) {
        return false;
    }
    if (inc && (v1 > v2)) {
        return false;
    }

    if (!inc && (v1 < v2)) {
        return false;
    }

    return true;
}

// Count safe reports
data.forEach(element => {
    let report = element.split(" ").map(x => Number(x));
    let inc = report[0] < report[1];
    let pass = true;

    for (let i = 1; i <= report.length; i++) {
        if (!validLevel(inc, report[i-1], report[i])) {
            pass = false;
            break;
        }
    }

    if (pass) {
        result = result +1;
    }
});

// Get puzzle result  
console.log(result);