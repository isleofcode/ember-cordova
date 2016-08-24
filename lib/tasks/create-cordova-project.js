'use strict';

var Task            = require('./-task');
var cordovaPath     = require('../utils/cordova-path');
var camelize        = require('../../lib/utils/string.js').camelize;
var path            = require('path');
var fs              = require('fs');
var chalk           = require('chalk');
var Promise         = require('ember-cli/lib/ext/promise');

var cordovaProj     = require('cordova-lib').cordova;

module.exports = Task.extend({
  id: undefined,
  name: undefined,
  project: undefined,
  ui: undefined,

  run: function(templatePath) {
    return new Promise(function(resolve) {
      var emberCdvPath = cordovaPath(this.project, true);

      if (!fs.existsSync(emberCdvPath)) {
        this.ui.writeLine('Initting ember-cordova directory');
        fs.mkdirSync(emberCdvPath);
      }

      var cdvPath = path.join(emberCdvPath, 'cordova');
      if (!fs.existsSync(cdvPath)) {
        var id = camelize(this.id);
        var name = camelize(this.name);

        var config = {};
        if (templatePath !== undefined) {
          config = {
            lib: {
              www: { url: templatePath, template: true }
            }
          };
        }

        return cordovaProj.raw.create(cdvPath, id, name, config).then(resolve);
      } else {
        this.ui.writeLine(chalk.yellow(
          'Warning: ember-cordova/cordova project already exists. ' +
          'Please ensure it is a real cordova project.'
        ));

        resolve();
      }
    }.bind(this));
  }
});

