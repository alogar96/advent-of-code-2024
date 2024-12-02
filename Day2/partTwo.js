// Solution for day 2 part 2
// Puzzle: https://adventofcode.com/2024/day/2

const fs = require('node:fs');
let data = fs.readFileSync('inputTest.txt', 'utf-8').trim().split('\n');
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

// Checks if report is valid
function validReport(inc, report) {
    for (let i = 1; i <= report.length; i++) {
        if (!validLevel(inc, report[i-1], report[i])) {
            return false;
        }
    }
    return true;
}

// Count safe reports
data.forEach(element => {
    let report = element.split(" ").map(x => Number(x));
    let inc = report[0] < report[1];

    // Check full report at the start
    if (validReport(inc, report)) {
        result = result +1;
    }
    else {
        // Check report with one level removed
        for (let i = 0; i < report.length; i++) {
            let arr = [...report];
            arr.splice(i, 1);
            inc = arr[0] < arr[1];
            if (validReport(inc, arr)) {
                result = result +1;
                break;
            }
        }
    }
});

// Get puzzle result  
console.log(result);