var Command         = require('ember-cli/lib/models/command');
var Leek            = require('leek');
var ConfigStore     = require('configstore');
var uuid            = require('uuid');
var _get            = require('lodash').get;

module.exports = Command.extend({
  //h/t ember-cli
  getUUID: function() {
    var configStore = new ConfigStore('ember-cordova');
    var id = configStore.get('uuid');
    if (id === undefined) {
      id = uuid.v4().toString();
      configStore.set('uuid', id);
    }

    return id;
  },

  init: function(app) {
    this._super.apply(this, arguments);

    var disabled = _get(app, 'settings.disableEcAnalytics', false);
    var version = _get(app, 'project.addonPackages.ember-cordova.pkg.version');
    var id = this.getUUID();

    this.analytics = new Leek({
      silent: disabled,
      name: id,
      globalName: 'ember-cordova',
      trackingCode: 'UA-50368464-2',
      version: version
    });
  },

  run: function() {
    this.analytics.track({
      message: this.name
    });

    return;
  }
});
