var originLink = "https://gallery-of-kaeon.github.io/?path=https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/index.html&unitedJS=https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-Origin/master/Kaeon%20Origin/Application/kaeonOrigin.js"

var standardLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/Source/Modules/Interfaces/Standard.js";

var oneLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/Source/Engine/ONE.js";
var fusionLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/Source/Engine/FUSION.js";
var kaeonFUSIONLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/Source/Engine/KaeonFUSION.js";
var stoneLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/Philosophers-Stone/master/Philosopher's%20Stone/API/JavaScript/PhilosophersStone.js";
var onePlusLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/Source/Engine/ONEPlus.js";
var universalPreprocessorLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/Source/Engine/UniversalPreprocessor.js";
var oneSuiteLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/Source/Engine/ONESuite.js";
var ioLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/IO/io.js";
var httpLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/HTTP%20Utils/httpUtils.js";
var uiLink = "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/UI.js";

var fusionRoot = "https://gallery-of-kaeon.github.io/?unitedOP=";
var jsRoot = "https://gallery-of-kaeon.github.io/?unitedJS=";
var htmlRoot = "https://gallery-of-kaeon.github.io/?unitedOP=";

var cors_api_path = 'https://stormy-beach-14823.herokuapp.com/';

var one = require(oneLink);
var kaeonFUSION = require(kaeonFUSIONLink);
var onePlus = require(onePlusLink);
var oneSuite = require(oneSuiteLink);

var io = require(ioLink);

function makeOnlineRequest(path, cors) {

	try {

		if(cors)
			path = 'https://stormy-beach-14823.herokuapp.com/' + path;
		
		let rawFile = new XMLHttpRequest();

		rawFile.open("GET", path, false);

		rawFile.setRequestHeader("Origin", "https://www.abc_" + Math.random() + ".com");

		let allText = "";

		rawFile.onreadystatechange = function() {

			if(rawFile.readyState === 4) {

				if(rawFile.status === 200 || rawFile.status == 0)
					allText = rawFile.responseText;
			}
		}

		rawFile.send(null);

		return allText;
	}

	catch(error) {
		return "";
	}
}

