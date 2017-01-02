var Promise = require('ember-cli/lib/ext/promise');

module.exports = function() {
  return Promise(function(resolve, reject) {
    setTimeout(5, () => reject('hook rejected'));
  });
};
