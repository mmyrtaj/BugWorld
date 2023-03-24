// global variables
const instruction = ["Sense", "Mark", "Unmark", "Pickup", "Drop", "Turn", "Move", "Flip", "Direction"];
const senseDir = ["Here", "Ahead", "LeftAhead", "RightAhead"];
const conditions = ["Friend", "Foe", "FriendWithFood", "FoeWithFood", "Food", "Rock", "Marker", "FoeMarker", "Home", "FoeHome"]


// constructing classes
const world = new World;
const brain1 = new BugBrain;
const brain2 = new BugBrain;

// function to clear the value of a field
function clearValueOfElement(id) {
    document.getElementById(id).value = "";
}