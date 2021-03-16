var moduleDependencies = {
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
var ui = require(moduleDependencies.ui)
var widgets = require(moduleDependencies.widgets)

var urlArgs = {};

window.location.href.replace(
	/[?&]+([^=&]+)=([^&]*)/gi,
	function(match, key, value) {
		urlArgs[key.toLowerCase()] = decodeURIComponent(value.toLowerCase());
	}
);

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

if(urlArgs.kaeonoriginjs != null || urlArgs.kaeonoriginfusion != null || urlArgs.kaeonoriginhtml != null) {

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

	override.onSend((request) => {

		let uri = request.request.uri;

		if(uri.includes(moduleDependencies.cors))
			uri = uri.substring(moduleDependencies.cors.length);

		if(uri.startsWith("http") && uri.includes("://"))
			return null;
		
		let data = onePlus.readONEPlus(
			window.localStorage.getItem("kaeonOriginData")
		).children;

		for(let i = 0; i < data.length; i++) {

			let file = "file " + (i + 1);

			if(data[i].children.length != 0)
				file = data[i].children[0].content;

			if(file.toLowerCase() == uri.toLowerCase())
				return data[i].content;
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
			"white-space": "pre",
			position: "fixed",
			left: "0%",
			top: "70%",
			width: "100%",
			height: "30%",
			resize: "none",
			"z-index": "2147483647",
			background: "white",
			"border-top": "solid black"
		}
	});

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

	ui.extend(outputField);

	console.log = function() {

		for(let i = 0; i < arguments.length; i++)
			outputField.value += "" + arguments[i] + " ";

		if(isJS || isHTML)
			outputField.value += "\n";
	}

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

	ui.set(
		document.documentElement,
		{
			style: {
				margin: "0",
				height: "100%",
				overflow: "hidden"
			}
		}
	);

	var tabs = [];
	var currentTab = 0;

	var outTabs = [];

	function createTab(data, index, name) {

		if(index == null)
			index = tabs.length;

		let tab =  ui.create();
		tab.named = name != null;

		let check = ui.create({ tag: "input" });
		check.type = "checkbox";

		let button = ui.create({
			tag: "button",
			content: name == null ? ("File " + (index + 1)) : name
		});

		button.index = index;
		
		button.onclick = function() {
			setTab(button.index);
		};

		let nameButton = ui.create({ tag: "button", content: "Set Name" });
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

		tab.line = ui.create({ tag: "br" });

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
		
	var toggle = ui.create({
		tag: "button",
		content: window.localStorage.getItem("kaeonOriginConsole") == "true" ?
			"Hide Console" :
			"Show Console",
		style: {
			position: "absolute",
			height: "5vh",
			width: "17.5vw",
			top: "0vh",
			left: "67.5vw"
		}
	});

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

	ui.extend(toggle);

	var openAll = ui.create({
		tag: "button",
		content: "Open All",
		style: {
			position: "absolute",
			height: "5vh",
			width: "7.5vw",
			top: "0vh",
			left: "0vw"
		}
	});

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

	ui.extend(openAll);

	var saveAll = ui.create({
		tag: "button",
		content: "Save All",
		style: {
			position: "absolute",
			height: "5vh",
			width: "7.5vw",
			top: "0vh",
			left: "7.5vw"
		}
	});

	saveAll.onclick = function() {

		io.save(
			window.localStorage.getItem("kaeonOriginData"),
			"Kaeon Origin Workspace.op"
		);
	};

	ui.extend(saveAll);

	var openButton = ui.create({
		tag: "button",
		content: "Open",
		style: {
			position: "absolute",
			height: "5vh",
			width: "7.5vw",
			top: "5vh",
			left: "0vw"
		}
	});

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

	ui.extend(openButton);

	var newFile = ui.create({
		tag: "button",
		content: "New",
		style: {
			position: "absolute",
			height: "5vh",
			width: "7.5vw",
			top: "5vh",
			left: "7.5vw"
		}
	});

	newFile.onclick = function() {

		addTab();
		setTab(currentTab);

		saveData();
	};

	ui.extend(newFile);

	var remove = ui.create({
		tag: "button",
		content: "Remove",
		style: {
			position: "absolute",
			height: "5vh",
			width: "15vw",
			top: "90vh",
			left: "0vw"
		}
	});

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
	};

	ui.extend(remove);

	var files = ui.create({
		style: {
			overflow: "auto",
			position: "absolute",
			height: "80vh",
			width: "15vw",
			top: "10vh",
			left: "0vw"
		}
	});

	ui.extend(files);

	var all = ui.create({
		tag: "button",
		content: "All",
		style: {
			position: "absolute",
			height: "5vh",
			width: "7.5vw",
			top: "95vh",
			left: "0vw"
		}
	});

	all.onclick = function() {

		for(let i = 0; i < tabs.length; i++)
			tabs[i].childNodes[0].checked = true;
	};

	ui.extend(all);

	var none = ui.create({
		tag: "button",
		content: "None",
		style: {
			position: "absolute",
			height: "5vh",
			width: "7.5vw",
			top: "95vh",
			left: "7.5vw"
		}
	});

	none.onclick = function() {

		for(let i = 0; i < tabs.length; i++)
			tabs[i].childNodes[0].checked = false;
	};

	ui.extend(none);

	var save = ui.create({
		tag: "button",
		content: "Save",
		style: {
			position: "absolute",
			height: "5vh",
			width: "17.5vw",
			top: "0vh",
			left: "15vw"
		}
	});

	save.onclick = function() {

		io.save(
			text.value,
			tabs[currentTab].named ?
				tabs[currentTab].childNodes[1].innerHTML :
				"File " + (currentTab + 1) + ".txt"
		);
	};

	ui.extend(save);

	var printButton = ui.create({
		tag: "button",
		content: "Print",
		style: {
			position: "absolute",
			height: "5vh",
			width: "17.5vw",
			top: "0vh",
			left: "32.5vw"
		}
	});

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

	ui.extend(printButton);

	var text = ui.set(
		widgets.getTextbox(),
		{
			style: {
				resize: "none",
				position: "absolute",
				height: "85vh",
				width: "35vw",
				top: "5vh",
				left: "15vw",
				overflow: "auto"
			}
		}
	);

	text.onchange = saveData;

	ui.extend(text);

	var run = ui.create({
		tag: "button",
		style: {
			position: "absolute",
			height: "5vh",
			width: (35 / 3) + "vw",
			top: "90vh",
			left: "15vw"
		}
	});

	run.innerHTML = "Run Kaeon FUSION";
	run.onclick = () => { onRun("fusion"); };

	ui.extend(run);

	var show = ui.create({
		tag: "button",
		style: {
			position: "absolute",
			height: "5vh",
			width: "17.5vw",
			top: "95vh",
			left: "15vw"
		}
	});

	show.innerHTML = "Show ONE";

	show.onclick = function() {
		showONE(false);
	};

	ui.extend(show);

	var runJS = ui.create({
		tag: "button",
		style: {
			position: "absolute",
			height: "5vh",
			width: (35 / 3) + "vw",
			top: "90vh",
			left: (15 + (35 / 3)) + "vw"
		}
	});

	runJS.innerHTML = "Run JavaScript";
	runJS.onclick = () => { onRun("js"); };;

	ui.extend(runJS);

	var runHTML = ui.create({
		tag: "button",
		style: {
			position: "absolute",
			height: "5vh",
			width: (35 / 3) + "vw",
			top: "90vh",
			left: (15 + (2 * (35 / 3))) + "vw"
		}
	});

	runHTML.innerHTML = "Render HTML";
	runHTML.onclick = () => { onRun("html"); };;

	ui.extend(runHTML);

	var preprocess = ui.create({
		tag: "button",
		style: {
			position: "absolute",
			height: "5vh",
			width: "17.5vw",
			top: "95vh",
			left: "32.5vw"
		}
	});

	preprocess.innerHTML = "Preprocess";

	preprocess.onclick = function() {
		showONE(true);
	};

	ui.extend(preprocess);

	var fullscreen = ui.create({
		tag: "button",
		content: "Fullscreen",
		style: {
			position: "absolute",
			height: "5vh",
			width: "17.5vw",
			top: "0vh",
			left: "50vw"
		}
	});

	fullscreen.onclick = () => { openFullscreen(display); };

	ui.extend(fullscreen);

	var display = ui.create({
		style: {
			overflow: "auto",
			background: "white",
			"white-space": "pre",
			position: "absolute",
			height: "95vh",
			width: "35vw",
			top: "5vh",
			left: "50vw"
		}
	});

	ui.extend(display);

	var outs = ui.create({
		style: {
			overflow: "auto",
			background: "white",
			"border-left": "1px solid black",
			"white-space": "pre",
			position: "absolute",
			height: "90vh",
			width: "15vw",
			top: "0vh",
			left: "85vw"
		}
	});

	ui.extend(outs);

	var removeOut = ui.create({
		tag: "button",
		content: "Remove",
		style: {
			position: "absolute",
			height: "5vh",
			width: "15vw",
			top: "90vh",
			left: "85vw"
		}
	});

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

	ui.extend(removeOut);

	var allOut = ui.create({
		tag: "button",
		content: "All",
		style: {
			position: "absolute",
			height: "5vh",
			width: "7.5vw",
			top: "95vh",
			left: "85vw"
		}
	});

	allOut.onclick = function() {

		for(let i = 0; i < outTabs.length; i++)
			outTabs[i].childNodes[0].checked = true;
	};

	ui.extend(allOut);

	var noneOut = ui.create({
		tag: "button",
		content: "None",
		style: {
			position: "absolute",
			height: "5vh",
			width: "7.5vw",
			top: "95vh",
			left: "92.5vw"
		}
	});

	noneOut.onclick = function() {

		for(let i = 0; i < outTabs.length; i++)
			outTabs[i].childNodes[0].checked = false;
	};

	ui.extend(noneOut);

	function onRun(type) {

		if(onRun.count == null)
			onRun.count = 0;

		onRun.count++;

		ui.set(display, { style: { overflow: "auto" } });

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
			display.removeChild(oneText);
		}

		catch(error) {

		}

		ui.extend(display, frame);

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

	oneText = ui.create({
		tag: "textarea",
		attributes: { spellcheck: "false" },
		style: {
			resize: "none",
			overflow: "auto",
			left: "0vw",
			top: "0vh",
			width: "100%",
			height: "100%",
			"white-space": "pre"
		}
	});

	oneText.readOnly = true;

	function showONE(preprocess) {

		ui.set(display, { style: { overflow: "hidden" } });

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
}