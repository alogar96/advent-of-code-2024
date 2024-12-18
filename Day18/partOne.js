// Solution for day 18 part 1
// Puzzle: https://adventofcode.com/2024/day/18

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').split('\n').map(x => x.trim().split(','));

let result = 0;
let gridSize = 71;
let start = [0,0];
let end = [70,70];
let directions = [[0,1],[1,0],[0,-1],[-1,0]];

const distance = Array.from({length: gridSize}, () => Array(gridSize).fill(Infinity));
const visited = Array.from({length: gridSize}, () => Array(gridSize).fill(false));
let grid = Array.from({length: gridSize}, () => Array(gridSize).fill('.'));

// Insert first byte blocks
for (let b = 0; b < 1024; b++) {
    byteX = data[b][0];
    byteY = data[b][1];
    grid[byteY][byteX] = '#';
}

let path = [];
path.push({x: start[0], y: start[1], dist: 0 });
distance[start[0]][start[1]] = 0;

// Find shortest path from start to end
while (path.length > 0) {
    // Sort by distance (priority queue)
    path.sort((e1, e2) => e1.dist - e2.dist);
    const { x, y, dist} = path.shift();

    if (visited[x][y]) continue;
    visited[x][y] = true;

    // We have found the end
    if (x == end[0] && y == end[1]) {
        result = dist;
        break;
    }

    // Check all directions
    for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx < 0 || ny < 0 || nx >= gridSize || ny >= gridSize)
            continue;

        if (grid[ny][nx] != '#' && !visited[nx][ny]) {
            let newDist = dist + 1;
            if (newDist < distance[nx][ny]) {
                distance[nx][ny] = newDist;
                path.push({ x: nx, y: ny, dist: newDist });
            }
        }
    }
}

// Show the result
console.log(result)