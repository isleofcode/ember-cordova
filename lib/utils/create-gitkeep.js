var Promise         = require('ember-cli/lib/ext/promise');
var fs              = require('fs');

module.exports = function(gitkeepPath) {
  return new Promise(function(resolve, reject) {
    try {
      fs.closeSync(fs.openSync(gitkeepPath, 'w'));
      resolve();
    } catch (err) {
      reject(err)
    }
  });
}
