// Solution for day 15 part 1
// Puzzle: https://adventofcode.com/2024/day/15

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf-8').split('\n\n');
let result = 0;

let map = data[0].split('\n').map(x => x.split(''));
let moves = data[1].split('');
let directions = [[0,1],[1,0],[-1,0],[0,-1]];
let cmds = 'v><^';

let robot = []; // x,y

// Return robot direction [x,y]
function getDirection(cmd) {
    return directions[cmds.indexOf(cmd)];
}

// Print map
function printMap() {
    let str = '';
    map.forEach(x => {
        str = str + x.toString() + '\n'
    })
    return str;
}

// Find robot starting position
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] == '@') {
            map[y][x] = '.';
            robot = [x, y];
            break;
        }
    }
}

// Follow the rules and move the robot
for (let m = 0; m < moves.length; m++) {
    // Skip any other chars
    if (!cmds.includes(moves[m])) continue;
    let dir = getDirection(moves[m]);
    let newX = robot[0] + dir[0];
    let newY = robot[1] + dir[1];
    // console.log(printMap(map))
    if (map[newY][newX] == '.') {
        robot = [newX, newY];
    }
    else if (map[newY][newX] == '#')
        continue;
    else if (map[newY][newX] == 'O') {
        // Check if box can be pushed
        let pushX = newX + dir[0];
        let pushY = newY + dir[1];
        while (true) {
            // We found a wall before empty space
            if (map[pushY][pushX] == '#')
                break;
            // Empty space found - push
            if (map[pushY][pushX] == '.') {
                let spaceX = pushX;
                let spaceY = pushY;
                while (true) {
                    // Swap 
                    spaceX = spaceX + (-1 * dir[0]);
                    spaceY = spaceY + (-1 * dir[1]);
                    let remember = map[pushY][pushX];
                    map[pushY][pushX] = map[spaceY][spaceX]; 
                    map[spaceY][spaceX] = remember;
                    pushY = spaceY;
                    pushX = spaceX;
                    if (robot[0] == spaceX && robot[1] == spaceY)
                        break;
                }   
                robot = [newX, newY];
                break;
            }
            pushX = pushX + dir[0];
            pushY = pushY + dir[1];
        }
    }
}

// Calculate the sum of all boxes' GPS coordinates
for (y = 0; y < map.length; y++) {
    for (x = 0; x < map[0].length; x++) {
        if (map[y][x] == 'O') {
            result = result + (100 * y + x);
        }
    }
}


// Show the result
console.log(result);