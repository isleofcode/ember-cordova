var Promise = require('ember-cli/lib/ext/promise');

module.exports = function() {
  return Promise.reject('hook rejected');
};
