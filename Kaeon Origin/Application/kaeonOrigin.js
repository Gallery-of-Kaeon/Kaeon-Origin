var originLink = "https://gallery-of-kaeon.github.io/?path=https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/index.html&unitedJS=https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-Origin/master/Kaeon%20Origin/Application/kaeonOrigin.js"

var standardLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/Standard.js";

var oneLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/APIs/ONE/JavaScript/ONE.js";
var fusionLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/FUSION.js";
var kaeonFUSIONLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/KaeonFUSION.js";
var stoneLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/Philosophers-Stone/master/Philosopher's%20Stone/API/JavaScript/PhilosophersStone.js";
var onePlusLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/ONEPlus.js";
var ioLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/IO/ioBrowser.js";
var uiLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/UI.js";

var fusionRoot = "https://gallery-of-kaeon.github.io/?path=https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/index.html&unitedOP=";
var jsRoot = "https://gallery-of-kaeon.github.io/?path=https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/index.html&unitedJS=";

var one = require(oneLink);
var kaeonFUSION = require(kaeonFUSIONLink);
var onePlus = require(onePlusLink);

var io = require(ioLink);
var ui = require(uiLink);

var urlArgs = {};

window.location.href.replace(
	/[?&]+([^=&]+)=([^&]*)/gi,
	function(match, key, value) {
		urlArgs[key.toLowerCase()] = decodeURIComponent(value.toLowerCase());
	}
);

let tempCache = require.cache;

require = function(path) {

	require.localCache = require.localCache ? require.localCache : [[], []];
	require.cache = require.cache ? require.cache : [[], []];

	let localLowerPath = path.toLowerCase();
	
	let data = require.onePlus.readONEPlus(
		window.localStorage.getItem("kaeonOriginData")
	).children;

	for(let i = 0; i < data.length; i++) {

		let file = "file " + (i + 1);

		if(data[i].children.length != 0)
			file = data[i].children[0].content;

		if(file.toLowerCase() == localLowerPath) {

			let localIndex = require.localCache[0].indexOf(localLowerPath);
		
			if(localIndex == -1) {

				let allText = data[i].content;

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
						"require.onePlus = arguments[3];" +
						allText +
						";return module;"
					)
				)(
					newModule,
					require.cache,
					require.localCache,
					require.onePlus
				);
		
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
				"require.onePlus = arguments[3];" +
				allText +
				";return module;"
			)
		)(
			newModule,
			require.cache,
			require.localCache,
			require.onePlus
		);

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
require.onePlus = onePlus;

if(urlArgs.kaeonoriginjs != null || urlArgs.kaeonoriginfusion != null) {

	let code = "";

	let id =
		urlArgs.kaeonoriginjs != null ?
			Number(urlArgs.kaeonoriginjs) :
			Number(urlArgs.kaeonoriginfusion);
	
	let data = window.localStorage.getItem("kaeonOriginData");

	try {
		code = onePlus.readONEPlus(data).children[id].content;
	}

	catch(error) {

	}

	var output = ui.setStyle(
		ui.create("textarea"),
		[
			["white-space", "pre"],
			["position", "fixed"],
			["left", "0%"],
			["top", "70%"],
			["width", "100%"],
			["height", "30%"],
			["background", "white"],
			["border", "solid black"]
		]
	);

	ui.extend(ui.root, output);

	let isJS = urlArgs.kaeonoriginjs != null;

	if(isJS) {

		console.log = function() {

			for(let i = 0; i < arguments.length; i++)
				output.value += "" + arguments[i] + " ";

			output.value += "\n";
		}
	}

	else {

		console.log = function() {

			for(let i = 0; i < arguments.length; i++)
				output.value += "" + arguments[i];
		}
	}

	standardLink = null;

	oneLink = null;
	fusionLink = null;
	kaeonFUSIONLink = null;
	stoneLink = null;
	onePlusLink = null;
	ioLink = null;
	uiLink = null;

	fusionRoot = null;
	jsRoot = null;

	io = null;
	ui = null;

	if(isJS) {
		one = null;
		kaeonFUSION = null;
		onePlus = null;
	}

	urlArgs = null;

	if(isJS) {

		try {
			eval(code);
		}

		catch(error) {
			console.log(error.stack);
		}
	}

	else {

		try {

			(new kaeonFUSION.KaeonFUSION()).process(
				onePlus.readONEPlus(code.split("\r").join())
			);
		}

		catch(error) {
			console.log(error.stack);
		}
	}
}