var ui = {

	root: document.documentElement,
	styles: [],
	
	load: function() {
	
		ui.load.cache = ui.load.cache != null ? ui.load.cache : [];
		
		for(let i = 0; i < arguments.length; i++) {
	
			if(!Array.isArray(arguments[i]))
				arguments[i] = [arguments[i]];
	
			for(let j = 0; j < arguments[i].length; j++) {
	
				if(ui.load.cache.includes(arguments[i][j]))
					continue;
				
				ui.load.cache.push(arguments[i][j]);
	
				if(arguments[i][j].endsWith(".js"))
					ui.loadScript(arguments[i][j]);
	
				if(arguments[i][j].endsWith(".css"))
					ui.loadStyle(arguments[i][j]);
			}
		}
	},
	
	loadStyle: function(path) {
		
		let link = document.createElement("link");
	
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("type", "text/css");
		link.setAttribute("href", path);
	
		document.head.appendChild(link);
	},
	
	loadScript: function(path) {
	
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", path, false);
	
		var allText = "";
	
		rawFile.onreadystatechange = function() {
	
			if(rawFile.readyState === 4) {
	
				if(rawFile.status === 200 || rawFile.status == 0) {
					allText = rawFile.responseText;
				}
			}
		}
	
		rawFile.send(null);
		
		let script = document.createElement("script");
		script.text = allText;
		
		document.head.appendChild(script).parentNode.removeChild(script);
	},
	
	create: function(tag, className, id) {
	
		let element = document.createElement(tag);
	
		if(className != null)
			element.className = className;
	
		if(id != null)
			element.id = id;
	
		for(let i = 0; i < ui.styles.length; i++)
			ui.styles[i](element);
	
		return element;
	},
	
	fill: function(element, content) {
	
		element.innerHTML = content;
	
		return element;
	},
	
	extend: function(element, child) {
	
		child = Array.isArray(child) ? child : [child];
	
		for(let i = 0; i < child.length; i++)
			element.appendChild(child[i]);
	
		return element;
	},
	
	specify: function(element, attribute, extend) {
	
		if(Array.isArray(attribute[0])) {
	
			for(let i = 0; i < attribute.length; i++) {
			
				element.setAttribute(
					attribute[i][0],
					extend ?
						element.getAttribute(attribute[i][0]) + attribute[i][1] :
						attribute[i][1]);
			}
		}
	
		else {
		
			element.setAttribute(
				attribute[0],
				extend ?
					element.getAttribute(attribute[0]) + attribute[1] :
					attribute[1]);
		}
	
		return element;
	},
	
	setStyle: function(element, styles) {
	
		if(!Array.isArray(styles)) {
		
			styles = arguments;
			
			if(styles.length > 0) {
			
				styles.splice(0, 1);
				
				if(styles.length == 2)
					styles = [styles];
			}
		}
		
		for(let i = 0; i < styles.length; i++) {
		
			if(!Array.isArray(styles[i]))
				styles[i] = [styles[i]];
		}
	
		for(let i = 0; i < styles.length; i++) {
		
			let style = styles[i][0];
			let value = styles[i][1];
		
			let result =
				element.style.cssText.match(
					new RegExp(
						"(?:[;\\s]|^)(" +
						style.replace("-", "\\-") +
						"\\s*:(.*?)(;|$))"
					)
				),
				index;
			
			if (result) {
			
				index = result.index + result[0].indexOf(result[1]);
				
				element.style.cssText =
					element.style.cssText.substring(0, index) +
					style + ": " + value + ";" +
					element.style.cssText.substring(index + result[1].length);
			}
			
			else
				element.style.cssText += " " + style + ": " + value + ";";
		}
			
		return element;
	},
	
	get: function(id, className, tag) {
	
		if(id != null)
			return document.getElementById(id);
		
		if(className != null)
			return document.getElementsByClassName(className);
		
		if(tag != null)
			return document.getElementsByTagName(tag);
	},
	
	isVisible: function(element) {
		return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
	},
	
	interpolate: function(value, target, increment) {
		
		if(value == target)
			return value;
	
		if(value < target) {
	
			value += increment;
			
			if(value > target)
				value = target;
		}
		
		else if(value > target) {
			
			value -= increment;
			
			if(value < target)
				value = target;
		}
	
		return value;
	}
};

var urlArgs = {};

window.location.href.replace(
	/[?&]+([^=&]+)=([^&]*)/gi,
	function(match, key, value) {
		urlArgs[key.toLowerCase()] = decodeURIComponent(value.toLowerCase());
	}
);

