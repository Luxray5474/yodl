const argCheck = require('./argcheck.js');

module.exports = (input) => {
  var argsOut = ['id', 'default', 'default']; 
  /* some are subject to change; array elements represent...
  0 - id [str] (permanent)
  1 - output path [str] 
  2 - format [str:[mp4|mp3|m4a|mov|avi|flv]]*/

  input.forEach((currentValue) => {
    if(/-o=|-f=/.test(currentValue)) { //finna add other args when they are implemented
      var prefix = currentValue.split('=')[0];
      var value = currentValue.split('=')[1];

      if(prefix == '-o' && argCheck.path(value.replace(/\\/g, '/'))) argsOut[1] = value;
      if(prefix == '-f' && argCheck.format(value) && value != 'mp3') argsOut[2] = value;
    } else argsOut[0] = currentValue;
  })
  return argsOut;
}