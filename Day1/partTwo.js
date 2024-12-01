// Solution for day 1 part 2
// Puzzle: https://adventofcode.com/2024/day/1

const fs = require('node:fs');
let data = fs.readFileSync('input.txt', 'utf8').trim().split('\n');

let list1 = [];
let list2 = [];
let result = 0;
let count = 0;

// Parse input data in two arrays
data.forEach(element => {
    let elementArray = element.split(/\s+/);
    list1.push(Number(elementArray[0]));
    list2.push(Number(elementArray[1]));
});

// Calculate similarity score
for(let i = 0; i < list1.length; i++) {
    count = 0;
    for (let j = 0; j < list2.length; j++) {
        if (list1[i] == list2[j]) {
            count++;
        }
    }
    result = result + (list1[i] * count);
}

// Get puzzle result  
console.log(result);