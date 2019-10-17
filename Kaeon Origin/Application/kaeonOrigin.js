var one = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/Kaeon-FUSION/master/Kaeon%20FUSION/APIs/ONE/JavaScript/ONE.js");
var philosophersStone = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/Philosophers-Stone/master/Philosopher's%20Stone/API/JavaScript/PhilosophersStone.js");
var fusion = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/United%20Bootstrap/FUSION.js");
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

run.innerHTML = "Run";
run.onclick = onRun;

ui.extend(document.documentElement, run);

var show = ui.create("button");

show.innerHTML = "Show ONE";
show.onclick = showONE;

ui.extend(document.documentElement, show);
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

function consoleStone() {

	philosophersStone.abide(this, new fusion.FUSIONUnit());

	var reference = this;

	this.verify = function(element) {

		if(!reference.cleared) {

			try {

				let literal =
					philosophersStone.retrieve(
						philosophersStone.traverse(reference),
						function(item) {
							return philosophersStone.isTagged(item, "Literal");
						}
					)[0];
				
				if(literal == null)
					return false;

				if(reference.fusion == null) {

					reference.fusion =
						philosophersStone.retrieve(
							philosophersStone.traverse(reference),
							function(item) {
								return philosophersStone.isTagged(item, "FUSION");
							}
						)[0];
				}

				for(let i = 0; i < reference.fusion.fusionUnits.length; i++) {

					if(reference.fusion.fusionUnits[i] == reference ||
						philosophersStone.isTagged(reference.fusion.fusionUnits[i], "Literal") ||
						philosophersStone.isTagged(reference.fusion.fusionUnits[i], "Variable") ||
						philosophersStone.isTagged(reference.fusion.fusionUnits[i], "State") ||
						philosophersStone.isTagged(reference.fusion.fusionUnits[i], "Priority")) {
						
						continue;
					}

					if(reference.fusion.fusionUnits[i].verify(one.createElement("Log")) ||
						reference.fusion.fusionUnits[i].verify(one.createElement("Log Line")) ||
						reference.fusion.fusionUnits[i].verify(one.createElement("Log Error")) ||
						reference.fusion.fusionUnits[i].verify(one.createElement("Log Line Error")) ||
						reference.fusion.fusionUnits[i].verify(one.createElement("Input"))) {

						reference.fusion.fusionUnits[i].verify = function() { return false; };
					}
				}
			}

			catch(error) {

			}

			reference.cleared = true;
		}

		return element.content.toLowerCase() == "log" ||
			element.content.toLowerCase() == "log line" ||
			element.content.toLowerCase() == "log error" ||
			element.content.toLowerCase() == "log line error" ||
			element.content.toLowerCase() == "input";
	}

	this.process = function(element, processed) {

		let data = "";

		for(let i = 0; i < processed.length; i++)
			data += "" + processed[i];

		if(element.content.toLowerCase() != "input") {

			out.value += data;

			if(element.content.toLowerCase().startsWith("log line"))
				out.value += "\n";
		}

		else
			return prompt(data);

		return null;
	}
}

function onRun() {

	let fusion = new kaeonFUSION.KaeonFUSION();

	out.value = "";

	philosophersStone.connect(fusion, new consoleStone(), [], true);

	fusion.process(onePlus.readONEPlus(text.value));
}

function showONE() {
	out.value = one.writeONE(onePlus.readONEPlus(text.value));
}