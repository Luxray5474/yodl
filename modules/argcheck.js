const log = require('./log.js');
const fs = require('fs');

const errs = require('../assets/errors.json');

module.exports.path = (path) => {
  if(!path.includes('/', path.length - 1)) path = `${path}/`
  if(fs.existsSync(path)) return true; else log.fatal(errs.badOutPath);
}

module.exports.format = (input) => {
  if(input.match(/mp4|mp3|m4a|mov|avi|flv/)) return true; else log.fatal(errs.badFormat);
}