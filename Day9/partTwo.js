// Solution for day 9 part 2
// Puzzle: https://adventofcode.com/2024/day/9

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim();

let result = 0;
let id = 0;
let disk = [];

// Get the free space length
function freeSpaceLen(index) {
    let len = 0;
    for (let i = index; i < disk.length; i++) {
        if (disk[i] == '.')
            len++;
        else 
            break;
    }
    return len;
}

// Get the file length
function FileLen(index, fileId) {
    let len = 0;
    for (let i = index; i > 0; i--) {
        if (disk[i] == fileId) 
            len++;
        else 
            break;
    }
    return len;
}

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

// Brute-force solution
// Move whole files to the leftmost span of free space
let i = disk.length-1;
while (i > 0) {
    // Check if file is found
    if (disk[i] != '.') {
        let fileLen = FileLen(i, disk[i]);
        // Look for free space
        for (let j = 0; j < i; j++) {
            if (disk[j] == '.') {
                let freeLen = freeSpaceLen(j);
                if (freeLen >= fileLen) {
                    for (let k = 0; k < fileLen; k++) {
                        disk[j+k] = disk[i-k];
                        disk[i-k] = '.';
                    }
                    break;
                }
            }
        }
        i = i - fileLen;
    } 
    else {
        i = i - 1;
    }
}

// Calculate filesystem checksum
for (let i = 0; i < disk.length; i++) {
    if (disk[i] != '.') {
        result = result + (i * disk[i]);
    }
}

console.log(result);