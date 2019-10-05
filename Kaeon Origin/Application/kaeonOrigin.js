var ui = require("https://raw.githubusercontent.com/Gallery-of-Kaeon/JavaScript-Utilities/master/JavaScript%20Utilities/UI/UI.js")

let text = ui.create("textarea");

ui.extend(document.documentElement, text);

let run = ui.create("button");
run.innerHTML = "Run";

ui.extend(document.documentElement, run);