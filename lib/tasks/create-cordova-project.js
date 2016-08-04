'use strict';

var Task            = require('./-task');

var cordovaRun      = require('../utils/cordova-run');
var cordovaPath     = require('../utils/cordova-path');
var camelize        = require('../../lib/utils/string.js').camelize;
var path            = require('path');
var fs              = require('fs');
var chalk           = require('chalk');

var Promise         = require('ember-cli/lib/ext/promise');
var cordovaCreate   = require('cordova-lib/src/cordova/create');
var createPromise   = Promise.denodeify(cordovaCreate);

module.exports = Task.extend({
  run: function() {
    var emberCdvPath = cordovaPath(this.project, true);
    if (!fs.existsSync(emberCdvPath)) {
      this.ui.writeLine('Initting ember-cordova directory');
      fs.mkdirSync(emberCdvPath);
    }

    var cdvPath = path.join(emberCdvPath, 'cordova');
    if (!fs.existsSync(cdvPath)) {
      fs.mkdirSync(cdvPath);

      var id = camelize(this.id);
      var name = camelize(this.name);

      //Args must be in specific order for cordova-lib
      var args = [];
      args.push(cdvPath);
      args.push(id);
      args.push(name);
      return cordovaRun(createPromise, this.project, args);
    } else {
      this.ui.writeLine(chalk.yellow(
        'Warning: ember-cordova/cordova project already exists. ' +
        'Please ensure it is a real cordova project.'
      ));
    }
  }
});

