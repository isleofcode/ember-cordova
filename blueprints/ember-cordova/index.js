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
  afterInstall: function(options) {
    var projectName = this.project.name();

    var create = new CreateTask({
      id: options.cordovaId || projectName,
      name: options.name || projectName,
      project: this.project,
      ui: this.ui
    });

    return create.run()
  }
};
