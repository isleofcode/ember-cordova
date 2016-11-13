var Task            = require('./-task');
var Promise         = require('ember-cli/lib/ext/promise');

var chalk           = require('chalk');
var fs              = require('fs');
var path            = require('path');

var RSVP            = require('rsvp')
var denodeify       = RSVP.denodeify
var readFile        = denodeify(fs.readFile)

module.exports = Task.extend({
  project: undefined,
  ui: undefined,

  run: function() {
    var ui = this.ui;
    var project = this.project;

    this.ui.writeLine(chalk.green(
      'ember-cordova: updating .watchmanconfig'
    ));

    return new Promise(function(resolve) {
      var configPath = path.join(project.root, '.watchmanconfig')

      readFile(configPath, { encoding: 'utf8' }).then(function(config) {
        try {
          var json = JSON.parse(config);
          var ignored;

          if (json.ignore_dirs) {
            ignored = json.ignore_dirs;
            ignored.push('ember-cordova');
          } else {
            ignored = ['ember-cordova'];
          }
          json.ignore_dirs = ignored;

          fs.writeFileSync(configPath, JSON.stringify(json), 'utf8')

          ui.writeLine(chalk.green(
            'ember-cordova: Added ember-cordova to watchman ignore'
          ));

          resolve();
        } catch (err) {
          ui.writeLine(chalk.red(
            'ember-cordova: failed to update .watchmanconfig, err: ' + err
          ));
          resolve();
        }
      })
    });
  }
});
