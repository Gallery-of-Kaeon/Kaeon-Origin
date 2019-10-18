var one = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/APIs/ONE/JavaScript/ONE.js");
var kaeonFUSION = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/KaeonFUSION.js");
var onePlus = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/ONEPlus.js");

var ui = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/UI.js");

document.title = "Kaeon Origin";

ui.extend(document.documentElement, ui.fill(ui.create("h1"), "Kaeon Origin"));
ui.extend(document.documentElement, ui.create("br"));

var text =
	ui.setStyle(
		ui.create("textarea"),
		[
			["white-space", "pre"]
		]
	);

text.onkeydown = function(event) {

	if(event.keyCode == 9 || event.which == 9) {

		event.preventDefault();
		
		let start = this.selectionStart;
		
		this.value =
			this.value.substring(0, this.selectionStart) +
			"\t" +
			this.value.substring(this.selectionEnd);
			
		this.selectionEnd = start + 1; 
	}
}

ui.extend(document.documentElement, text);
ui.extend(document.documentElement, ui.create("br"));

var run = ui.create("button");

run.innerHTML = "Run Kaeon FUSION";
run.onclick = onRunFUSION;

ui.extend(document.documentElement, run);

var show = ui.create("button");

show.innerHTML = "Show ONE";
show.onclick = showONE;

ui.extend(document.documentElement, show);
ui.extend(document.documentElement, ui.create("br"));

var runJS = ui.create("button");

runJS.innerHTML = "Run JavaScript";
runJS.onclick = onRunJS;

ui.extend(document.documentElement, runJS);
ui.extend(document.documentElement, ui.create("br"));

var out =
	ui.setStyle(
		ui.create("textarea"),
		[
			["white-space", "pre"]
		]
	);

out.readOnly = true;

ui.extend(document.documentElement, out);
ui.extend(document.documentElement, ui.create("br"));

var display =
	ui.setStyle(
		ui.create("div"),
		[
			["width", "50vh"],
			["height", "50vh"],
			["border", "thick solid #000000"],
			["overflow", "auto"]
		]
	);

ui.extend(document.documentElement, display);

function onRun(callback) {

	out.value = "";

	let tempLog = console.log;
	ui.root = display;

	console.log = function() {

		for(let i = 0; i < arguments.length; i++)
			out.value += "" + arguments[i] + " ";
		
		out.value += "\n";
	}

	readline = prompt;

	ui.setStyle(
		display,
		[
			["width", "50vh"],
			["height", "50vh"],
			["border", "thick solid #000000"],
			["overflow", "auto"]
		]
	);

	display.innerHTML = "";

	tempDoc = display;

	try {
		callback();
	}

	catch(error) {
		out.value = "ERROR";
	}

	console.log = tempLog;
	ui.root = document.documentElement;
}

function onRunFUSION() {

	onRun(
		function() {

			(new kaeonFUSION.KaeonFUSION()).process(
				onePlus.readONEPlus(text.value));
		}
	);
}

function onRunJS() {

	onRun(
		function() {
			eval(text.value);
		}
	);
}

function showONE() {

	try {
		out.value = one.writeONE(onePlus.readONEPlus(text.value));
	}

	catch(error) {
		out.value = "ERROR: INVALID ONE+";
	}
}