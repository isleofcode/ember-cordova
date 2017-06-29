'use strict';

var initProject = require('../../lib/utils/init-project');

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

  afterInstall: function(options) {
    return initProject(options, this.project, this.ui);
  }
};
