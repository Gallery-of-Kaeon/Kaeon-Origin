var one = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/APIs/ONE/JavaScript/ONE.js");
var kaeonFUSION = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/KaeonFUSION.js");
var onePlus = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/ONEPlus.js");

var io = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/IO/ioBrowser.js");
var ui = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/UI.js");

document.title = "Kaeon Origin";

let tempCache = require.cache;

require = function(path) {

	require.localCache = require.localCache ? require.localCache : [[], []];
	require.cache = require.cache ? require.cache : [[], []];

	let localLowerPath = path.toLowerCase();

	for(let i = 0; i < tabs.length; i++) {

		if(tabs[i].childNodes[1].innerHTML.toLowerCase() == localLowerPath) {

			let localIndex = require.localCache[0].indexOf(localLowerPath);
		
			if(localIndex == -1) {

				let allText = tabs[i].data;

				let newModule = {
					id: path,
					exports: { },
					parent: module,
					filename: path,
					loaded: false,
					children: [],
					paths: []
				};
		
				require.localCache[0].push(localLowerPath);
				require.localCache[1].push(newModule);
		
				let newModuleContents = (
					new Function(
						"var module = arguments[0];" +
						"var require = " +
						require.toString() +
						";require.cache = arguments[1];" +
						"require.localCache = arguments[2];" +
						allText +
						";return module;"
					)
				)(newModule, require.cache, require.localCache);
		
				for(key in newModuleContents)
					newModule.exports[key] = newModuleContents.exports[key];
		
				module.children.push(newModule);
				newModule.loaded = true;
		
				return newModule.exports;
			}

			else {
				return require.localCache[1][localIndex];
			}
		}
	}

	if(module.parent != null) {

		if(path.startsWith(".")) {

			path =
				module.filename.substring(0, module.filename.lastIndexOf('/') + 1) +
				path;
		}
	}

	let lowerPath = path.toLowerCase();

	while(lowerPath.startsWith("././"))
		lowerPath = lowerPath.substring(2);

	let index = require.cache[0].indexOf(lowerPath);

	if(index == -1) {

		let cors_api_url = 'https://cors-anywhere.herokuapp.com/';

		let rawFile = new XMLHttpRequest();

		rawFile.open("GET", cors_api_url + path, false);

		let allText = "";

		rawFile.onreadystatechange = function() {

			if(rawFile.readyState === 4) {

				if(rawFile.status === 200 || rawFile.status == 0)
					allText = rawFile.responseText;
			}
		}

		rawFile.send(null);

		let newModule = {
			id: path,
			exports: { },
			parent: module,
			filename: path,
			loaded: false,
			children: [],
			paths: []
		};

		require.cache[0].push(lowerPath);
		require.cache[1].push(newModule);

		let newModuleContents = (
			new Function(
				"var module = arguments[0];" +
				"var require = " +
				require.toString() +
				";require.cache = arguments[1];" +
				"require.localCache = arguments[2];" +
				allText +
				";return module;"
			)
		)(newModule, require.cache, require.localCache);

		for(key in newModuleContents)
			newModule.exports[key] = newModuleContents.exports[key];

		module.children.push(newModule);
		newModule.loaded = true;

		return newModule.exports;
	}

	else
		return require.cache[1][index].exports;
}

require.cache = tempCache;

var tempIO = io.open;

io.open = function(path) {

	if(typeof path != "function") {

		for(let i = 0; i < tabs.length; i++) {

			if(tabs[i].childNodes[1].innerHTML.toLowerCase() ==
				path.toLowerCase()) {

				return tabs[i].data;
			}
		}
	}

	return tempIO(path);
}

var tabs = [];
var currentTab = 0;

