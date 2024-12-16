// Solution for day 16 part 1
// Puzzle: https://adventofcode.com/2024/day/16

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').split('\n').map(x => x.split(''));
let result = 0;

let directions = [[0,1],[1,0],[0,-1],[-1,0]];
const distance = Array.from({ length: data.length }, () => Array(data[0].length).fill(Infinity));
const visited = Array.from({ length: data.length }, () => Array(data[0].length).fill(false));
const priorityQueue = [];

let startX = 0;
let startY = 0;
let endX = 0;
let endY = 0;

// Find start and end positions
for (let y = 0; y < data.length; y++) {
    for (let x = 0; x < data[0].length; x++) {
        if (data[y][x] == 'S') {
            startX = x;
            startY = y;
        }
        if (data[y][x] == 'E') {
            endX = x;
            endY = y;
        }
    }
}

distance[startX][startY] = 0;
priorityQueue.push({x: startX, y: startY, dirX: 1, dirY: 0, dist: 0 });

// Dijkstra - find shortest path from S to E.
while (priorityQueue.length > 0) {
    // Sort by distance (priority queue)
    priorityQueue.sort((e1, e2) => e1.dist - e2.dist);
    const { x, y, dirX, dirY, dist } = priorityQueue.shift();

    if (visited[x][y]) continue;
    visited[x][y] = true;

    // We have found the end
    if (x == endX && y == endY) {
        result = dist;
        break;
    }

    // Check all directions
    for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        let newDist = 0;
        if (data[ny][nx] != '#' && !visited[nx][ny]) {
            // Set distance based on rules
            if (dirX == dx && dirY == dy)
                newDist = dist + 1;
            else
                newDist = dist + 1001;
            if (newDist < distance[nx][ny]) {
                distance[nx][ny] = newDist;
                priorityQueue.push({ x: nx, y: ny, dirX: dx, dirY: dy, dist: newDist });
            }
        }
    }
}


// Show result
console.log(result);
