// Solution for day 14 part 2
// Puzzle: https://adventofcode.com/2024/day/14

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

let result = 0;
let robotData = [];
let seconds = 50000;
let wide = 101;
let tall = 103; 

// Parse input data
for (let d = 0; d < data.length; d++) {
    let r = [];
    let split = data[d].split(' ').map(x => x.trim());
    for (let s = 0; s < split.length; s++) {
        let a = Number(split[s].substring(split[s].indexOf('=')+1, split[s].indexOf(',')));
        let b = Number(split[s].substring(split[s].indexOf(',')+1, split[s].length));
        r.push([a,b]);
    }
    robotData.push(r);
}

// Draw a tree
function drawTree(draw) {
    let str = '';
    for (let y = 0; y < wide; y++) {
        for (let x = 0; x < tall; x++) {
            let found = false;
            for (let d = 0; d < draw.length; d++) {
                if (x == draw[d][0] && y == draw[d][1]) {
                    found = true;
                    break;
                }
            }
            found ? str=str+'X' : str=str+'.';
        }
        str = str + '\n';
    }
    return str;
}

// Calculate robots position after N secodns
let tree = [];
let max = 0;
for (let i = 0; i < seconds; i++) {
    let finalX = 0;
    let finalY = 0;
    let count = 0;
    let draw = [];
    for (let r = 0; r < robotData.length; r++) {
        // Get robot starting position and velocity
        let startingX = robotData[r][0][0];
        let startingY = robotData[r][0][1];
        let vX = robotData[r][1][0];
        let vY = robotData[r][1][1];

        // Calculate final position
        finalX = (((startingX + i * vX) % wide) + wide) % wide;
        finalY = (((startingY + i * vY) % tall) + tall) % tall;
        draw.push([finalX, finalY]);

        // Count number of robots in the middle - assume the photo will be in the middle :)
        if (finalX > 40 && finalX < 60 && finalY > 40 && finalY < 60) 
            count++;
    }
    // Store data with most robots in the middle
    if (count > max) {
        max = count;
        result = i;
        tree = [...draw];
    }
}

// Show the result
console.log(drawTree(tree));
console.log(result);