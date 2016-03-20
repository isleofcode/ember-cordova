var stringUtils       = require('../../lib/utils/string');
var defaultPlatform   = require('../../lib/utils/default-platform');

module.exports = {
  name: 'ember-cordova',

  afterInstall: function(options) {
    this.options          = options.entity.options;
    this.options.platform = options.platform || defaultPlatform(this.project);

    this.project.cordovaConfig = {
      name: stringUtils.classify(this.project.name()),
      id: options.entity.name
    };

    var createProject   = require('../../lib/tasks/create-cordova-project')(this.project);
    return createProject();
  }
};
