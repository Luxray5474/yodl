#!/usr/bin/env node

const arg = require('../modules/arg.js');
const dl = require('../modules/dl.js');
const id = require('../modules/id.js');
const log = require('../modules/log.js');

const errs = require('../assets/errors.json');

process.argv.splice(0, 2);

var input = arg(process.argv); 
/* some are subject to change; array elements represent...
0 - id [str] (permanent)
1 - output path [str] */

id(input[0])
  .then((id) => dl(id, input)
    .then(() => process.exit)
    .catch((err) => log.err(err)))
  .catch((err) => {
    if(err.message == 'missingID') log.fatal(errs.missingID);
    if(err.message == 'badID') log.fatal(errs.badID);
})