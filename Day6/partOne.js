// Solution for day 6 part 1 
// Puzzle: https://adventofcode.com/2024/day/6

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(x => x.split(""));

let result = 0;

let nextX = 0;
let nextY = 0;
let pos = [];
let path = [];
let move = [0, -1]; // x, y

// Checks is position is already part of path
function checkPosition(pos) {
    for (let i = 0; i < path.length; i++) {
        if (path[i][0] == pos[0] && path[i][1] == pos[1])
            return false;
    }
    return true;
}

// Find guard start position
for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] == '^') {
            pos = [j, i];
            path.push([j, i]);
            break;
        }
    }
}

// Move guard out of the map
while (true) {

    // Get next move
    nextX = pos[0] + move[0];
    nextY = pos[1] + move[1];

    // Check if guard is out of map
    if (nextX < 0 || nextX > data[0].length-1 || nextY < 0 || nextY > data.length-1)
        break;

    // Check for obstructions and rotate next move for 90deg
    if (data[nextY][nextX] == '#') {
        if (move[0] == 0 && move[1] == -1) {
            move[0] = 1; move[1] = 0;
        } else if (move[0] == 1 && move[1] == 0) {
            move[0] = 0; move[1] = 1;
        } else if (move[0] == 0 && move[1] == 1) {
            move[0] = -1; move[1] = 0;
        } else {
            move[0] = 0; move[1] = -1;
        }
    } else {
        // Check is new position and add it to the path
        pos = [nextX, nextY];
        if (checkPosition([nextX, nextY])) {
            path.push([nextX, nextY]);
        }
    }
}

// Show puzzle result
result = path.length;
console.log(result);