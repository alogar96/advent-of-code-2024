// Solution for day 24 part 1
// Puzzle: https://adventofcode.com/2024/day/24

const fs = require('node:fs');
let data = fs.readFileSync('input.txt', 'utf-8').split('\n');
let result = 0;

let values = new Map();
let expressions = [];

// Parse out values and expressions
for (let i = 0; i < data.length; i++) {
    // Values
    if (data[i].includes(':')) {
        let v = data[i].split(':');
        values.set(v[0], Number(v[1]));
    }
    // Expressions
    if (data[i].includes('->')) {
        let e = data[i].split(' ');
        expressions.push([e[0], e[1], e[2], e[4]]);
    }
}

// Found all values from expressions
while (true) {
    let found = false;
    for (let i = 0; i < expressions.length; i++) {
        let exp = expressions[i];

        // Value already calculated
        if (values.has(exp[3])) continue;

        // Value cannot yet be calculated
        if (!values.has(exp[0]) || !values.has(exp[2])) continue;

        // Calculate value
        let value = 0;
        if (exp[1] == 'AND')
            value = values.get(exp[0]) && values.get(exp[2]);
        else if (exp[1] == 'OR')
            value = values.get(exp[0]) || values.get(exp[2]);
        else if (exp[1] == 'XOR')
            value = values.get(exp[0]) ^ values.get(exp[2]);

        values.set(exp[3], value);
        found = true;
    }
    // Break the loop, once all values are found
    if (!found) break;
}

// Calculate result
values.forEach((value, key) => {
    if (key[0] == 'z') {
        let exponent = Number(key[1] + key[2]);
        result = result + (value * Math.pow(2, exponent))
    }
})

// Show the result
console.log(result)