var Task            = require('./-task');

var chalk           = require('chalk');
var path            = require('path');
var fsUtils         = require('../utils/fs-utils');

/* eslint-disable camelcase */

module.exports = Task.extend({
  project: undefined,
  ui: undefined,

  run: function() {
    var ui = this.ui;
    var project = this.project;

    this.ui.writeLine(chalk.green(
      'ember-cordova: updating .watchmanconfig'
    ));

    var configPath = path.join(project.root, '.watchmanconfig')

    return fsUtils.read(configPath, { encoding: 'utf8' })
      .then(function(config) {
        var json = JSON.parse(config);
        var ignored;

        if (json.ignore_dirs) {
          ignored = json.ignore_dirs;
          ignored.push('ember-cordova');
        } else {
          ignored = ['ember-cordova'];
        }
        json.ignore_dirs = ignored;

        var contents = JSON.stringify(json);

        return fsUtils.write(configPath, contents, 'utf8').then(function() {
          ui.writeLine(chalk.green(
            'ember-cordova: Added ember-cordova to watchman ignore'
          ));
        });
      }, function(err) {
        ui.writeLine(chalk.red(
          'ember-cordova: failed to update .watchmanconfig, err: ' + err
        ));
      });
  }
});
