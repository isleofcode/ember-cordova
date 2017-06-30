var Task            = require('./-task');
var Promise         = require('rsvp').Promise;

var path            = require('path');
var fsUtils         = require('../utils/fs-utils');
var logger          = require('../utils/logger');
var includes        = require('lodash').includes;

/* eslint-disable camelcase */

module.exports = Task.extend({
  project: undefined,

  run: function() {
    var projectRoot = this.project.root;
    logger.info('ember-cordova: updating .watchmanconfig');

    var configPath = path.join(projectRoot, '.watchmanconfig')

    return fsUtils.read(configPath, { encoding: 'utf8' })
      .then(function(config) {
        var json = JSON.parse(config);
        var ignored;

        if (json.ignore_dirs) {
          ignored = json.ignore_dirs;
          if (includes(ignored, 'ember-cordova') === false) {
            ignored.push('ember-cordova');
          }
        } else {
          ignored = ['ember-cordova'];
        }

        json.ignore_dirs = ignored;

        var contents = JSON.stringify(json);

        return fsUtils.write(configPath, contents, 'utf8')
          .then(function() {
            logger.success('Added ember-cordova to watchman ignore');
          });
      }, function(err) {
        return Promise.reject(
          'ember-cordova: failed to update .watchmanconfig, err: ' + err
        );
      });
  }
});
