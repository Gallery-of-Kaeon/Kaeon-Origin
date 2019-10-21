var one = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/APIs/ONE/JavaScript/ONE.js");
var kaeonFUSION = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/KaeonFUSION.js");
var onePlus = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/ONEPlus.js");

var io = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/IO/ioBrowser.js");
var ui = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/UI.js");

document.title = "Kaeon Origin";

var tabs = [];
var currentTab = 0;

function createTab(data, index) {

	if(index == null)
		index = tabs.length;

	let tab = ui.create("div");

	let check = ui.create("input");
	check.type = "checkbox";

	let button = ui.fill(ui.create("button"), "File " + (index + 1));
	button.index = index;
	
	button.onclick = function() {
		setTab(button.index);
	};

	ui.extend(tab, check);
	ui.extend(tab, button);

	tab.data = data != null ? data : "";

	return tab;
}

function addTab(tab) {

	if(tab == null)
		tab = createTab();

	tab.line = ui.create("br");

	tabs.push(tab);

	ui.extend(files, tab);
	ui.extend(files, tab.line);
}

function load() {

	let data = window.localStorage.getItem("kaeonOriginData");

	try {
		data = onePlus.readONEPlus(data);
	}

	catch(error) {
		data = one.createElement("");
	}

	if(data.children.length == 0)
		one.addChild(data, one.createElement(""));

	for(let i = 0; i < data.children.length; i++)
		addTab(createTab(data.children[i].content, i));

	text.value = data.children[0].content;

	saveData();
}

function saveData() {

	try {

		let data = new one.Element();
		
		tabs[currentTab].data = text.value;

		for(let i = 0; i < tabs.length; i++)
			one.addChild(data, one.createElement(tabs[i].data));
		
		window.localStorage.setItem("kaeonOriginData", one.writeONE(data));
	}

	catch(error) {

	}
}

function setTab(index) {

	saveData();

	for(let i = 0; i < tabs.length; i++) {

		tabs[i].childNodes[1].style.background =
			i == index ? "green" : "white";
	}

	currentTab = index;
	text.value = tabs[index].data;
}

ui.extend(document.documentElement, ui.fill(ui.create("h1"), "Kaeon Origin"));
ui.extend(document.documentElement, ui.create("br"));

var options = ui.fill(ui.create("button"), "Options");

options.onclick = function() {

	clearOutput();

	ui.extend(display, ui.fill(ui.create("h1"), "Help:"));
	ui.extend(display, ui.create("br"));

	ui.extend(display, ui.fill(ui.create("p"), "Standard Interface: https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/Standard.js"));
};

ui.extend(ui.root, options);
ui.extend(ui.root, ui.create("br"));

var openButton = ui.fill(ui.create("button"), "Open");

openButton.onclick = function() {

	io.open(
		function(text) {

			addTab(createTab(text));

			saveData();
		}
	);
};

ui.extend(ui.root, openButton);

var newFile = ui.fill(ui.create("button"), "New");

newFile.onclick = function() {

	addTab();

	saveData();
};

ui.extend(ui.root, newFile);
ui.extend(ui.root, ui.create("br"));

var remove = ui.fill(ui.create("button"), "Remove");

remove.onclick = function() {

	let temp = tabs[currentTab];
	let current = false;

	for(let i = 0; i < tabs.length && !current; i++) {

		if(tabs[i].childNodes[0].checked && i == currentTab)
			current = true;
	}

	currentTab = -1;

	for(let i = 0; i < tabs.length; i++) {

		if(tabs[i].childNodes[0].checked) {

			files.removeChild(tabs[i]);
			files.removeChild(tabs[i].line);

			tabs.splice(i, 1);

			i--;
		}
	}

	for(let i = 0; i < tabs.length; i++) {

		let button = tabs[i].childNodes[1];
		ui.fill(button, "File " + (i + 1));

		button.index = i;

		if(tabs[i] === temp)
			setTab(i);
	}

	if(tabs.length == 0)
		addTab();

	if(current)
		setTab(0);

	saveData();
};

ui.extend(ui.root, remove);
ui.extend(ui.root, ui.create("br"));

var files =
	ui.setStyle(
		ui.create("div"),
		[
			["width", "30vh"],
			["height", "20vh"],
			["border", "thick solid #000000"],
			["overflow", "auto"]
		]
	);

ui.extend(ui.root, files);
ui.extend(ui.root, ui.create("br"));

var all = ui.fill(ui.create("button"), "All");

all.onclick = function() {

	for(let i = 0; i < tabs.length; i++)
		tabs[i].childNodes[0].checked = true;
};

ui.extend(ui.root, all);

var none = ui.fill(ui.create("button"), "None");

none.onclick = function() {

	for(let i = 0; i < tabs.length; i++)
		tabs[i].childNodes[0].checked = false;
};

ui.extend(ui.root, none);
ui.extend(ui.root, ui.create("br"));

var save = ui.fill(ui.create("button"), "Save");

save.onclick = function() {
	io.save(text.value, "File " + (currentTab + 1) + ".txt");
};

ui.extend(ui.root, save);

var printButton = ui.fill(ui.create("button"), "Print");

printButton.onclick = function() {

	var mywindow = window.open('', 'PRINT', 'height=400,width=600');

	mywindow.document.write(text.value);

	mywindow.document.close();
	mywindow.focus();

	mywindow.print();
	mywindow.close();

	return true;
};

ui.extend(ui.root, printButton);
ui.extend(ui.root, ui.create("br"));

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

var clear = ui.create("button");

clear.innerHTML = "Clear";
clear.onclick = clearOutput;

ui.extend(document.documentElement, clear);
ui.extend(document.documentElement, ui.create("br"));

var display =
	ui.setStyle(
		ui.create("div"),
		[
			["width", "50vh"],
			["height", "50vh"],
			["border", "thick solid #000000"],
			["overflow", "auto"],
			["white-space", "pre"]
		]
	);

ui.extend(document.documentElement, display);

function clearOutput() {

	out.value = "";

	ui.setStyle(
		display,
		[
			["width", "50vh"],
			["height", "50vh"],
			["border", "thick solid #000000"],
			["overflow", "auto"],
			["background", "white"],
			["white-space", "pre"]
		]
	);

	display.innerHTML = "";
}

function onRun(callback) {

	out.value = "";

	let tempLog = console.log;
	ui.root = display;

	console.log = function() {

		for(let i = 0; i < arguments.length; i++)
			out.value += "" + arguments[i] + " ";
		
		out.value += "\n";
	}

	ui.setStyle(
		display,
		[
			["width", "50vh"],
			["height", "50vh"],
			["border", "thick solid #000000"],
			["overflow", "auto"],
			["background", "white"],
			["white-space", "pre"]
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

load();
setTab(0);

setInterval(saveData, 1000);