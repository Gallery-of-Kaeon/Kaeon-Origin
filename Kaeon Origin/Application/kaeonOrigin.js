var one = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/APIs/ONE/JavaScript/ONE.js");
var kaeonFUSION = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/KaeonFUSION.js");
var onePlus = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/ONEPlus.js");

var ui = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/UI.js");

document.title = "Kaeon Origin";

let link = ui.create("link");

link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = 'https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/Logo/Kaeon%20FUSION%20Logo.png';

document.getElementsByTagName("head")[0].appendChild(link);

var text = ui.create("textarea");

ui.extend(document.documentElement, text);
ui.extend(document.documentElement, ui.create("br"));

var run = ui.create("button");

run.innerHTML = "Run";
run.onclick = onRun;

ui.extend(document.documentElement, run);

var show = ui.create("button");

show.innerHTML = "Show ONE";
show.onclick = showONE;

ui.extend(document.documentElement, show);

function onRun() {

	let fusion = new kaeonFUSION.KaeonFUSION();

	fusion.process(onePlus.readONEPlus(text.value));
}

function showONE() {
	console.log(one.writeONE(onePlus.readONEPlus(text.value)));
}