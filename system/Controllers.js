import fs from "fs";

const files = fs.readdirSync('controllers');

let controllers = {};

for(let i = 0; i < files.length; i++){
	let file = files[i].split('.');
	if(file[1] == 'js'){
		controllers[file[0]] = require('../controllers/' + files[i]);
	}
}

export default controllers;