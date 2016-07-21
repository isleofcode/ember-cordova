'use strict';

module.exports = function(config) {
  var locationType    = config.locationType,
      isHashLocation  = locationType === 'hash';

  if (!isHashLocation) {
    throw new Error(
      'ember-cordova: You must specify the locationType as ' +
      '\'hash\' in your environment.js.');
  }
};
