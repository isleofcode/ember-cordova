'use strict';

var Task            = require('../-task');
var Promise         = require('ember-cli/lib/ext/promise');
var chalk           = require('chalk');
var path            = require('path');
var includes        = require('lodash').includes;

var fsUtils         = require('../../utils/fs-utils');

var coreMsg = 'Youve defined {{rootURL}} or {{baseURL}} in app/index.html. \n' +
  'This will not work in cordova, and needs to be removed. \n' +
  'See $docLink for more info. \n';

module.exports = Task.extend({
  project: undefined,

  invalidIndex: function() {
    var error = chalk.red(
      'ember-cordova: Build Aborted. \n' +
      coreMsg +
      'You can pass the --force flag to ignore this if youve otherwise handled'
    );

    return Promise.reject(error);
  },

  run: function(force) {
    var indexPath = path.join(this.project.root, 'app/index.html');

    return fsUtils.read(indexPath, { encoding: 'utf8' }).then(function(index) {
      var hasRoot = includes(index, '{{rootURL}}') ||
                    includes(index, '{{baseURL}}');

      if (hasRoot && force !== true) {
        return this.invalidIndex.apply(this)
      } else if (hasRoot && force === true) {
        this.ui.writeLine(chalk.yellow(
          'ember-cordova: Build Warning' +
          coreMsg +
          'You have passed the --force flag, so continuing'
        ));
      }
    }.bind(this), function(error) {
      var msg = chalk.red(
        'ember-cordova: error reading app/index.html. ' + error
      )
      return Promise.reject(msg);
    }.bind(this));
  }
});
