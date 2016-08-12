'use strict';

var childProcess = require('child_process');

module.exports = function(commandName) {
  var cmdStr = 'command -v ' + commandName +
    ' >/dev/null && { echo >&1 \'command found\'; }';

  try {
    childProcess.execSync(cmdStr);
    return true;
  }
  catch  (err) {
    return false;
  }
};
