var moduleDependencies = {
	bootstrap: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
	cors: "https://stormy-beach-14823.herokuapp.com/",
	io: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Utilities/Data/io.js",
	one: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/Source/Engine/ONE.js",
	onePlus: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/Source/Engine/ONEPlus.js",
	override: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Utilities/Application/Management/override.js",
	oneSuite: "https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/Source/Engine/ONESuite.js",
	ui: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Utilities/UI/Visual/General/ui.js",
	widgets: "https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/Utilities/UI/Visual/Widgets/widgets.js"
};

var io = require(moduleDependencies.io);
var one = require(moduleDependencies.one);
var onePlus = require(moduleDependencies.onePlus);
var override = require(moduleDependencies.override);
var oneSuite = require(moduleDependencies.oneSuite);
var ui = require(moduleDependencies.ui);
var widgets = require(moduleDependencies.widgets);

let urlArgs = {};
let rawUrlArgs = {};

window.location.href.replace(
	/[?&]+([^=&]+)=([^&]*)/gi,
	function(match, key, value) {
		urlArgs[key.toLowerCase()] = decodeURIComponent(value.toLowerCase());
		rawUrlArgs[key.toLowerCase()] = decodeURIComponent(value);
	}
);

if(window.localStorage.getItem("kaeonOriginConsole") == null)
	window.localStorage.setItem("kaeonOriginConsole", "true");

