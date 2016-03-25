'use strict';

var CreateTask       = require('../../lib/tasks/create-cordova-project');

module.exports = {
  name: 'ember-cordova',

  availableOptions: [
    {
      name: 'name',
      type: String
    }, {
      name: 'cordovaId',
      type: String
    }
  ],

  normalizeEntityName: function() {
    // h/t mirage
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  fileMapTokens: function() {
    return {
      __root__: function(options) {
        if (options.inAddon) {
          return path.join('tests', 'dummy');
        }

        return '/';
      }
    };
  },

  afterInstall: function(options) {
    var projectName = this.project.name();

    var create = new CreateTask({
      project: this.project,
      ui: this.ui,
      name: options.name || projectName,
      id: options.cordovaId || projectName
    });

    return create.run()
  }
};
