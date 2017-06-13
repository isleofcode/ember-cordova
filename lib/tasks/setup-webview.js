'use strict';

var Task            = require('./-task');
var CordovaRawTask  = require('../tasks/cordova-raw');
var logger          = require('../utils/logger');
var Promise         = require('rsvp').Promise;

module.exports = Task.extend({
  project: undefined,
  platform: undefined,
  uiwebview: false,
  crosswalk: false,

  warnPlatform: function(platform, view) {
    logger.warn(
      'You have specified platform=' + platform + ' and ' + view + '.' +
      'Crosswalk is only available on android. This will have no effect.'
    );
  },

  run: function() {
    var viewName, upgradeWebView;

    upgradeWebView = new CordovaRawTask({
      project: this.project,
      rawApi: 'plugins'
    });

    if (this.platform === 'ios') {
      if (this.crosswalk === true) {
        this.warnPlatform('ios', 'crosswalk=true');
      } else if (this.uiwebview === false) {
        viewName = 'cordova-plugin-wkwebview-engine';
      }
    } else if (this.platform === 'android') {
      if (this.uiwebview === true) {
        this.warnPlatform('android', 'uiwebview=true');
      } else if (this.crosswalk === true) {
        viewName = 'cordova-plugin-crosswalk-webview';
      }
    }

    logger.warn(
      'ember-cordova initializes with upgraded WebViews. ' +
      'See http://ember-cordova.com/pages/default_webviews for details and flags'
    );

    logger.success(
      'Initializing cordova with upgraded WebView ' + viewName
    );

    if (viewName !== undefined) {
      return upgradeWebView.run('add', viewName, { save: true });
    } else {
      return Promise.resolve();
    }
  }
});
