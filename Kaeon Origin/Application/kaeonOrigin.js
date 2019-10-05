var kaeonFUSION = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/KaeonFUSION.js");
var onePlus = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/ONEPlus.js");			

var ui = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/UI.js")

var text = ui.create("textarea");

ui.extend(document.documentElement, text);

var run = ui.create("button");

run.innerHTML = "Run";
run.onclick = onRun;

ui.extend(document.documentElement, ui.create("br"));
ui.extend(document.documentElement, run);

function onRun() {

	let fusion = new kaeonFUSION.KaeonFUSION();

	fusion.process(onePlus.readONEPlus(text.value));
}