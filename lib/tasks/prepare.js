'use strict';

var runCommand = require('../utils/run-command');
var fs         = require('fs-extra');
var path       = require('path');

module.exports = function(project) {
  if(!project) {
    throw new Error('A project must be passed into this function');
  }

  var cordovaPath = path.join(project.root, 'cordova');
  var wwwPath     = path.join(cordovaPath, 'www');

  var cdvCommand = 'cordova prepare';
  var cdvMsg = 'Running cordova prepare';

  return function() {
    return runCommand(cdvCommand, cdvMsg, {
      cwd: path.join(project.root, 'cordova')
    })();
  }
};
