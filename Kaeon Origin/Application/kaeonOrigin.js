var one = require("https://raw.githubusercontent.com/Library-of-Kaeon/Library-of-Kaeon/master/Library%20of%20Kaeon/3%20-%20Collection/1%20-%20Computation/1%20-%20APIs/1%20-%20ONE/1%20-%20ONE/1%20-%20JavaScript/1%20-%20Source/ONE.js");
var kaeonFUSION = require("https://raw.githubusercontent.com/Library-of-Kaeon/Library-of-Kaeon/master/Library%20of%20Kaeon/3%20-%20Collection/1%20-%20Computation/1%20-%20APIs/5%20-%20Kaeon%20United/1%20-%20Source/4%20-%20Shadow%20Host%20Bootstrap/KaeonFUSION.js");
var onePlus = require("https://raw.githubusercontent.com/Library-of-Kaeon/Library-of-Kaeon/master/Library%20of%20Kaeon/3%20-%20Collection/1%20-%20Computation/1%20-%20APIs/5%20-%20Kaeon%20United/1%20-%20Source/4%20-%20Shadow%20Host%20Bootstrap/ONEPlus.js");

var ui = require("https://raw.githubusercontent.com/Library-of-Kaeon/Library-of-Kaeon/master/Library%20of%20Kaeon/3%20-%20Collection/1%20-%20Computation/1%20-%20APIs/4%20-%20Utilities/10%20-%20UI/1%20-%20JavaScript/1%20-%20Source/ui.js");

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