'use strict';

var CreateTask            = require('../../lib/tasks/create-cordova-project');
var UpdateGitIgnore       = require('../../lib/tasks/update-gitignore');
var UpdateWatchmanIgnore  = require('../../lib/tasks/update-watchman-config');
var camelize              = require('../../lib/utils/string.js').camelize;

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

  createProjectId: function(projectName) {
    return 'com.embercordova.' + projectName;
  },

  afterInstall: function(options) {
    var projectName = camelize(this.project.name());

    var create = new CreateTask({
      id: options.cordovaid || this.createProjectId(projectName),
      name: options.name || projectName,
      project: this.project,
      ui: this.ui
    });

    var updateGitIgnore = new UpdateGitIgnore({
      project: this.project,
      ui: this.ui
    });

    var updateWatchmanIgnore = new UpdateWatchmanIgnore({
      project: this.project,
      ui: this.ui
    });

    return create.run(options.templatePath)
           .then(updateGitIgnore.prepare())
           .then(updateWatchmanIgnore.prepare());
  }
};
