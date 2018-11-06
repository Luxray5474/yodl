const argCheck = require('./argcheck.js');

module.exports = (input) => {
  var argsOut = ['id', 'default'];

  input.forEach((currentValue) => {
    if(/-o=/.test(currentValue)) { //finna add other args when they are implemented
      var prefix = currentValue.split('=')[0];
      var value = currentValue.split('=')[1];

      if(prefix == '-o' && argCheck.path(value.replace(/\\/g, '/'))) argsOut[1] = value;
    } else argsOut[0] = currentValue;
  })
  return argsOut;
}