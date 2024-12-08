// Solution for day 8 part 2
// Puzzle: https://adventofcode.com/2024/day/8

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').trim().split('\n').map(x => x.trim());

let result = 0;

let antennas = {};
let locations = [];

// Check if location is already in array
function validLocation(y, x) {
    for (let i = 0; i < locations.length; i++) {
        if (locations[i][0] == y && locations[i][1] == x)
            return false;
    }
    return true;
}

// Find all antennas
for (let row = 0; row < data.length; row++) {
    for (let char = 0; char < data[row].length; char++) {
        if (data[row][char] != '.') {
            if (!antennas[data[row][char]]) {
                antennas[data[row][char]] = ([[row, char]]);
            } else {
                antennas[data[row][char]].push([row, char]);
            }
        }
    }
}

// Find and count antinodes
for (const [key, antenna] of Object.entries(antennas)) {
    for (let i = 0; i < antenna.length; i++) {
        for (j = 0; j < antenna.length; j++) {
            // Calcualte manhattan distance between same antennas
            let dY = antenna[i][0] - antenna[j][0];
            let dX = antenna[i][1] - antenna[j][1];
            let distance = Math.abs(dY) + Math.abs(dX);
            // Find all antinodes coordinates
            if (distance > 1) {
                let count = 1;
                let aY = antenna[i][0];
                let aX = antenna[i][1];
                while (aY >= 0 && aX >= 0 && aY < data.length && aX < data[0].length) {
                    // Check if antinode location is unique 
                    if (validLocation(aY, aX)) {
                        locations.push([aY, aX]);
                    }
                    aY = antenna[i][0] + (count * dY);
                    aX = antenna[i][1] + (count * dX); 
                    count++;     
                }
            }
        }
    }
};

result = locations.length;
console.log(result);