document.addEventListener("DOMContentLoaded", loaded);

function loaded() {
    setInterval(loopTitle, 300);
}

var x = 0;
var titleText = ["_", "B_", "BR_", "BRA_", "BRAI_", "BRAIN", "BRAINZ_", "_"]; 

function loopTitle() {
    document.title = titleText[x++ % titleText.length];
}
