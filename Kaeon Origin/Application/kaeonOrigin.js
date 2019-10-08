var one = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/APIs/ONE/JavaScript/ONE.js");
var kaeonFUSION = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/KaeonFUSION.js");
var onePlus = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/ONEPlus.js");

var ui = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/UI.js");

document.title = "Kaeon Origin";

var text = ui.create("textarea");

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