// Solution for day 10 part 2 
// Puzzle: https://adventofcode.com/2024/day/10

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim().split("\n");

let result = 0;

// Gete valid nodes
function getNeighbours(n) {
    let nodesN = [];
    let directions = [[-1,0],[1,0],[0,1],[0,-1]];
    for (let i = 0; i < directions.length; i++) {
        let y = Number(n[0]) + directions[i][0];
        let x = Number(n[1]) + directions[i][1];
        if (y >= 0 && y < data.length && x >= 0 && x < data[0].length) {
            nodesN.push([y,x]);
        }
    }
    return nodesN;
}

// Find all zeros (starting nodes)
let nodes = [];
for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] == '0') 
            nodes.push([i,j]);
    }   
}

// Calculate trailhead score 
for (let j = 0; j < nodes.length; j++) {
    let paths = [];
    let store = [nodes[j]];
    let value = 0; 
    while (store.length) {
        // Check nodes around the current node
        let current = store.pop();
        value = Number(data[current[0]][current[1]]);
        let neighbours = getNeighbours(current);
        // Check neighbours if are valid
        for (let i = 0; i < neighbours.length; i++) {
            let nY = neighbours[i][0];
            let nX = neighbours[i][1];
            let nValue = Number(data[nY][nX]);
            if (nValue == (value+1)) {
                if (nValue == 9) 
                    paths.push([nY,nX]);
                else 
                    store.push([nY,nX]);
            }
        }
    }
    result = result + paths.length;
}

///console.log(nodes);
console.log(result);