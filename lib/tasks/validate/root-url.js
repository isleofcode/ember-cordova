'use strict';

var Task            = require('../-task');
var Promise         = require('ember-cli/lib/ext/promise');
var pick            = require('lodash').pick;
var values          = require('lodash').values;

var logger          = require('../../utils/logger');

var coreMsg =
  'Build Aborted. \n' +
  '{{rootURL}} or {{baseURL}} in app/index.html has a leading slash. \n' +
  'This will not work in cordova, and needs to be removed. \n' +
  'You can pass the --force flag to ignore this if youve otherwise handled \n' +
  'See http://embercordova.com/pages/setup_guide for more info.';

module.exports = Task.extend({
  project: undefined,

  validRootValues: function(values) {
    for (var i = 0; i < values.length; i++) {
      var value = values[i];
      if (value[0] === '/') { return false; }
    }

    return true;
  },

  run: function(config, force) {
    return new Promise(function(resolve, reject) {
      var rootProps = ['baseURL', 'rootURL', 'baseUrl', 'rootUrl'];
      var rootValues = values(pick(config, rootProps));
      var validRoot = this.validRootValues(rootValues);

      if (validRoot === false && force !== true) {
        reject(coreMsg);
      } else if (validRoot === false && force === true) {
        var msg = coreMsg + 'You have passed the --force flag, so continuing';
        logger.warn(msg);
        resolve();
      } else {
        resolve();
      }
    }.bind(this));
  }
});
