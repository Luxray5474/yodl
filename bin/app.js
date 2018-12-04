#!/usr/bin/env node

const arg = require('../modules/arg.js');
const dl = require('../modules/dl.js');
const id = require('../modules/id.js');
const log = require('../modules/log.js');

const errs = require('../assets/errors.json');

process.argv.splice(0, 2);

var input = arg(process.argv); 

id(input[0]) //array element delegations are found in arg.js
  .then((id) => dl(id, input)
    .then(() => process.exit)
    .catch((err) => log.fatal(err)))
  .catch((err) => {
    if(err.message == 'missingID') log.fatal(errs.missingID);
    if(err.message == 'badID') log.fatal(errs.badID);
})