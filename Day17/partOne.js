// Solution for day 16 part 1
// Puzzle: https://adventofcode.com/2024/day/16

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').split('\n');
const program = data[data.length-1].split(':')[1].trim().split(',');

let result = 0;

let pointer = 0;
let regA = 51064159;
let regB = 0;
let regC = 0;
let output = '';

// Get the value of combo operand
function getComboOperand(operand) {
    if (operand == 4)
        return regA;
    else if (operand == 5)
        return regB;
    else if (operand == 6)
        return regC;
    else
        return operand;
}

// opcode 0
function adv(operand) {
    let denominator = getComboOperand(operand);
    regA = Math.floor(regA / Math.pow(2,denominator));
    return;
}

// opcode 1 
function bxl(operand) {
    regB = regB ^ operand;
    return;
}

// opcode 2
function bst(operand) {
    console.log('test')
    let n = getComboOperand(operand);
    regB = ((n % 8) + 8) % 8;
}

// opcode 3
function jnz(operand) {
    if (regA == 0) 
        return;
    pointer = operand;
}

// opcode 4
function bxc(operand) {
    regB = regB ^ regC;
    return;
}

// opcode 5
function out(operand) {
    let n = getComboOperand(operand);
    let str = ((n % 8) + 8) % 8;
    str = str.toString();
    for (let i = 0; i < str.length; i++) {
        output = output + str[i] + ',';
    }
    return;
}

// opcode 6
function bdv(operand) {
    let denominator = getComboOperand(operand);
    regB = Math.floor(regA / Math.pow(2,denominator));
    return;
}

// opcode 7
function cdv(operand) {
    let denominator = getComboOperand(operand);
    regC = Math.floor(regA / Math.pow(2,denominator));
    return;
}


// Process the program 
while (pointer < program.length) {
    console.log(pointer)
    let opcode = Number(program[pointer]);
    let operand = Number(program[pointer+1]);
    pointer = pointer +2;

    switch (opcode) {
        case 0:
            adv(operand);
            break;
        case 1:
            bxl(operand);   
            break;
        case 2: 
            bst(operand);   
            break;
        case 3: 
            jnz(operand);   
            break;
        case 4: 
            bxc(operand);   
            break;
        case 5: 
            out(operand);   
            break;
        case 6: 
            bdv(operand);   
            break;
        case 7: 
            cdv(operand);   
            break;
      }
}

// Get output and remove last ','
result = output.substring(0, output.length-1);

// Show result
console.log(result);
