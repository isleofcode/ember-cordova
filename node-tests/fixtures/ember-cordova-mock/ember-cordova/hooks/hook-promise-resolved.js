var Promise = require('rsvp');

module.exports = function() {
  return Promise.resolve('resolved promise from hook');
};
