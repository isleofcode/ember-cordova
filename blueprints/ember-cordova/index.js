'use strict';

var initProject = require('../../lib/utils/init-project');
var chalk = require('chalk');

module.exports = {
  name: 'ember-cordova',

  availableOptions: [
    {
      name: 'name',
      type: String
    }, {
      name: 'cordovaid',
      type: String
    }, {
      name: 'template-path',
      type: String
    }
  ],

  fileMapTokens: function() {
    return {
      __root__: function() { return '/'; }
    };
  },

  normalizeEntityName: function() {
    // h/t mirage
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  /* eslint-disable max-len */
  afterInstall: function(options) {
    console.log(chalk.yellow(
      'The ember-cordova project is migrating to corber.io, ' +
      'an extension of ember-cordova with added support for Vue/React. \n \n' +

      'Ember users will see no loss of features by migrating. Details:' +
      'http://blog.isleofcode.com/announcing-corber-ember-cordova-vue/ \n \n' +

      'We will continue fixing ember-cordova bugs, however must new features will apply to corber. \n'
    ));

    return initProject(options, this.project, this.ui);
  }
  /* eslint-enable max-len */
};
