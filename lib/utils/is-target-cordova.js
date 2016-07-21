'use strict';

module.exports = function isTargetCordova() {
  return process.env.EMBER_CORDOVA === 'true';
};
