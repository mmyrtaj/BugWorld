// function to toggle display on and off
function toggle(x) {
    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}

// opens the settings page
function openSettings() {
    var currDiv = document.getElementById("startPage");
    var nextDiv = document.getElementById("settingsPage");
    toggle(currDiv);
    toggle(nextDiv);
}

// opens the home page
function openHome() {
    var currDiv = document.getElementById("settingsPage");
    var nextDiv = document.getElementById("homePage");
    toggle(currDiv);
    toggle(nextDiv);
}

// opens the options page
function openOptions() {
    var currDiv = document.getElementById("homePage");
    var nextDiv = document.getElementById("optionsPage");
    toggle(currDiv);
    toggle(nextDiv);
}

// opens the quit page
function openQuit() {
    var currDiv = document.getElementById("homePage");
    var nextDiv = document.getElementById("quitPage");
    toggle(currDiv);
    toggle(nextDiv);
}

// opens the home page from options page
function openHomeOptions() {
    var currDiv = document.getElementById("optionsPage");
    var nextDiv = document.getElementById("homePage");
    toggle(currDiv);
    toggle(nextDiv);
}

// opens the home page from quit page
function openHomeQuit() {
    var currDiv = document.getElementById("quitPage");
    var nextDiv = document.getElementById("homePage");
    toggle(currDiv);
    toggle(nextDiv);
}

// opens the restart page
function openRestart() {
    var currDiv = document.getElementById("quitPage");
    var nextDiv = document.getElementById("restartPage");
    toggle(currDiv);
    toggle(nextDiv);
}