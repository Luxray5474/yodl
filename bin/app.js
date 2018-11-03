#!/usr/bin/env node

const dl = require('../modules/dl.js');
const id = require('../modules/id.js');
const log = require('../modules/log.js');
const errs = require('../assets/errors.json');

process.argv.splice(0, 2);

var input = process.argv;

id(input[0])
  .then((id) => dl(id)
    .then(() => {
      process.exit;
    })
    .catch((err) => log.err(err)))
  .catch((err) => {
    if(err.message == 'missingID') log.err(errs.missingID);
    if(err.message == 'badID') log.err(errs.badID);
})