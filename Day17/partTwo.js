// Solution for day 17 part 1
// Puzzle: https://adventofcode.com/2024/day/17

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').split('\n');
const program = data[data.length-1].split(':')[1].trim().split(',');


let result = BigInt(0);
let regA = BigInt(0);
let regB = BigInt(0);
let regC = BigInt(0);

function solve(p, res) {
    // Base case
    if (p.length === 0) 
        return BigInt(res);

    for (let i = 0; i < 8; i++) {
        regA = (BigInt(res) << BigInt(3)) | BigInt(i);
        regB = ((regA % BigInt(8)) + BigInt(8)) % BigInt(8);
        regB = regB ^ BigInt(5);
        regC = regA / (BigInt(2) ** regB);
        regB = regB ^ BigInt(6);
        regB = regB ^ regC;

        if (((regB % BigInt(8)) + BigInt(8)) % BigInt(8) === BigInt(p[p.length - 1])) {
            let arr = p.slice(0, -1);
            let x = solve(arr, regA);
            if (x === undefined) 
                continue;
            return x;
        }
    }
}

result = solve(program, 0)

// Show result
console.log(result)