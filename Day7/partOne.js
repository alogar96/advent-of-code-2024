// Solution for day 7 part 1 
// Puzzle: https://adventofcode.com/2024/day/7

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

let result = 0;

// Convert decimal to binary string with leading zeros
function toBinaryStr(dec, size) {
    let binStr = dec.toString(2);
    binStr = binStr.padStart(size, '0')
    return binStr;
}

// Parse the input and try all equations
for (let row = 0; row < data.length; row++) {
    [res, nums] = data[row].split(':');
    nums = nums.trim().split(' ').map(x => Number(x));

    // Search for all solution and compare it to equation result
    let solutions = Math.pow(2, nums.length-1);
    for (let i = 0; i < solutions; i++) {
        let solution = nums[0];
        let binary = toBinaryStr(i, nums.length-1);
        // Loop through binary string (1 = *, 0 = +)
        for (let j = 0; j < binary.length; j++) {
            if (binary[j] == '1')
                solution = solution * nums[j+1];
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