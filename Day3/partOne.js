// Solution for day 3 part 1 
// Puzzle: https://adventofcode.com/2024/day/3

const fs = require('node:fs');
let data = fs.readFileSync('input.txt', 'utf-8').trim();
let result = 0;

// Find matching string "mul(x,y)"
const regexp = /(mul[(][0-9]+,[0-9]+[)])/g;
const matches = data.match(regexp);

matches.forEach(match => {
    let num1 = match.substring(match.indexOf('(')+1, match.indexOf(','));
    let num2 = match.substring(match.indexOf(',')+1, match.indexOf(')'));
    result = result + (Number(num1) * Number(num2));
});

// Show puzzle result  
console.log(result);