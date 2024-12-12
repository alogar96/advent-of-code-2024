// Solution for day 12 part 1 
// Puzzle: https://adventofcode.com/2024/day/12

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(x => x.trim());

let result = 0;
let directions = [[0,1],[1,0],[-1,0],[0,-1]];

let id = 0;
let areas = {};
let seen = {};

// Check if array is already in main array
function arrInArray(array, arr) {
    return array.some(element => JSON.stringify(element) === JSON.stringify(arr));
}

// Find all areas
for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[r].length; c++) {
        let perimeter  = 0;
        if (seen[JSON.stringify([r,c])] === undefined) {
            areas[id] = [[r,c]];
            let currentAreas = [[r,c]];
            while (currentAreas.length > 0) {
                let cA = currentAreas.pop();
                for (let i = 0; i < directions.length; i++) {
                    let cY = cA[0] + directions[i][0];
                    let cX = cA[1] + directions[i][1];
                    if (cY >= 0 && cY < data.length && cX >= 0 && cX < data[0].length) {
                        if (data[r][c] == data[cY][cX] &! arrInArray(areas[id], [cY, cX])) {
                            seen[JSON.stringify([cY,cX])] = true;
                            currentAreas.push([cY, cX]);
                            areas[id].push([cY, cX]);
                        } else if (data[r][c] != data[cY][cX]) {
                            perimeter++;
                        }
                    } else {
                        perimeter++;
                    }
                }
            }
            result = result + (perimeter * areas[id].length);
            id++;
        }
    }
}

// Get result 
console.log(result);