// function to read the world map
function readMap(input) {
    const file = input.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        worldmap: {
            const file = event.target.result;
            const allLines = file.split(/\r\n|\n/);

            // this is used to get the dimensions of the map
            var length = allLines.length - 2;
            world.x = parseInt(allLines[0]);
            world.y = parseInt(allLines[1]);

            // checking if the dimensions are correct
            for (let i = 2; i <= length + 1; i++) {
                if (world.y != length || world.x != allLines[i].length) {
                    alert("Error: The field does not correspond to the indicated dimensions!");
                    clearValueOfElement('mapInput');
                    world.map = [];
                    break worldmap;
                } else {
                    let row = [];
                    for (let j = 0; j < world.x; j++) {
                        row.push(allLines[i][j]);
                    }
                    world.map.push(row);
                }
            }
            worldCheck(world.map);
        }
    }
    reader.readAsText(file);
}
// function to check if the world recieved is a valid world and if it is correct it will swap
// the values from a character to a WorldCell class
function worldCheck(map) {
    var redSwarm = 0, blackSwarm = 0, foundRed = 0, foundBlack = 0;
    endcheck: {
        for (let i = 0; i < world.x; i++) {
            for (let j = 0; j < world.y; j++) {
                let c = map[i][j]; // character checking
                let n = parseInt(map[i][j]); // number checking
                if ((i == 0 || i == world.x - 1 || j == 0 || j == world.y - 1) && c != "#") {
                    alert("Error: There is no outer border!");
                    clearValueOfElement('mapInput');
                    world.map = [];
                    break endcheck;
                }
                // populating the map with appropriate cells
                if (c == "+") {
                    redSwarm++;
                    world.map[i][j] = new WorldCell(c);
                } else if (c == "-") {
                    blackSwarm++;
                    world.map[i][j] = new WorldCell(c);
                } else if (c == "#") {
                    world.map[i][j] = new WorldCell(c);
                } else if (c == ".") {
                    world.map[i][j] = new WorldCell(c);
                } else if (n > 1 && n < 10) {
                    world.map[i][j] = new WorldCell(n);
                } else {
                    alert("Error: Value out of legal!");
                    clearValueOfElement('mapInput');
                    world.map = [];
                    break endcheck;
                }
            }
        }
        // checking if all swarms are present
        if (redSwarm == 0 || blackSwarm == 0) {
            alert("Error: One of the bug swarms is missing");
            clearValueOfElement('mapInput');
            world.map = [];
            break endcheck;
        }
        // checking if the swarms are connected properly
        for (let i = 1; i < world.x - 2; i++) {
            for (let j = 1; j < world.y - 2; j++) {
                let c = world.map[i][j];
                // finding the first red and black spawn base
                if (c.base == "Red" && foundRed == 0) {
                    foundRed++;
                    c.visited = true;
                    visitAdjacent(i, j, c);
                } else if (c.base == "Black" && foundBlack == 0) {
                    foundBlack++;
                    c.visited = true;
                    visitAdjacent(i, j, c);
                }
                // visiting all the connected neighbors from cells that were visited before
                if (c.base == "Red" && c.visited === true) {
                    foundRed++;
                    c.visited = true;
                    visitAdjacent(i, j, c);
                } else if (c.base == "Black" && c.visited === true) {
                    foundBlack++;
                    c.visited = true;
                    visitAdjacent(i, j, c);
                }
                // checking if there is a base left that hasn't been visited
                if ((c.base == "Black" || c.base == "Red") && c.visited === false) {
                    alert("Error: Swarm have to be linked!");
                    clearValueOfElement('mapInput');
                    world.map = [];
                    break endcheck;
                }
            }
        }
    }
}

// function to visit adjacent cells and if they are from the same base, they get "visited"
function visitAdjacent(x, y, el) {
    for (let k = 0; k < 6; k++) {
        let temp = world.adjacent(x, y, k);
        if (temp.isFriendlyBase(el.base) && temp.visited == false) {
            temp.visited = true;
        }
    }
}