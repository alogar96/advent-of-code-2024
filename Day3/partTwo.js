// Solution for day 3 part 2
// Puzzle: https://adventofcode.com/2024/day/3

const fs = require('node:fs');
let data = fs.readFileSync('input.txt', 'utf-8').trim();
let result = 0;

// Check if current instruction is enabled
function enabled(index) {
    let str = data.substring(0,index);
    let indexDo = str.lastIndexOf('do()');
    let indexDont = str.lastIndexOf("don't()");
    return indexDo >= indexDont;
}

// Parse match and multiply numbers 
function mul(match) {
    let num1 = match.substring(match.indexOf('(')+1, match.indexOf(','));
    let num2 = match.substring(match.indexOf(',')+1, match.indexOf(')'));
    return Number(num1) * Number(num2);
}

// Find matching string "mul(x,y)"
const regexp = /(mul[(][0-9]+,[0-9]+[)])/g;
const matches = data.match(regexp);

matches.forEach(match => {
    let index = data.indexOf(match)
    if (enabled(index)) {
        result = result + mul(match);
    }
});

// Show puzzle result  
console.log(result);