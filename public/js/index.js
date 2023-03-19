//class declarations
class BugBrain {
    instruction = [];
    pos = 0;
    getNextInstruction() { }
}
class Bug {
    id;
    color;
    state;
    resting;
    direction;
    hasFood;
    brain;
    kill() { }
    getPosition() { }
    toString() { }
}
class WorldCell {
    obstructed;
    bug = false;
    food;
    marker = [];
    base;
    constructor(type) {
        if (typeof type == Number) {
            this.food = type
        }
        switch (type) {
            case '#':
                this.obstructed = true;
                break;
            case '+':
                this.base = "Red";
                break;
            case '-':
                this.base = "Black";
                break;
            case '.':
                this.obstructed = false
                break;
            default:
                this.food = type;
                break;
        }
    }
    isObstructed() {
        return this.obstructed;
    }
    isOccupied() {
        return this.bug !== false;
    }
    setBug(Bug) {
        this.bug = Bug;
    }
    getBug() {
        return this.bug;
    }
    removeBug() {
        this.bug = false;
    }
    setFood(value) {
        this.food = value;
    }
    isFriendlyBase(color) {
        return this.base == color;
    }
    isEnemyBase(color) {
        return this.base != color;
    }
    setMarker(color, value) {
        this.marker.push([color, value]);
    }
    clearMarker(color, value) {
        let index = this.marker.indexOf([color, value]);
        if (index > -1) {
            this.marker.splice(index, 1);
        }
    }
    isFriendlyMarker(color) {
        return color == this.marker[0];
    }
    isEnemyMarker(color) {
        return color != this.marker[0];
    }
}
class World {
    x;
    y;
    map = [];
    cellAt(x, y) {
        return this.map[x][y];
    }
    adjacent(x, y, direction) {
        switch (direction) {
            case 0:
                return this.map[x + 1][y];
            case 1:
                return this.map[x + 1][y + 1];
            case 2:
                return this.map[x][y + 1];
            case 3:
                return this.map[x - 1][y];
            case 4:
                return this.map[x][y - 1];
            case 5:
                return this.map[x + 1][y - 1];
        }
    }
    isObstructedAt(x, y) {
        return this.map[x][y].isObstructed();
    }
    isOccupiedAt(x, y) {
        return this.map[x][y].isOccupied();
    }
    setBugAt(x, y, Bug) {
        this.map[x][y].bug = Bug;
    }
    getBugAt(x, y) {
        this.map[x][y].getBug;
    }
    removeBugAt(x, y) {
        this.map[x][y].removeBug();
    }
    setFoodAt(x, y, amount) {
        this.map[x][y].setFood(amount);
    }
    getFoodAt(x, y) {
        return this.map[x][y].food
    }
    isFriendlyBaseAt(x, y, color) {
        return this.map[x][y].isFriendlyBase(color);
    }
    isEnemyBaseAt(x, y, color) {
        return this.map[x][y].isEnemyBase(color);
    }
    setMarkerAt(x, y, color, value) {
        return this.map[x][y].setMarker(color, value);
    }
    clearMarkerAt(x, y, color, value) {
        return this.map[x][y].clearMarker(color, value);
    }
    isFriendlyMarkerAt(x, y, color) {
        return this.map[x][y].isFriendlyMarker(color);
    }
    isEnemyMarkerAt(x, y, color) {
        return this.map[x][y].isEnemyMarker(color);
    }
}
class Simulator {
    engine;
    tournament;
    logger;
    simulator(world, redBugs, blackBugs) { }
}
class Tournament {
    world;
    redBugs;
    blackBugs;
    run(world, redBugs, blackBugs) { }
    getCurrentTournamentStatus() { }
}
class Engine {
    world;
    redBugs;
    blackBugs;
    cycles;
    run(world, redBugs, blackBugs, cycles, Logger) { }
}

class Logger {
    logging = false;
    log;
}

// constructing classes
const world = new World;
const brain1 = new BugBrain;
const brain2 = new BugBrain;

// function to read the world map
function readMap(input) {
    const file = input.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        worldmap: {
            const file = event.target.result;
            const allLines = file.split(/\r\n|\n/);
            var c = 0;

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

// function to clear the value of a field
function clearValueOfElement(id) {
    document.getElementById(id).value = "";
}

// function to check if the world recieved is a valid world and if it is correct it will swap
// the values from a character to a WorldCell class
function worldCheck(map) {
    var redSwarm = 0, blackSwarm = 0;
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
        if (redSwarm == 0 || blackSwarm == 0) {
            alert("Error: One of the bug swarms is missing");
            clearValueOfElement('mapInput');
            world.map = [];
            break endcheck;
        }
        for (let i = 1; i < world.x - 2; i++) {
            for (let j = 1; j < world.y - 2; j++) {
                let c = world.map[i][j];
                let foundBase = 0;
                // checking for red bases if they are connected
                if (c == "+") {
                    for (let k = 0; k < 6; k++) {
                        if (world.map[i][j].adjacent(i, j, k).isFriendlyBase("Red")) {
                            foundBase++;
                        }
                    }
                    // checking for black bases if they are connected
                } else if (c == "-") {
                    for (let k = 0; k < 6; k++) {

                        if (world.map[i][j].adjacent(i, j, k).isFriendlyBase("Black")) {
                            foundBase++;
                        }
                    }
                }
                if (foundBase == 0) {
                    alert("Error: Swarm have to be linked!");
                    clearValueOfElement('mapInput');
                    world.map = [];
                    break endcheck;
                }
            }

        }
    }
}
