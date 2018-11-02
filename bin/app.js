#!/usr/bin/env node

const dl = require('../modules/dl.js');
const log = require('../modules/log.js');
const errs = require('../assets/errors.json');

process.argv.splice(0, 2);

var input = process.argv;

if(input[0] == undefined) {
  log.err(errs.missingID);
  process.exit();
}

if(input[0].length > 11) {
  input[0] = input[0].split('?v=')[1];
  if(input[0].includes('&t=')) input[0] = input[0].split('&t=')[0];
  if(input[0].includes('&list=')) input[0] = input[0].split('&list=')[0];
  if(input[0].includes('&start_radio=')) input[0] = input[0].split('&start_radio=')[0];
}

if(input[0].length != 11) log.err(errs.badID); else {
  dl(input[0])
  .then(() => process.exit())
  .catch((err) => log.err(err));
}