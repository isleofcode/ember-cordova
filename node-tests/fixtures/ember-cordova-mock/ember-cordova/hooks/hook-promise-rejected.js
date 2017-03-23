var Promise = require('rsvp');

module.exports = function() {
  return Promise.reject('hook rejected');
};