else {

	document.title = "Kaeon Origin";

	ui.setStyle(
		ui.root,
		[
			["margin", "0"],
			["height", "100%"],
			["overflow", "hidden"]
		]
	);

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

	let tempSave = io.save;

	io.save = function(content, path) {

		if(path != null) {

			for(let i = 0; i < tabs.length; i++) {

				if(tabs[i].childNodes[1].innerHTML.toLowerCase() == path) {

					tabs[i].data = content;

					if(i == currentTab)
						text.value = content;

					saveData();

					return;
				}
			}

			addTab(createTab(content));

			tabs[tabs.length - 1].childNodes[1].innerHTML = path;
			tabs[tabs.length - 1].childNodes[1].style.background = "white";

			tabs[tabs.length - 1].named = true;

			saveData();
		}

		else
			tempSave(path);
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

	ui.extend(
		ui.root,
		ui.setStyle(
			ui.fill(
				ui.create("h1"),
				"Kaeon Origin"
			),
			[
				["position", "absolute"],
				["font-size", "4vh"],
				["top", "0px"],
				["left", "1vw"]
			]
		)
	);

	var options = ui.fill(ui.create("button"), "Options");

	ui.setStyle(
		options,
		[
			["position", "absolute"],
			["height", "10vh"],
			["width", "25vw"],
			["top", "0vh"],
			["left", "75vw"]
		]
	);

	options.onclick = function() {

		clearOutput();

		ui.extend(ui.root, ui.fill(ui.create("center"), "<h1>Resources</h1>"));

		ui.extend(ui.root, ui.fill(ui.create("h2"), "Kaeon FUSION Resources"));

		ui.extend(
			ui.root,
			ui.fill(
				ui.create("p"),
				"Standard Interface: <a href=\"" +
				standardLink +
				"\" target=\"_blank\">" +
				standardLink +
				"</a>"));
		
		ui.extend(ui.root, ui.fill(ui.create("h2"), "JavaScript Resources"));

		ui.extend(
			ui.root,
			ui.fill(
				ui.create("p"),
				"ONE Module: <a href=\"" +
				oneLink +
				"\" target=\"_blank\">" +
				oneLink +
				"</a>"));

		ui.extend(
			ui.root,
			ui.fill(
				ui.create("p"),
				"FUSION Module: <a href=\"" +
				fusionLink +
				"\" target=\"_blank\">" +
				fusionLink +
				"</a>"));

		ui.extend(
			ui.root,
			ui.fill(
				ui.create("p"),
				"Kaeon FUSION Module: <a href=\"" +
				kaeonFUSIONLink +
				"\" target=\"_blank\">" +
				kaeonFUSIONLink +
				"</a>"));

		ui.extend(
			ui.root,
			ui.fill(
				ui.create("p"),
				"Philosopher\'s Stone Module: <a href=\"" +
				stoneLink +
				"\" target=\"_blank\">" +
				stoneLink +
				"</a>"));

		ui.extend(
			ui.root,
			ui.fill(
				ui.create("p"),
				"ONE+ Module: <a href=\"" +
				onePlusLink +
				"\" target=\"_blank\">" +
				onePlusLink +
				"</a>"));

		ui.extend(
			ui.root,
			ui.fill(
				ui.create("p"),
				"IO Module: <a href=\"" +
				ioLink +
				"\" target=\"_blank\">" +
				ioLink +
				"</a>"));

		ui.extend(
			ui.root,
			ui.fill(
				ui.create("p"),
				"UI Module: <a href=\"" +
				uiLink +
				"\" target=\"_blank\">" +
				uiLink +
				"</a>"));

		ui.extend(ui.root, ui.fill(ui.create("h2"), "GhostHost Roots"));

		ui.extend(
			ui.root,
			ui.fill(
				ui.create("p"),
				"Kaeon FUSION GhostHost Root: <a href=\"" +
				fusionRoot +
				"\" target=\"_blank\">" +
				fusionRoot +
				"</a>"));

		ui.extend(
			ui.root,
			ui.fill(
				ui.create("p"),
				"JavaScript GhostHost Root: <a href=\"" +
				jsRoot +
				"\" target=\"_blank\">" +
				jsRoot +
				"</a>"));

		ui.extend(ui.root, ui.fill(ui.create("h2"), "Kaeon Origin Utilities"));

		ui.extend(
			ui.root,
			ui.fill(
				ui.create("p"),
				"Kaeon Origin Rendering Area CSS Selector: " +
				"<a href=\"javascript:undefined\">" +
				"html > div:nth-child(24)" +
				"</a>"));
	};

	ui.extend(ui.root, options);

	var openAll = ui.fill(ui.create("button"), "Open All");

	ui.setStyle(
		openAll,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "7.5vw"],
			["top", "10vh"],
			["left", "0vw"]
		]
	);

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

	ui.setStyle(
		saveAll,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "7.5vw"],
			["top", "10vh"],
			["left", "7.5vw"]
		]
	);

	saveAll.onclick = function() {

		tempSave(
			window.localStorage.getItem("kaeonOriginData"),
			"Kaeon Origin Workspace.op");
	};

	ui.extend(ui.root, saveAll);

	var openButton = ui.fill(ui.create("button"), "Open");

	ui.setStyle(
		openButton,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "7.5vw"],
			["top", "15vh"],
			["left", "0vw"]
		]
	);

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

	ui.setStyle(
		newFile,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "7.5vw"],
			["top", "15vh"],
			["left", "7.5vw"]
		]
	);

	newFile.onclick = function() {

		addTab();
		setTab(currentTab);

		saveData();
	};

	ui.extend(ui.root, newFile);

	var remove = ui.fill(ui.create("button"), "Remove");

	ui.setStyle(
		remove,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "15vw"],
			["top", "20vh"],
			["left", "0vw"]
		]
	);

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

	var files =
		ui.setStyle(
			ui.create("div"),
			[
				["overflow", "auto"]
			]
		);

	ui.setStyle(
		files,
		[
			["position", "absolute"],
			["height", "70vh"],
			["width", "15vw"],
			["top", "25vh"],
			["left", "0vw"]
		]
	);

	ui.extend(ui.root, files);

	var all = ui.fill(ui.create("button"), "All");

	ui.setStyle(
		all,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "7.5vw"],
			["top", "95vh"],
			["left", "0vw"]
		]
	);

	all.onclick = function() {

		for(let i = 0; i < tabs.length; i++)
			tabs[i].childNodes[0].checked = true;
	};

	ui.extend(ui.root, all);

	var none = ui.fill(ui.create("button"), "None");

	ui.setStyle(
		none,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "7.5vw"],
			["top", "95vh"],
			["left", "7.5vw"]
		]
	);

	none.onclick = function() {

		for(let i = 0; i < tabs.length; i++)
			tabs[i].childNodes[0].checked = false;
	};

	ui.extend(ui.root, none);

	var save = ui.fill(ui.create("button"), "Save");

	ui.setStyle(
		save,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "17.5vw"], // ["width", "8.75vw"],
			["top", "10vh"],
			["left", "15vw"] // ["left", "15vw"]
		]
	);

	save.onclick = function() {

		tempSave(
			text.value,
			tabs[currentTab].named ?
				tabs[currentTab].childNodes[1].innerHTML :
				"File " + (currentTab + 1) + ".txt");
	};

	ui.extend(ui.root, save);

	var printButton = ui.fill(ui.create("button"), "Print");

	ui.setStyle(
		printButton,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "17.5vw"], // ["width", "8.75vw"],
			["top", "10vh"],
			["left", "32.5vw"] // ["left", "23.75vw"]
		]
	);

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

	var setURLArgs = ui.fill(ui.create("button"), "Set URL");

	ui.setStyle(
		setURLArgs,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "8.75vw"],
			["top", "10vh"],
			["left", "32.5vw"]
		]
	);

	setURLArgs.onclick = function() {

	}

	// ui.extend(ui.root, setURLArgs);

	var setArgs = ui.fill(ui.create("button"), "Set Arguments");

	ui.setStyle(
		setArgs,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "11.66vw"], // ["width", "8.75vw"],
			["top", "10vh"],
			["left", "38.34vw"] // ["left", "41.25vw"]
		]
	);

	// var arguments = [];
	// var args = "";

	setArgs.onclick = function() {
		
		let string =
			prompt(
				"Current Arguments: " + args + "\nEnter the program arguments:");

		if(string == null)
			return;
		
		args = string;
		
		arguments = [];

		let argument = "";
		let inQuote = false;

		for(let i = 0; i < string.length; i++) {

			if(string.charAt(i) == '\"') {

				inQuote = !inQuote;

				continue;
			}

			if(string.charAt(i) == '\\' && i < string.length - 1) {

				argument += string.charAt(i + 1);
				i++;

				continue;
			}

			if(!inQuote &&
				((string.charAt(i) == ' ') || (string.charAt(i) == '\t')) &&
				argument.length > 0) {

				arguments.push(argument);
				argument = "";

				continue;
			}

			argument += string.charAt(i);
		}

		if(argument.length > 0)
			arguments.push(argument);
	}

	// ui.extend(ui.root, setArgs);

	var text =
		ui.specify(
			ui.setStyle(
				ui.create("textarea"),
				[
					["white-space", "pre"]
				]
			),
			[
				["spellcheck", "false"]
			]
		);

	ui.setStyle(
		text,
		[
			["resize", "none"],
			["position", "absolute"],
			["height", "74.5vh"],
			["width", "34.6vw"],
			["top", "15vh"],
			["left", "15vw"],
			["overflow", "auto"]
		]
	);

	text.addEventListener(
		"keydown",
		function(event) {

			let scrollY = text.scrollTop;
				
			let start = this.selectionStart;
			let end = this.selectionEnd;

			if(event.keyCode == 9 || event.which == 9) {

				event.preventDefault();

				if(start != end) {

					let value = text.value.substring(start, end).indexOf("\n");

					if(value == -1) {

						document.execCommand("insertText", false, "\t");

						return;
					}

					let startValue = start;

					while(start > 0) {
						
						if(text.value.charAt(start) == "\n")
							break;

						start--;
					}

					this.selectionStart = start;

					let insert = text.value.substring(start, end);

					if(start == 0) {

						if(!event.shiftKey)
							insert = "\t" + insert;
						
						else if(
							insert.charAt(0) == "\t" ||
							insert.charAt(0) == "\n") {

							insert = insert.substring(1);
						}
					}

					if(event.shiftKey)
						insert = insert.split("\n\t").join("\n");

					else
						insert = insert.split("\n").join("\n\t");

					let shifted =
						insert !=
						text.value.substring(
							this.selectionStart, this.selectionEnd);

					document.execCommand("insertText", false, insert);

					this.selectionStart =
						startValue +
						(shifted ?
							(event.shiftKey ? -1 : 1) : 0);

					this.selectionEnd = start + insert.length;
				}
				
				else
					document.execCommand("insertText", false, "\t");
			}

			if(start != end)
				text.scrollTop = scrollY;
		},
		false
	);

	ui.extend(document.documentElement, text);

	var run = ui.create("button");

	ui.setStyle(
		run,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "17.5vw"],
			["top", "90vh"],
			["left", "15vw"]
		]
	);

	run.innerHTML = "Run Kaeon FUSION";
	run.onclick = onRunFUSION;

	ui.extend(document.documentElement, run);

	var show = ui.create("button");

	ui.setStyle(
		show,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "17.5vw"],
			["top", "90vh"],
			["left", "32.5vw"]
		]
	);

	show.innerHTML = "Show ONE";
	show.onclick = showONE;

	ui.extend(document.documentElement, show);

	var runJS = ui.create("button");

	ui.setStyle(
		runJS,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "17.5vw"],
			["top", "95vh"],
			["left", "15vw"]
		]
	);

	runJS.innerHTML = "Run JavaScript";
	runJS.onclick = onRunJS;

	ui.extend(document.documentElement, runJS);

	var out =
		ui.specify(
			ui.setStyle(
				ui.create("textarea"),
				[
					["white-space", "pre"]
				]
			),
			[
				["spellcheck", "false"]
			]
		);

	ui.setStyle(
		out,
		[
			["resize", "none"],
			["position", "absolute"],
			["height", "20vh"],
			["width", "34.6vw"],
			["top", "75vh"],
			["left", "15vw"]
		]
	);

	out.readOnly = true;

	// ui.extend(document.documentElement, out);

	var clear = ui.create("button");

	ui.setStyle(
		clear,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "17.5vw"],
			["top", "95vh"],
			["left", "32.5vw"]
		]
	);

	clear.innerHTML = "Clear";
	clear.onclick = clearOutput;

	ui.extend(document.documentElement, clear);

	ui.extend(
		ui.root,
		ui.setStyle(
			ui.create("div"),
			[
				["background", "black"],
				["position", "absolute"],
				["height", "1vh"],
				["width", "50vw"],
				["top", "10vh"],
				["left", "50vw"]
			]
		)
	);

	ui.extend(
		ui.root,
		ui.setStyle(
			ui.create("div"),
			[
				["background", "black"],
				["position", "absolute"],
				["height", "1vh"],
				["width", "50vw"],
				["top", "99vh"],
				["left", "50vw"]
			]
		)
	);

	ui.extend(
		ui.root,
		ui.setStyle(
			ui.create("div"),
			[
				["background", "black"],
				["position", "absolute"],
				["height", "90vh"],
				["width", "1vw"],
				["top", "10vh"],
				["left", "50vw"]
			]
		)
	);

	ui.extend(
		ui.root,
		ui.setStyle(
			ui.create("div"),
			[
				["background", "black"],
				["position", "absolute"],
				["height", "90vh"],
				["width", "1vw"],
				["top", "10vh"],
				["left", "99vw"]
			]
		)
	);

	var display = ui.create("div");

	ui.setStyle(
		display,
		[
			["background", "white"],
			["overflow", "auto"],
			["white-space", "pre"],
			["position", "absolute"],
			["height", "88vh"],
			["width", "48vw"],
			["top", "11vh"],
			["left", "51vw"]
		]
	);

	ui.extend(document.documentElement, display);

	// console.log = function() {

	// 	for(let i = 0; i < arguments.length; i++)
	// 		out.value += "" + arguments[i] + " ";
		
	// 	out.value += "\n";
	// }

	ui.root = display;

	var tempInterval = setInterval;
	var tempTimeout = setTimeout;

	var intervals = [];
	var timeouts = [];

	setInterval = function(interval, time) {

		let value = tempInterval(interval, time);
		intervals.push(value);

		return value;
	}

	setTimeout = function(timeout, time) {

		let value = tempTimeout(timeout, time);
		timeouts.push(value);

		return value;
	}

	function clearOutput() {

		require.localCache = [[], []];

		out.value = "";

		ui.setStyle(
			display,
			[
				["background", "white"],
				["overflow", "auto"],
				["white-space", "pre"],
				["position", "absolute"],
				["height", "88vh"],
				["width", "48vw"],
				["top", "11vh"],
				["left", "51vw"]
			]
		);

		display.innerHTML = "";

		for(let i = 0; i < intervals.length; i++)
			clearInterval(intervals[i]);

		for(let i = 0; i < timeouts.length; i++)
			clearTimeout(timeouts[i]);
	}

	function onRun(callback) {

		clearOutput();

		try {
			callback();
		}

		catch(error) {
			out.value = "ERROR:\n\n" + error;
		}
	}

	function onRunFUSION() {

		display.innerHTML = "";

		ui.extend(
			display,
			ui.setStyle(
				ui.specify(
					ui.create("iframe"),
					[
						["src", originLink + "&kaeonoriginfusion=" + currentTab]
					]
				),
				[
					["width", "100vw"],
					["height", "100vh"],
					["left", "0vw"],
					["top", "0vh"],
					["position", "absolute"],
					["overflow", "auto"]
				]
			)
		);
	}

	function onRunJS() {

		display.innerHTML = "";

		ui.extend(
			display,
			ui.setStyle(
				ui.specify(
					ui.create("iframe"),
					[
						["src", originLink + "&kaeonoriginjs=" + currentTab]
					]
				),
				[
					["width", "100vw"],
					["height", "100vh"],
					["left", "0vw"],
					["top", "0vh"],
					["position", "absolute"],
					["overflow", "auto"]
				]
			)
		);
	}

	function showONE() {

		display.innerHTML = "";

		var oneText = ui.setStyle(
			ui.specify(
				ui.create("textarea"),
				[
					["spellcheck", "false"]
				]
			),
			[
				["overflow", "auto"],
				["left", "0vw"],
				["top", "0vh"],
				["width", "100%"],
				["height", "100%"],
				["white-space", "pre"]
			]
		);

		oneText.readOnly = true;

		ui.extend(display, oneText);

		try {
			oneText.value = one.writeONE(onePlus.readONEPlus(text.value));
		}

		catch(error) {
			oneText.value = "ERROR: INVALID ONE+";
		}
	}

	load();
	setTab(0);

	tempInterval(saveData, 1000);
}