// Solution for day 7 part 2
// Puzzle: https://adventofcode.com/2024/day/7

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

let result = 0;

// Convert decimal to ternary string with leading zeros
function toTernaryStr(dec, size) {
    let ternaryStr = dec.toString(3);
    ternaryStr = ternaryStr.padStart(size, '0')
    return ternaryStr;
}

// Parse the input and try all equations
for (let row = 0; row < data.length; row++) {
    [res, nums] = data[row].split(':');
    nums = nums.trim().split(' ').map(x => Number(x));

    // Search for all solution and compare it to equation result
    let solutions = Math.pow(3, nums.length-1);
    for (let i = 0; i < solutions; i++) {
        let solution = nums[0];
        let ternary = toTernaryStr(i, nums.length-1);
        // Loop through ternary string (2 = ||, 1 = *, 0 = +)
        for (let j = 0; j < ternary.length; j++) {
            if (ternary[j] == '1')
                solution = solution * nums[j+1];
            else if (ternary[j] == '2')
                solution = Number(solution.toString() + nums[j+1].toString());
            else
                solution = solution + nums[j+1];
        }
        // Sum the correct solutions
        if (Number(res) == solution) {
            result = result + solution;
            break;
        }
    }
}

console.log(result);