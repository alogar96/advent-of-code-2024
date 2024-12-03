// Solution for day 3 part 2
// Puzzle: https://adventofcode.com/2024/day/3

const fs = require('node:fs');
let data = fs.readFileSync('input.txt', 'utf-8').trim();
let result = 0;

// Parse match and multiply numbers 
function mul(match) {
    let num1 = match.substring(match.indexOf('(')+1, match.indexOf(','));
    let num2 = match.substring(match.indexOf(',')+1, match.indexOf(')'));
    return Number(num1) * Number(num2);
}

// Find matching string "mul(x,y)"
let enabled = true;
for (let i = 0; i < data.length; i++) {
    if (data.substring(i, i+4) == "do()")
        enabled = true;
    if (data.substring(i, i+"don't()".length) == "don't()")
        enabled = false;

    const regexpMatch = /(^mul[(][0-9]+,[0-9]+[)])/;
    const match = data.substring(i).match(regexpMatch);
    if (match != null && enabled)
        result = result + mul(match[0]);
}

// Show puzzle result  
console.log(result);