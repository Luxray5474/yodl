const log = require('./log.js');
const fs = require('fs');

const errs = require('../assets/errors.json');

module.exports.path = (path) => {
  if(!path.includes('/', path.length - 1)) path = `${path}/`
  if(fs.existsSync(path)) return true; else {
    log.err(errs.badOutPath);
    process.exit(); 
  }
}