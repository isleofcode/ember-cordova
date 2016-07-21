'use strict';

var childProcess = require('child_process');

module.exports = function(commandName) {
  var cmdStr = 'command -v ' + commandName +
    ' >/dev/null && { echo >&1 \'command found\'; }';

  var output = childProcess.execSync(cmdStr).toString().trim();

  return output === 'command found';
};
