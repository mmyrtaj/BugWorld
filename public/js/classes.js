class BugBrain {
    instruction = [];
    index = 0;
    getNextInstruction(i) {
        return this.instruction[i];
    }
}
class Bug extends BugBrain {
    id;
    color;
    state;
    resting;
    pos = [];
    direction;
    hasFood;
    brain;
    getPosition() {
        return this.pos;
    }
    sense(dir, s1, s2) { }
    mark(m, s) { }
    unmark(i, s) { }
    pickup(s1, s2) { }
    drop(s) { }
    turn(lr, s) { }
    move(s1, s2) { }
    flip(p, s1, s2) { }
    direction(d, s1, s2) { }
    kill() { }
}
class WorldCell {
    obstructed;
    bug = false;
    food;
    marker = [];
    base;
    visited = false;
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