function createTab(data, index, name) {

	if(index == null)
		index = tabs.length;

	let tab = ui.create("div");
	tab.named = name != null;

	let check = ui.create("input");
	check.type = "checkbox";

	let button =
		ui.fill(
			ui.create("button"),
			name == null ? ("File " + (index + 1)) : name);

	button.index = index;
	
	button.onclick = function() {
		setTab(button.index);
	};

	let nameButton = ui.fill(ui.create("button"), "Set Name");
	nameButton.index = index;
	
	nameButton.onclick = function() {

		let newName = prompt("Enter this file's name:");

		if(newName == null)
			return;

		tabs[nameButton.index].childNodes[1].innerHTML = newName;
		tabs[nameButton.index].named = true;
	};

	ui.extend(tab, check);
	ui.extend(tab, button);
	ui.extend(tab, nameButton);

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

	tabs = [];
	files.innerHTML = "";

	let data = window.localStorage.getItem("kaeonOriginData");

	try {
		data = onePlus.readONEPlus(data);
	}

	catch(error) {
		data = one.createElement("");
	}

	if(data.children.length == 0)
		one.addChild(data, one.createElement(""));

	for(let i = 0; i < data.children.length; i++) {

		let name = null;

		if(data.children[i].children.length > 0)
			name = data.children[i].children[0].content;

		addTab(createTab(data.children[i].content, i, name));
	}

	text.value = data.children[0].content;

	setTab(0);
}

function saveData() {

	try {

		let data = new one.Element();
		
		tabs[currentTab].data = text.value;

		for(let i = 0; i < tabs.length; i++) {

			let item = one.createElement(tabs[i].data);

			one.addChild(data, item);

			if(tabs[i].named) {

				one.addChild(
					item, one.createElement(tabs[i].childNodes[1].innerHTML));
			}
		}
		
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

	ui.extend(
		display,
		ui.fill(
			ui.create("p"),
			"Standard Interface: " +
			"https://raw.githubusercontent.com/Gallery-of-Kaeon/" +
			"JavaScript-Utilities/master/JavaScript%20Utilities/" +
			"United%20Bootstrap/Standard.js"));
};

ui.extend(ui.root, options);
ui.extend(ui.root, ui.create("br"));

var openAll = ui.fill(ui.create("button"), "Open All");

openAll.onclick = function() {
	
	if(!confirm(
		"This will delete the contents of the existing workspace." +
		"\nAre you okay with this?")) {

		return;
	}

	if(confirm("Is the file you want to upload online?")) {

		let text = null;

		try {

			let url = prompt("Enter the URL:");

			if(url == null)
				return;

			text = io.open("https://cors-anywhere.herokuapp.com/" + url);
		}

		catch(error) {
			return;
		}

		window.localStorage.setItem("kaeonOriginData", text);

		load();
	}
	
	else {

		io.open(
			function(text) {

				window.localStorage.setItem("kaeonOriginData", text);

				load();
			}
		);
	}
};

ui.extend(ui.root, openAll);

var saveAll = ui.fill(ui.create("button"), "Save All");

saveAll.onclick = function() {

	io.save(
		window.localStorage.getItem("kaeonOriginData"),
		"Kaeon Origin Workspace.op");
};

ui.extend(ui.root, saveAll);
ui.extend(ui.root, ui.create("br"));

var openButton = ui.fill(ui.create("button"), "Open");

openButton.onclick = function() {

	if(confirm("Is the file you want to upload online?")) {

		let text = null;

		try {

			let url = prompt("Enter the URL:");

			if(url == null)
				return;

			text = io.open("https://cors-anywhere.herokuapp.com/" + url);
		}

		catch(error) {
			return;
		}

		addTab(createTab(text));
		setTab(currentTab);

		saveData();
	}

	else {

		io.open(
			function(text) {

				addTab(createTab(text));
				setTab(currentTab);

				saveData();
			}
		);
	}
};

ui.extend(ui.root, openButton);

var newFile = ui.fill(ui.create("button"), "New");

newFile.onclick = function() {

	addTab();
	setTab(currentTab);

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

		if(!tabs[i].named)
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
			["width", "40vh"],
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

	io.save(
		text.value,
		tabs[currentTab].named ?
			tabs[currentTab].childNodes[1].innerHTML :
			"File " + (currentTab + 1) + ".txt");
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

	require.localCache = [[], []];

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
		out.value = "ERROR:\n\n" + error;
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