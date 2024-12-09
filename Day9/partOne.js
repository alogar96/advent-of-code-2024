// Solution for day 9 part 1 
// Puzzle: https://adventofcode.com/2024/day/9

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim();

let result = 0;
let id = 0;
let disk = [];

// Parse input string 
for (let i = 0; i < data.length; i++) {
    // Check if number present file or free space 
    let number = Number(data[i])
    for (let j = 0; j < number; j++) {
        if (i % 2 == 0)
            disk.push(id);
        else
            disk.push('.');
    }
    if (i % 2 == 0)
        id++;
}

// Move all files to the start and free space to the end
let end = disk.length-1;
for (let i = 0; i < disk.length; i++) {
    if (disk[i] == '.' && i < end) {
        for (let j = end; j > i; j--) {
            if (disk[j] != '.') {
                disk[i] = disk[j];
                disk[j] = '.';
                end = j-1;
                break;
            }
        }
    }
}

// Calculate filesystem checksum
for (let i = 0; i < disk.length; i++) {
    if (disk[i] != '.') {
        result = result + (i * disk[i]);
    }
}


console.log(result);