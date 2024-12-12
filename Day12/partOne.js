// Solution for day 12 part 1 
// Puzzle: https://adventofcode.com/2024/day/12

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(x => x.trim());

let result = 0;
let areas = {};
let seen = {};

let directions = [[0,1],[1,0],[-1,0],[0,-1]];
let id = 0;

let areaCounters = [];

// Check if array is already in main array
function arrInArray(array, arr) {
    return array.some(element => JSON.stringify(element) === JSON.stringify(arr));
}


for (let r = 0; r < data.length; r++) {
    for (let c = 0; c < data[r].length; c++) {
        const seenKey = JSON.stringify([r,c]);
        if (seen[seenKey] === undefined) {
            let areaCount = 0;
            let areaId = data[r][c];
            let currentAreas = [[r,c]];
            areas[id] = [[r, c]];
            while (currentAreas.length > 0) {
                let currentA = currentAreas.pop();
                for (let i = 0; i < directions.length; i++) {
                    let cY = currentA[0] + directions[i][0];
                    let cX = currentA[1] + directions[i][1];
                    if (cY >= 0 && cY < data.length && cX >= 0 && cX < data[0].length) {
                        if (areaId == data[cY][cX] &! arrInArray(areas[id], [cY, cX])) {
                            const test = JSON.stringify([cY,cX]);
                            seen[test] = true;
                            currentAreas.push([cY, cX]);
                            areas[id].push([cY, cX]);
                        } else if (areaId != data[cY][cX]) {
                            areaCount++;
                        }
                    } else {
                        areaCount++;
                    }
                }
            }
            areaCounters.push(areaCount)
            id = id +1;
        }
    }
}

for (let k = 0; k < areaCounters.length; k++) {
    result = result + (areaCounters[k] * areas[k].length)
}

console.log(areas)
console.log(areaCounters)

console.log(result);