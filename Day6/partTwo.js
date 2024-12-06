// Solution for day 6 part 2
// Puzzle: https://adventofcode.com/2024/day/6

const fs = require('node:fs');
let data = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(x => x.split(""));

let result = 0;

let count = 0;
let startX = 0;
let startY = 0;
let nextX = 0;
let nextY = 0;
let pos = [];
let move = [0, -1]; // x, y

// Find guard start position
for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] == '^') {
            startX = j;
            startY = i;
            pos = [j, i];
            break;
        }
    }
}

for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {

        // Check if new obstruction can be set
        let obsX = -1;
        let obsY = -1;
        if (data[i][j] == '.') {
            obsX = j;
            obsY = i;
        }

        // Move guard out of the map
        while (true) {

            // Count loop cycles
            count++;

            // Get next move
            nextX = pos[0] + move[0];
            nextY = pos[1] + move[1];

            // Check if guard is out of map
            if (nextX < 0 || nextX > data[0].length-1 || nextY < 0 || nextY > data.length-1)
                break;

            // Probably stuck in the loop :P
            if (count > 10000) {
                result = result +1;
                break;
            }

            // Check for obstructions and rotate next move for 90deg
            if (data[nextY][nextX] == '#' || (nextY == obsY && nextX == obsX)) {
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
                pos = [nextX, nextY];
            }
        }

        // Reset map states
        pos[0] = startX;
        pos[1] = startY;
        move = [0, -1];
        count = 0;
    }
}


// Show puzzle result
console.log(result);