if(urlArgs.kaeonoriginjs != null ||
	urlArgs.kaeonoriginfusion != null ||
	urlArgs.kaeonoriginhtml != null) {

	ui.set(
		document.documentElement,
		{
			style: {
				position: "absolute",
				left: "0%",
				top: "0%",
				width: "100%",
				height: "100%"
			}
		}
	);

	let code = "";
	
	var data = onePlus.readONEPlus(
		rawUrlArgs.workspace != null ?
			io.open(rawUrlArgs.workspace) :
			window.localStorage.getItem("kaeonOriginData"));
		
	let id =
		urlArgs.kaeonoriginjs != null ?
			urlArgs.kaeonoriginjs :
			(urlArgs.kaeonoriginfusion != null ?
				urlArgs.kaeonoriginfusion :
				urlArgs.kaeonoriginhtml);

	if(isNaN(id)) {

		for(let i = 0; i < data.children.length; i++) {

			let file = "file " + (i + 1);

			if(data.children[i].children.length != 0)
				file = data.children[i].children[0].content;

			if(file.toLowerCase() == id.toLowerCase()) {

				id = i;

				break;
			}
		}
	}

	else
		id = Number(id);

	try {
		code = data.children[id].content;
	}

	catch(error) {

	}

	let isJS = urlArgs.kaeonoriginjs != null;
	let isFUSION = urlArgs.kaeonoriginfusion != null;
	let isHTML = urlArgs.kaeonoriginhtml != null;

	override.onSend((request) => {

		let uri = request.request.uri;

		if(uri.includes(moduleDependencies.cors))
			uri = uri.substring(moduleDependencies.cors.length);

		if(uri.startsWith("http") && uri.includes("://"))
			return null;

		for(let i = 0; i < data.children.length; i++) {

			let file = "file " + (i + 1);

			if(data.children[i].children.length != 0)
				file = data.children[i].children[0].content;

			if(file.toLowerCase() == uri.toLowerCase())
				return data.children[i].content;
		}

		return "";
	});

	if(isHTML) {

		document.documentElement.innerHTML = code;
	
		if(document.body != null)
			document.body.style.position = "absolute";
	}

	var outputField = ui.create({
		tag: "textarea",
		style: {
			position: "fixed",
			left: "0%",
			top: "70%",
			width: "100%",
			height: "30%",
			"z-index": "2147483647",
			background: "white",
			"border-top": "solid black",
			resize: "none",
			"white-space": "pre",
			"font-family": "monospace"
		},
		fields: {
			readOnly: true
		}
	});

	setInterval(
		function() {

			if(!document.documentElement.contains(outputField))
				ui.extend(outputField);
			
			outputField.style.display =
				window.localStorage.getItem("kaeonOriginConsole") == "true" &&
					rawUrlArgs.workspace == null ?
					"block" :
					"none";
		},
		1000 / 60
	);

	ui.extend(outputField);

	console.log = function() {

		for(let i = 0; i < arguments.length; i++) {

			outputField.value +=
				(typeof arguments[i] == "object" ?
					JSON.stringify(arguments[i], null, "\t") :
					arguments[i]) +
				((isJS || isHTML) ? " " : "");
		}

		if(isJS || isHTML)
			outputField.value += "\n";

		if(outputField.value.length > 1000000) {

			outputField.value = outputField.value.substring(
				outputField.value.length - 1000000,
				outputField.value.length
			);
		}

		outputField.scrollTop = outputField.scrollHeight;
	}

	if(isJS) {

		try {

			eval(
				"(async () => {try{\n" +
				oneSuite.preprocess(code) +
				"\n}catch(error){console.log(error.stack);}})();"
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

	return;
}

var currentTab = 0;

let inputPanel = ui.create();

var oneText = ui.create({
	tag: "textarea",
	attributes: { spellcheck: "false" },
	style: {
		left: "0%",
		top: "0%",
		width: "100%",
		height: "100%",
		overflow: "auto",
		resize: "none",
		"white-space": "pre",
		"font-family": "monospace"
	},
	fields: { readOnly: true }
});

var outTabs = [];

let outputPanel = ui.create();

var tabs = [];

function addTab(tab) {

	if(tab == null)
		tab = createTab();

	tab.line = ui.create({ tag: "br" });

	tabs.push(tab);

	ui.extend(ui.get("#files")[0], [tab, tab.line]);

	saveData();
}

function createTab(data, index, name) {

	if(index == null)
		index = tabs.length;

	let check = ui.create({ tag: "input", fields: { type: "checkbox" } });

	let button = ui.create({
		tag: "button",
		content: name == null ? ("File " + (index + 1)) : name,
		fields: {
			index: index,
			onclick: () => {
				setTab(button.index);
			}
		}
	});

	let nameButton = ui.create({
		tag: "button",
		content: "Set Name",
		fields: {
			index: index,
			onclick: () => {

				let newName = prompt("Enter this file's name:");
	
				if(newName == null)
					return;
	
				tabs[nameButton.index].childNodes[1].innerHTML = newName;
				tabs[nameButton.index].named = true;

				saveData();
			}
		}
	});

	let tab =  ui.create({
		fields: {
			named: name != null,
			button: button,
			data: data != null ? data : ""
		}
	});

	ui.extend(tab, [check, button, nameButton]);

	return tab;
}

function load() {

	tabs = [];

	ui.get("#files")[0].innerHTML = "";

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

	ui.get("#text")[0].value = data.children[0].content;

	setTab(0);
}

function manageScreen() {

	manageScreen.mode = manageScreen.mode != null ? manageScreen.mode : "";

	setInterval(() => {

		let mode = screen.height <= screen.width ? "horizontal" : "vertical";

		if(manageScreen.mode != mode) {

			manageScreen.mode = mode;

			ui.set(
				inputPanel,
				{
					style: {
						position: "absolute",
						left: "0%",
						top: "0%",
						width: mode == "horizontal" ? "50%" : "100%",
						height: mode == "horizontal" ? "100%" : "50%"
					}
				}
			);

			ui.set(
				outputPanel,
				{
					style: {
						position: "absolute",
						left: mode == "horizontal" ? "50%" : "0%",
						top: mode == "horizontal" ? "0%" : "50%",
						width: mode == "horizontal" ? "50%" : "100%",
						height: mode == "horizontal" ? "100%" : "50%"
					}
				}
			);
		}
	}, 1000 / 60);
}

function onRun(type) {

	if(onRun.count == null)
		onRun.count = 0;

	onRun.count++;

	ui.set(ui.get("#display")[0], { style: { overflow: "auto" } });

	let frame = ui.create({
		tag: "iframe",
		attributes: {
			"src": window.location.href +
				"&kaeonorigin" +
				type +
				"=" +
				currentTab,
			"frameborder": "0"
		},
		style: {
			width: "100%",
			height: "100%",
			left: "0%",
			top: "0%",
			position: "absolute",
			overflow: "auto"
		}
	});

	try {
		ui.get("#display")[0].removeChild(oneText);
	}

	catch(error) {

	}

	ui.extend(ui.get("#display")[0], frame);

	var outItem = ui.create();

	outItem.frame = frame;

	let check = ui.create({ tag: "input" });
	check.type = "checkbox";

	let button = ui.create({
		tag: "button",
		content: tabs[currentTab].button.innerHTML + ": " + onRun.count
	});

	outItem.button = button;
	
	button.onclick = function() {

		try {
			ui.get("#display")[0].removeChild(oneText);
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

	ui.extend(ui.get("#output-tabs")[0], outItem);

	outTabs.push(outItem);

	for(let i = 0; i < outTabs.length; i++) {
		outTabs[i].button.style.background = "white";
		outTabs[i].frame.style.display = "none";
	}

	outItem.button.style.background = "green";
	outItem.frame.style.display = "block";
}

function openFullscreen(element) {

	if(element.requestFullscreen)
		element.requestFullscreen();
	
	else if(element.mozRequestFullScreen)
		element.mozRequestFullScreen();
	
	else if(element.webkitRequestFullscreen)
		element.webkitRequestFullscreen();
	
	else if(element.msRequestFullscreen)
		element.msRequestFullscreen();
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
					item, one.createElement(tabs[i].childNodes[1].innerHTML)
				);
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
	ui.get("#text")[0].value = tabs[index].data;
}

function showText(mode) {

	ui.set(ui.get("#display")[0], { style: { overflow: "hidden" } });

	for(let i = 0; i < outTabs.length; i++)
		outTabs[i].frame.style.display = "none";

	ui.extend(ui.get("#display")[0], oneText);

	try {

		if(mode == "one") {

			oneText.value = oneSuite.write(
				oneSuite.parse(ui.get("#text")[0].value)
			);
		}

		else if(mode == "preprocess")
			oneText.value = oneSuite.preprocess(ui.get("#text")[0].value);

		else
			oneText.value = window.localStorage.getItem("kaeonOriginData");
	}

	catch(error) {
		oneText.value = "ERROR: INVALID ONE+";
	}
}

document.title = "Kaeon Origin";

ui.load(moduleDependencies.bootstrap);

ui.set(
	document.documentElement,
	{
		style: {
			margin: "0",
			height: "100%",
			overflow: "hidden",
			"font-size": "13px"
		}
	}
);

ui.extend(document.documentElement, [inputPanel, outputPanel]);

ui.extend(inputPanel, [
	{
		tag: "button",
		content: "Open All",
		style: {
			position: "absolute",
			height: "5%",
			width: "15%",
			top: "0%",
			left: "0%"
		},
		fields: {
			onclick: () => {
		
				if(!confirm(
					"This will delete the contents of the existing workspace."
					+ "\nAre you okay with this?")) {
		
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
		
							window.localStorage.setItem(
								"kaeonOriginData",
								text
							);
		
							load();
						}
					);
				}
			}
		}
	},
	{
		tag: "button",
		content: "Save All",
		style: {
			position: "absolute",
			height: "5%",
			width: "15%",
			top: "0%",
			left: "15%"
		},
		fields: {
			onclick: () => {

				io.save(
					window.localStorage.getItem("kaeonOriginData"),
					"Kaeon Origin Workspace.op"
				);
			}
		}
	},
	{
		tag: "button",
		content: "Open",
		style: {
			position: "absolute",
			height: "5%",
			width: "15%",
			top: "5%",
			left: "0%"
		},
		fields: {
			onclick: () => {

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
			}
		}
	},
	{
		tag: "button",
		content: "New",
		style: {
			position: "absolute",
			height: "5%",
			width: "15%",
			top: "5%",
			left: "15%"
		},
		fields: {
			onclick: () => {

				addTab();
				setTab(currentTab);
		
				saveData();
			}
		}
	},
	{
		tag: "button",
		content: "Remove",
		style: {
			position: "absolute",
			height: "5%",
			width: "30%",
			top: "90%",
			left: "0%"
		},
		fields: {
			onclick: () => {

				let temp = tabs[currentTab];
				let current = false;
		
				for(let i = 0; i < tabs.length && !current; i++) {
		
					if(tabs[i].childNodes[0].checked && i == currentTab)
						current = true;
				}
		
				currentTab = -1;
		
				for(let i = 0; i < tabs.length; i++) {
		
					if(tabs[i].childNodes[0].checked) {
		
						ui.get("#files")[0].removeChild(tabs[i]);
						ui.get("#files")[0].removeChild(tabs[i].line);
		
						tabs.splice(i, 1);
		
						i--;
					}
				}
		
				for(let i = 0; i < tabs.length; i++) {
		
					let button = tabs[i].childNodes[1];
		
					if(!tabs[i].named)
						ui.set(button, { content: "File " + (i + 1) });
		
					button.index = i;
		
					if(tabs[i] === temp)
						setTab(i);
				}
		
				if(tabs.length == 0)
					addTab();
		
				if(current)
					setTab(0);
		
				saveData();
			}
		}
	},
	{
		attributes: { id: "files" },
		style: {
			position: "absolute",
			height: "80%",
			width: "30%",
			top: "10%",
			left: "0%",
			overflow: "auto",
			"white-space": "pre"
		}
	},
	{
		tag: "button",
		content: "All",
		style: {
			position: "absolute",
			height: "5%",
			width: "15%",
			top: "95%",
			left: "0%"
		},
		fields: {
			onclick: () => {

				for(let i = 0; i < tabs.length; i++)
					tabs[i].childNodes[0].checked = true;
			}
		}
	},
	{
		tag: "button",
		content: "None",
		style: {
			position: "absolute",
			height: "5%",
			width: "15%",
			top: "95%",
			left: "15%"
		},
		fields: {
			onclick: () => {

				for(let i = 0; i < tabs.length; i++)
					tabs[i].childNodes[0].checked = false;
			}
		}
	},
	{
		tag: "button",
		content: "Save",
		style: {
			position: "absolute",
			height: "5%",
			width: "35%",
			top: "0%",
			left: "30%"
		},
		fields: {
			onclick: () => {

				io.save(
					ui.get("#text")[0].value,
					tabs[currentTab].named ?
						tabs[currentTab].childNodes[1].innerHTML :
						"File " + (currentTab + 1) + ".txt"
				);
			}
		}
	},
	{
		tag: "button",
		content: "Print",
		style: {
			position: "absolute",
			height: "5%",
			width: "35%",
			top: "0%",
			left: "65%"
		},
		fields: {
			onclick: () => {

				var mywindow = window.open(
					'',
					'PRINT',
					'height=400,width=600'
				);
		
				mywindow.document.write(
					"<pre>" +
					ui.get("#text")[0].value.
					split("<").join("&lt;").
					split(">").join("&gt;").
					split("&").join("&amp;") +
					"</pre>"
				);
		
				mywindow.document.close();

				mywindow.focus();
		
				mywindow.print();
				mywindow.close();
			}
		}
	},
	{
		tag: "button",
		content: "Run Kaeon FUSION",
		style: {
			position: "absolute",
			height: "5%",
			width: (70 / 3) + "%",
			top: "90%",
			left: "30%"
		},
		fields: { onclick: () => { onRun("fusion"); } }
	},
	{
		tag: "button",
		content: "Run JavaScript",
		style: {
			position: "absolute",
			height: "5%",
			width: (70 / 3) + "%",
			top: "90%",
			left: (30 + (70 / 3)) + "%"
		},
		fields: { onclick: () => { onRun("js"); } }
	},
	{
		tag: "button",
		content: "Run HTML",
		style: {
			position: "absolute",
			height: "5%",
			width: (70 / 3) + "%",
			top: "90%",
			left: (30 + (2 * (70 / 3))) + "%"
		},
		fields: { onclick: () => { onRun("html"); } }
	},
	{
		tag: "button",
		content: "Show ONE",
		style: {
			position: "absolute",
			height: "5%",
			width: (70 / 3) + "%",
			top: "95%",
			left: "30%"
		},
		fields: { onclick: () => { showText("one"); } }
	},
	{
		tag: "button",
		content: "Show Preprocessed",
		style: {
			position: "absolute",
			height: "5%",
			width: (70 / 3) + "%",
			top: "95%",
			left: (30 + (70 / 3)) + "%"
		},
		fields: { onclick: () => { showText("preprocess"); } }
	},
	{
		tag: "button",
		content: "Show Workspace",
		style: {
			position: "absolute",
			height: "5%",
			width: (70 / 3) + "%",
			top: "95%",
			left: (30 + (2 * (70 / 3))) + "%"
		},
		fields: { onclick: () => { showText("workspace"); } }
	},
	ui.set(
		widgets.getTextbox(),
		{
			attributes: { id: "text" },
			style: {
				position: "absolute",
				height: "85%",
				width: "70%",
				top: "5%",
				left: "30%",
				overflow: "auto",
				resize: "none",
				"font-family": "monospace"
			},
			fields: {
				onchange: saveData
			}
		}
	)
]);

ui.extend(outputPanel, [
	{
		tag: "button",
		content: "Fullscreen",
		style: {
			position: "absolute",
			height: "5%",
			width: "35%",
			top: "0%",
			left: "0%"
		},
		fields: { onclick: () => { openFullscreen(ui.get("#display")[0]); } }
	},	
	{
		tag: "button",
		content: window.localStorage.getItem("kaeonOriginConsole") == "true" ?
			"Hide Console" :
			"Show Console",
		style: {
			position: "absolute",
			height: "5%",
			width: "35%",
			top: "0%",
			left: "35%"
		},
		fields: {
			onclick: (event) => {

				if(window.localStorage.getItem("kaeonOriginConsole") ==
					"true") {
		
					window.localStorage.setItem("kaeonOriginConsole", "false");
		
					event.target.innerHTML = "Show Console";
				}
		
				else {
		
					window.localStorage.setItem("kaeonOriginConsole", "true");
		
					event.target.innerHTML = "Hide Console";
				}
			}
		}
	},
	{
		attributes: { id: "display" },
		style: {
			overflow: "auto",
			background: "white",
			"white-space": "pre",
			position: "absolute",
			height: "95%",
			width: "70%",
			top: "5%",
			left: "0%"
		}
	},
	{
		attributes: { id : "output-tabs" },
		style: {
			position: "absolute",
			height: "90%",
			width: "30%",
			top: "0%",
			left: "70%",
			overflow: "auto",
			background: "white",
			"border-left": "1px solid black",
			"white-space": "pre"
		}
	},
	{
		tag: "button",
		content: "Remove",
		style: {
			position: "absolute",
			height: "5%",
			width: "30%",
			top: "90%",
			left: "70%"
		},
		fields: {
			onclick: () => {

				let current = false;
		
				for(let i = 0; i < outTabs.length; i++) {
		
					if(outTabs[i].childNodes[0].checked) {
		
						if(outTabs[i].button.style.background == "green")
							current = true;
		
						ui.get("#output-tabs")[0].removeChild(outTabs[i]);
						ui.get("#display")[0].removeChild(outTabs[i].frame);
		
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
			}
		}
	},
	{
		tag: "button",
		content: "All",
		style: {
			position: "absolute",
			height: "5%",
			width: "15%",
			top: "95%",
			left: "70%"
		},
		fields: {
			onclick: () => {

				for(let i = 0; i < outTabs.length; i++)
					outTabs[i].childNodes[0].checked = true;
			}
		}
	},
	{
		tag: "button",
		content: "None",
		style: {
			position: "absolute",
			height: "5%",
			width: "15%",
			top: "95%",
			left: "85%"
		},
		fields: {
			onclick: () => {

				for(let i = 0; i < outTabs.length; i++)
					outTabs[i].childNodes[0].checked = false;
			}
		}
	}
]);

load();
manageScreen();

setTab(0);