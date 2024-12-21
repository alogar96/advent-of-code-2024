// Solution for day 20 part 1
// Puzzle: https://adventofcode.com/2024/day/20

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').split('\n').map(x => x.split(''));

let result = 0;

let directions = [[0,1],[1,0],[-1,0],[0,-1]]; 
let start = [];
let end = [];

// Check if pos was already seen
function seen(x, y) {
    for (let [vx, vy] of path) {
        if (x == vx && vy == y)
            return true;
    }
    return false;
}

// Find start and end positions
for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
        if (data[y][x] == 'S')
            start = [x,y];
        if (data[y][x] == 'E')
            end = [x,y];
    }
}

// Find path start to end
let path = [start];
let x = start[0];
let y = start[1];
while (true) {
    // End found
    if (data[y][x] == 'E')
        break;

    // Create path
    for (let [dx, dy] of directions) {
        let nx = x + dx;
        let ny = y + dy;
        if (data[ny][nx] != '#' &! seen(nx, ny)) {
            path.push([nx, ny]);
            x = nx;
            y = ny;
            break;
        }
    }
}

// Cheat the path with jump over walls
// Find cheats that save you at least 100 steps
let dist = path.length -1;
for (let p = 0; p < path.length; p++) {
    let px = path[p][0]; 
    let py = path[p][1];
    for (let [dx, dy] of directions) {
        let npx = px + (2*dx);
        let npy = py + (2*dy); 
        if (npx >= 0 && npy >= 0 && npy < data.length && npx < data[0].length && data[npy][npx] != '#') {
            let distF = dist - path.findIndex(([x, y]) => x == npx && y == npy); // Distance to end
            let distTotal = p + distF + 2; // Distance until now + dist to end + jump 
            let distSaves = dist - distTotal;
            if (distSaves >= 100)
                result = result +1;
        }
    }
}


// Show the result
console.log(result)