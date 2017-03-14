/*jshint node:true*/

module.exports = function() {
  return {
    command: "./node_modules/.bin/mocha --harmony --compilers js:babel-register 'node-tests/**/*-test.js'",
  }
};
