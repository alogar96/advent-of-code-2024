// Solution for day 5 part 2
// Puzzle: https://adventofcode.com/2024/day/5

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

let result = 0;
const rules = {};

// Parse input data
data.forEach(element => {
    // Rules
    if (element.includes("|")) {
        parseRule(element);
    }
    // Pages
    if (element.includes(",")) {
        checkPages(element);
    }
});

// Parse rules "42|75"
function parseRule(element) {
    const [key, value] = element.split("|").map(Number);
    if (!rules[key]) {
        rules[key] = new Set();
    }
    rules[key].add(value);
}

// Parse pages "2,3,4"
function checkPages(element) {
    const pages = element.split(",").map(Number);
    // Find invalid pages and sort then
    if (!pagesOK(pages)) {
        let sorted = test(pages);
        result = result + sorted[Math.floor(pages.length/2)];
    }
}

// Check if pages are valid
function pagesOK(pages) {
    for (let i = 0; i < pages.length; i++) {
        for (let j = i; j < pages.length; j++) {
            if (rules[pages[j]]?.has(pages[i])) {
                return false;
            }
        }
    }
    return true;
}

// Sort invalid pages 
function test(pages) {
    for (let i = 1; i < pages.length; i++) {
        let num = pages[i];
        let j = i - 1;
        while (j >= 0 && (!rules[pages[j]]?.has(num))) {
            pages[j+1] = pages[j];
            j = j - 1;
        }
        pages[j + 1] = num;
    }
    return pages;
}

// Show puzzle result  
console.log(result);