require = function(path, reload) {

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
		
			if(localIndex == -1 || reload) {

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

		let rawFile = new XMLHttpRequest();

		rawFile.open("GET", 'https://stormy-beach-14823.herokuapp.com/' + path, false);
	
		rawFile.setRequestHeader("Origin", "https://www.abc_" + Math.random() + ".com");

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

require.onePlus = onePlus;
require.cors = cors_api_path;

if(window.localStorage.getItem("kaeonOriginConsole") == null)
	window.localStorage.setItem("kaeonOriginConsole", "true");

var openFullscreen = function(element) {

	if(element.requestFullscreen)
		element.requestFullscreen();
	
	else if(element.mozRequestFullScreen)
		element.mozRequestFullScreen();
	
	else if(element.webkitRequestFullscreen)
		element.webkitRequestFullscreen();
	
	else if(element.msRequestFullscreen)
		element.msRequestFullscreen();
}

var closeFullscreen = function() {

	if(document.exitFullscreen)
		document.exitFullscreen();
	
	else if(document.mozCancelFullScreen)
		document.mozCancelFullScreen();
	
	else if(document.webkitExitFullscreen)
		document.webkitExitFullscreen();
	
	else if(document.msExitFullscreen)
		document.msExitFullscreen();
}

if(urlArgs.kaeonoriginjs != null || urlArgs.kaeonoriginfusion != null || urlArgs.kaeonoriginhtml != null) {

	ui.setStyle(
		document.documentElement,
		[
			["position", "absolute"],
			["left", "0%"],
			["top", "0%"],
			["width", "100%"],
			["height", "100%"]
		]
	);

	let code = "";

	let id =
		urlArgs.kaeonoriginjs != null ?
			Number(urlArgs.kaeonoriginjs) :
			(urlArgs.kaeonoriginfusion != null ?
				Number(urlArgs.kaeonoriginfusion) :
				Number(urlArgs.kaeonoriginhtml));
	
	let data = window.localStorage.getItem("kaeonOriginData");

	try {
		code = onePlus.readONEPlus(data).children[id].content;
	}

	catch(error) {

	}

	let isJS = urlArgs.kaeonoriginjs != null;
	let isFUSION = urlArgs.kaeonoriginfusion != null;
	let isHTML = urlArgs.kaeonoriginhtml != null;

	if(isHTML) {

		document.documentElement.innerHTML = code;
	
		if(document.body != null)
			document.body.style.position = "absolute";
	}

	var outputField = ui.setStyle(
		ui.create("textarea"),
		[
			["white-space", "pre"],
			["position", "fixed"],
			["left", "0%"],
			["top", "70%"],
			["width", "100%"],
			["height", "30%"],
			["resize", "none"],
			["z-index", "2147483647"],
			["background", "white"],
			["border-top", "solid black"]
		]
	);

	outputField.readOnly = true;

	setInterval(
		function() {
			
			outputField.style.display =
				window.localStorage.getItem("kaeonOriginConsole") == "true" ?
					"block" :
					"none";
		},
		100
	);

	ui.extend(document.documentElement, outputField);

	if(isJS || isHTML) {

		console.log = function() {

			for(let i = 0; i < arguments.length; i++)
				outputField.value += "" + arguments[i] + " ";

			outputField.value += "\n";
		}
	}

	else {

		console.log = function() {

			for(let i = 0; i < arguments.length; i++)
				outputField.value += "" + arguments[i];
		}
	}

	standardLink = null;

	oneLink = null;
	fusionLink = null;
	kaeonFUSIONLink = null;
	stoneLink = null;
	onePlusLink = null;
	ioLink = null;
	httpLink = null;
	uiLink = null;

	fusionRoot = null;
	jsRoot = null;
	htmlRoot = null;

	io = null;
	ui = null;

	if(isJS || isHTML) {
		one = null;
		kaeonFUSION = null;
		onePlus = null;
	}

	urlArgs = null;

	if(isJS) {

		try {

			eval(
				"(async () => {\n" +
				oneSuite.preprocess(code) +
				"\n})();"
			);
		}

		catch(error) {
			console.log(error.stack);
		}
	}

	else if(isFUSION) {

		try {
			oneSuite.process(code);
		}

		catch(error) {
			console.log(error.stack);
		}
	}

	else {
	
		let scripts = document.querySelectorAll("script");
	
		for(let i = 0; i < scripts.length; i++) {
	
			if(scripts[i].getAttribute("src") != null)
				(1, eval)(makeOnlineRequest(scripts[i].getAttribute("src")));
	
			(1, eval)(scripts[i].text);
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

	var outTabs = [];

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

		tab.button = button;

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

	var options = ui.fill(ui.create("button"), "Options");

	ui.setStyle(
		options,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "15vw"],
			["top", "0vh"],
			["left", "85vw"]
		]
	);

	var optionsDiv = ui.create("div");

	options.onclick = function() {

		for(let i = 0; i < outTabs.length; i++)
			outTabs[i].frame.style.display = "none";

		try {
			display.removeChild(optionsDiv);
		}

		catch(error) {

		}

		try {
			display.removeChild(oneText);
		}

		catch(error) {

		}

		optionsDiv.innerHTML = "";

		ui.extend(display, optionsDiv);

		ui.extend(optionsDiv, ui.fill(ui.create("center"), "<h1>Settings</h1>"));
		
		var toggle = ui.fill(
			ui.create("button"),
			window.localStorage.getItem("kaeonOriginConsole") == "true" ?
				"Hide Console" :
				"Show Console"
		);

		toggle.onclick = function() {

			if(window.localStorage.getItem("kaeonOriginConsole") == "true") {

				window.localStorage.setItem("kaeonOriginConsole", "false");

				toggle.innerHTML = "Show Console";
			}

			else {

				window.localStorage.setItem("kaeonOriginConsole", "true");

				toggle.innerHTML = "Hide Console";
			}
		}

		ui.extend(optionsDiv, toggle);
		ui.extend(optionsDiv, ui.create("br"));

		ui.extend(optionsDiv, ui.fill(ui.create("center"), "<h1>Resources</h1>"));

		ui.extend(optionsDiv, ui.fill(ui.create("h2"), "Kaeon FUSION Resources"));

		ui.extend(
			optionsDiv,
			ui.fill(
				ui.create("p"),
				"Standard Interface: <a href=\"" +
				standardLink +
				"\" target=\"_blank\">" +
				standardLink +
				"</a>"));
		
		ui.extend(optionsDiv, ui.fill(ui.create("h2"), "JavaScript Resources"));

		ui.extend(
			optionsDiv,
			ui.fill(
				ui.create("p"),
				"ONE Module: <a href=\"" +
				oneLink +
				"\" target=\"_blank\">" +
				oneLink +
				"</a>"));

		ui.extend(
			optionsDiv,
			ui.fill(
				ui.create("p"),
				"FUSION Module: <a href=\"" +
				fusionLink +
				"\" target=\"_blank\">" +
				fusionLink +
				"</a>"));

		ui.extend(
			optionsDiv,
			ui.fill(
				ui.create("p"),
				"Kaeon FUSION Module: <a href=\"" +
				kaeonFUSIONLink +
				"\" target=\"_blank\">" +
				kaeonFUSIONLink +
				"</a>"));

		ui.extend(
			optionsDiv,
			ui.fill(
				ui.create("p"),
				"Philosopher\'s Stone Module: <a href=\"" +
				stoneLink +
				"\" target=\"_blank\">" +
				stoneLink +
				"</a>"));

		ui.extend(
			optionsDiv,
			ui.fill(
				ui.create("p"),
				"ONE+ Module: <a href=\"" +
				onePlusLink +
				"\" target=\"_blank\">" +
				onePlusLink +
				"</a>"));

		ui.extend(
			optionsDiv,
			ui.fill(
				ui.create("p"),
				"Universal Preprocessor Module: <a href=\"" +
				universalPreprocessorLink +
				"\" target=\"_blank\">" +
				universalPreprocessorLink +
				"</a>"));

		ui.extend(
			optionsDiv,
			ui.fill(
				ui.create("p"),
				"ONE Suite Module: <a href=\"" +
				oneSuiteLink +
				"\" target=\"_blank\">" +
				oneSuiteLink +
				"</a>"));

		ui.extend(
			optionsDiv,
			ui.fill(
				ui.create("p"),
				"IO Module: <a href=\"" +
				ioLink +
				"\" target=\"_blank\">" +
				ioLink +
				"</a>"));

		ui.extend(
			optionsDiv,
			ui.fill(
				ui.create("p"),
				"HTTP Module: <a href=\"" +
				httpLink +
				"\" target=\"_blank\">" +
				httpLink +
				"</a>"));

		ui.extend(
			optionsDiv,
			ui.fill(
				ui.create("p"),
				"UI Module: <a href=\"" +
				uiLink +
				"\" target=\"_blank\">" +
				uiLink +
				"</a>"));

		ui.extend(optionsDiv, ui.fill(ui.create("h2"), "GhostHost Roots"));

		ui.extend(
			optionsDiv,
			ui.fill(
				ui.create("p"),
				"Kaeon FUSION GhostHost Root: <a href=\"" +
				fusionRoot +
				"\" target=\"_blank\">" +
				fusionRoot +
				"</a>"));

		ui.extend(
			optionsDiv,
			ui.fill(
				ui.create("p"),
				"JavaScript GhostHost Root: <a href=\"" +
				jsRoot +
				"\" target=\"_blank\">" +
				jsRoot +
				"</a>"));

		ui.extend(
			optionsDiv,
			ui.fill(
				ui.create("p"),
				"HTML GhostHost Root: <a href=\"" +
				htmlRoot +
				"\" target=\"_blank\">" +
				htmlRoot +
				"</a>"));

		ui.extend(display, optionsDiv);
	};

	ui.extend(ui.root, options);

	var openAll = ui.fill(ui.create("button"), "Open All");

	ui.setStyle(
		openAll,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "7.5vw"],
			["top", "0vh"],
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

				text = io.open(url);
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
			["top", "0vh"],
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
			["top", "5vh"],
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

				text = io.open(url);
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
			["top", "5vh"],
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
			["top", "90vh"],
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
			["height", "80vh"],
			["width", "15vw"],
			["top", "10vh"],
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
			["top", "0vh"],
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
			["top", "0vh"],
			["left", "32.5vw"] // ["left", "23.75vw"]
		]
	);

	printButton.onclick = function() {

		var mywindow = window.open('', 'PRINT', 'height=400,width=600');

		mywindow.document.write(
			"<pre>" +
			text.value.
			split("<").join("&lt;").
			split(">").join("&gt;").
			split("&").join("&amp;") +
			"</pre>"
		);

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
			["height", "85vh"],
			["width", "35vw"],
			["top", "5vh"],
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
			["height", (10 / 3) + "vh"],
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

	show.onclick = function() {
		showONE(false);
	};

	ui.extend(document.documentElement, show);

	var runJS = ui.create("button");

	ui.setStyle(
		runJS,
		[
			["position", "absolute"],
			["height", (10 / 3) + "vh"],
			["width", "17.5vw"],
			["top", (90 + (10 / 3)) + "vh"],
			["left", "15vw"]
		]
	);

	runJS.innerHTML = "Run JavaScript";
	runJS.onclick = onRunJS;

	ui.extend(document.documentElement, runJS);

	var runHTML = ui.create("button");

	ui.setStyle(
		runHTML,
		[
			["position", "absolute"],
			["height", (10 / 3) + "vh"],
			["width", "17.5vw"],
			["top", (90 + (2 * (10 / 3))) + "vh"],
			["left", "15vw"]
		]
	);

	runHTML.innerHTML = "Render HTML";
	runHTML.onclick = onRunHTML;

	ui.extend(document.documentElement, runHTML);

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

	var preprocess = ui.create("button");

	ui.setStyle(
		preprocess,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "17.5vw"],
			["top", "95vh"],
			["left", "32.5vw"]
		]
	);

	preprocess.innerHTML = "Preprocess";

	preprocess.onclick = function() {
		showONE(true);
	};

	ui.extend(document.documentElement, preprocess);

	var fullscreen = ui.fill(ui.create("button"), "Fullscreen");

	ui.setStyle(
		fullscreen,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "35vw"],
			["top", "0vh"],
			["left", "50vw"]
		]
	);

	fullscreen.onclick = function() {

		openFullscreen(display);

		display.onkeypress = function(event) {

			if(event.keyCode != 27)
				return;

			closeFullscreen();

			display.onkeypress = null;
		}
	};

	ui.extend(ui.root, fullscreen);

	var display = ui.create("div");

	ui.setStyle(
		display,
		[
			["overflow", "auto"],
			["background", "white"],
			["white-space", "pre"],
			["position", "absolute"],
			["height", "95vh"],
			["width", "35vw"],
			["top", "5vh"],
			["left", "50vw"]
		]
	);

	ui.extend(document.documentElement, display);

	var outs = ui.create("div");

	ui.setStyle(
		outs,
		[
			["overflow", "auto"],
			["background", "white"],
			["border-left", "1px solid black"],
			["white-space", "pre"],
			["position", "absolute"],
			["height", "85vh"],
			["width", "15vw"],
			["top", "5vh"],
			["left", "85vw"]
		]
	);

	ui.extend(document.documentElement, outs);

	var removeOut = ui.fill(ui.create("button"), "Remove");

	ui.setStyle(
		removeOut,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "15vw"],
			["top", "90vh"],
			["left", "85vw"]
		]
	);

	removeOut.onclick = function() {

		let current = false;

		for(let i = 0; i < outTabs.length; i++) {

			if(outTabs[i].childNodes[0].checked) {

				if(outTabs[i].button.style.background == "green")
					current = true;

				outs.removeChild(outTabs[i]);
				display.removeChild(outTabs[i].frame);

				outTabs.splice(i, 1);
				i--;
			}
		}

		if(current) {

			if(outTabs.length > 0) {
				outTabs[0].button.style.background = "green";
				outTabs[0].frame.style.display = "block";
			}
		}
	};

	ui.extend(ui.root, removeOut);

	var allOut = ui.fill(ui.create("button"), "All");

	ui.setStyle(
		allOut,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "7.5vw"],
			["top", "95vh"],
			["left", "85vw"]
		]
	);

	allOut.onclick = function() {

		for(let i = 0; i < outTabs.length; i++)
			outTabs[i].childNodes[0].checked = true;
	};

	ui.extend(ui.root, allOut);

	var noneOut = ui.fill(ui.create("button"), "None");

	ui.setStyle(
		noneOut,
		[
			["position", "absolute"],
			["height", "5vh"],
			["width", "7.5vw"],
			["top", "95vh"],
			["left", "92.5vw"]
		]
	);

	noneOut.onclick = function() {

		for(let i = 0; i < outTabs.length; i++)
			outTabs[i].childNodes[0].checked = false;
	};

	ui.extend(ui.root, noneOut);

	let buttons = document.querySelectorAll("button");

	buttons.forEach(

		function(button) {
			
			ui.setStyle(
				button,
				[
					["", ""]
				]
			);
		}
	);

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

	function onRun(type) {

		if(onRun.count == null)
			onRun.count = 0;

		onRun.count++;

		ui.setStyle(
			display,
			[
				["overflow", "auto"]
			]
		);

		let frame = ui.setStyle(
			ui.specify(
				ui.create("iframe"),
				[
					[
						"src",
						originLink +
							"&kaeonorigin" +
							type +
							"=" +
							currentTab
					],
					["frameborder", "0"]
				]
			),
			[
				["width", "100%"],
				["height", "100%"],
				["left", "0%"],
				["top", "0%"],
				["position", "absolute"],
				["overflow", "auto"]
			]
		);

		try {
			display.removeChild(optionsDiv);
		}

		catch(error) {
			
		}

		try {
			display.removeChild(oneText);
		}

		catch(error) {

		}

		ui.extend(display, frame);

		var outItem = ui.create("div");

		outItem.frame = frame;

		let check = ui.create("input");
		check.type = "checkbox";

		let button =
			ui.fill(
				ui.create("button"),
				tabs[currentTab].button.innerHTML + ": " + onRun.count
			);

		outItem.button = button;
		
		button.onclick = function() {

			try {
				display.removeChild(optionsDiv);
			}
	
			catch(error) {
				
			}

			try {
				display.removeChild(oneText);
			}
	
			catch(error) {
	
			}

			for(let i = 0; i < outTabs.length; i++) {
				outTabs[i].button.style.background = "white";
				outTabs[i].frame.style.display = "none";
			}
	
			outItem.button.style.background = "green";
			outItem.frame.style.display = "block";
		};

		ui.extend(outItem, check);
		ui.extend(outItem, button);

		ui.extend(outs, outItem);

		outTabs.push(outItem);

		for(let i = 0; i < outTabs.length; i++) {
			outTabs[i].button.style.background = "white";
			outTabs[i].frame.style.display = "none";
		}

		outItem.button.style.background = "green";
		outItem.frame.style.display = "block";
	}

	function onRunFUSION() {
		onRun("fusion");
	}

	function onRunJS() {
		onRun("js");
	}

	function onRunHTML() {
		onRun("html");
	}

	oneText = ui.setStyle(
		ui.specify(
			ui.create("textarea"),
			[
				["spellcheck", "false"]
			]
		),
		[
			["resize", "none"],
			["overflow", "auto"],
			["left", "0vw"],
			["top", "0vh"],
			["width", "100%"],
			["height", "100%"],
			["white-space", "pre"]
		]
	);

	oneText.readOnly = true;

	function showONE(preprocess) {

		ui.setStyle(
			display,
			[
				["overflow", "hidden"]
			]
		);

		try {
			display.removeChild(optionsDiv);
		}

		catch(error) {

		}

		try {
			display.removeChild(oneText);
		}

		catch(error) {

		}

		for(let i = 0; i < outTabs.length; i++)
			outTabs[i].frame.style.display = "none";

		ui.extend(display, oneText);

		try {

			if(!preprocess)
				oneText.value = oneSuite.write(oneSuite.parse(text.value));

			else
				oneText.value = oneSuite.preprocess(text.value);
		}

		catch(error) {
			oneText.value = "ERROR: INVALID ONE+";
		}
	}

	load();
	setTab(0);

	tempInterval(saveData, 1000);
}