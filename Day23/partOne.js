// Solution for day 23 part 1
// Puzzle: https://adventofcode.com/2024/day/23

const fs = require('node:fs');
let data = fs.readFileSync('input.txt', 'utf-8').split('\n').map(x => x.split('-'));

let result = 0;

let nodes = {};

function has(a,b,c) {
    for (let i = 0; i < sets.length; i++) {
        if (sets[i].includes(a) && sets[i].includes(b) && sets[i].includes(c))
            return true;
    }
    return false;
}

for (let i = 0; i < data.length; i++) {
    let node1 = data[i][0];
    let node2 = data[i][1];

    if (nodes[node1] == undefined)
        nodes[node1] = [node2]
    else
        nodes[node1].push(node2)

    if (nodes[node2] == undefined)
        nodes[node2] = [node1]
    else
        nodes[node2].push(node1)
}

let sets = [];
for (const [key, value] of Object.entries(nodes)) {
    let set = [key];
    for (let i = 0; i < value.length; i++) {
        let conn = nodes[value[i]]; // Get nodes for each key connection
        for (let j = 0; j < conn.length; j++) {
            if (value.includes(conn[j])) {
                set.push(value[i])
                set.push(conn[j])
                if (!has(set[0], set[1], set[2]))
                    sets.push(set)
                set = [key];
            }
        }
    }
}

for (let i = 0; i < sets.length; i++ ) {
    if (sets[i][0][0] == 't' || sets[i][1][0] == 't' || sets[i][2][0] == 't')
        result++;
}

// Show the result
console.log(result)