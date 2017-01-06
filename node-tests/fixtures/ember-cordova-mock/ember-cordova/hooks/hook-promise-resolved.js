var Promise = require('ember-cli/lib/ext/promise');

module.exports = function() {
  return Promise.resolve('resolved promise from hook');
};
