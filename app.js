const dl = require('./modules/dl.js');

process.argv.splice(0, 2);

const log = console.log;

var input = process.argv;

//ID check

if(input[0].length > 11) {
  input[0] = input[0].split('?v=')[1];
  if(input[0].length > 11) input[0] = input[0].split('&t=')[0];
}

if(input[0].length != 11) throw "ID must be 11 characters long, and/or URL must be valid.";

//continue if ID is correct

dl(input[0]);







