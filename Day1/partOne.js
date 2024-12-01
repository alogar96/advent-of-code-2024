// Solution for day 1 part 1 
// Puzzle: https://adventofcode.com/2024/day/1

const fs = require('node:fs');
let data = fs.readFileSync('input.txt', 'utf8').trim().split('\n');

let list1 = [];
let list2 = [];
let result = 0;

// Parse input data in two arrays
data.forEach(element => {
    let elementArray = element.split(/\s+/);
    list1.push(Number(elementArray[0]));
    list2.push(Number(elementArray[1]));
});

// Sort both arrays (lists)
list1.sort();
list2.sort();

// Calculate distance sum
for(let i = 0; i < list1.length; i++) {
    let distance = Math.abs(list2[i] - list1[i]);
    result = result + distance;
}

// Get puzzle result  
console.log(result);