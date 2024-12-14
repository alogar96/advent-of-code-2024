// Solution for day 14 part 1 
// Puzzle: https://adventofcode.com/2024/day/14

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

let result = 0;
let robotData = [];
let seconds = 100;
let wide = 101;
let tall = 103; 
var [q1, q2, q3, q4] = [0,0,0,0]

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

// Calculate robots position after N secodns
for (let r = 0; r < robotData.length; r++) {
    // v = x, y
    let startingX = robotData[r][0][0];
    let startingY = robotData[r][0][1];
    let vX = robotData[r][1][0];
    let vY = robotData[r][1][1];

    // Calculate final position
    let finalX = (((startingX + seconds * vX) % wide) + wide) % wide;
    let finalY = (((startingY + seconds * vY) % tall) + tall) % tall;

    // Count number of robots in each quadrant 
    if (finalX < Math.floor(wide/2) && finalY < Math.floor(tall/2))
        q1++;
    else if (finalX > Math.floor(wide/2) && finalY < Math.floor(tall/2))
        q2++;
    else if (finalX < Math.floor(wide/2) && finalY > Math.floor(tall/2))
        q3++;
    else if (finalX > Math.floor(wide/2) && finalY > Math.floor(tall/2))
        q4++;

}

// Show the result
result = q1 * q2 * q3 * q4;
console.log(result);