var Promise = require('ember-cli/lib/ext/promise');

module.exports = function() {
  return new Promise(function(resolve, reject) {
    setTimeout(5, () => reject('hook rejected'));
  });
};
