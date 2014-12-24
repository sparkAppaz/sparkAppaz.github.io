"use strict";

var childProcess = require("child_process"),

		installs = [
			{
				command: "npm install",
				completeMessage: "[Kickstart]: NPM install okay √"
			}
		]

function install(arrayOfInstalls) {
	var i;

	for (i = 0; i < arrayOfInstalls.length; i++) {
		childProcess.exec(arrayOfInstalls[i].command, function (err, stdout, stderr) {
			var index = i - 1;

			console.log(this);
			if (err) {
				console.log(err.stack);
			}
			console.log(stdout);
			console.log(index);
			if (arrayOfInstalls[index].completeMessage) {
				console.log(arrayOfInstalls[index].completeMessage);
			}
		});
	}
}

install(installs);
