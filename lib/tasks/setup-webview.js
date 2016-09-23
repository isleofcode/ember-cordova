'use strict';

var Task            = require('./-task');
var CordovaRawTask  = require('../tasks/cordova-raw');
var chalk           = require('chalk');

module.exports = Task.extend({
  project: undefined,
  ui: undefined,
  platform: undefined,

  run: function() {
    var viewName, upgradeWebView;

    upgradeWebView = new CordovaRawTask({
      project: this.project,
      ui: this.ui,
      rawApi: 'plugins'
    });

    if (this.platform === 'ios') {
      viewName = 'cordova-plugin-wkwebview-engine';
    } else if (this.platform === 'android') {
      viewName = 'cordova-plugin-crosswalk-webview';
    }

    this.ui.writeLine(chalk.yellow(
      'WARNING: ember-cordova initializes with upgraded WebViews. ' +
      'See DOCLINK for more details. ' +
      'If you want default cordova views, pass --default-webview=true.'
    ));

    this.ui.writeLine(chalk.green(
      'Initializing cordova with upgraded WebView ' + viewName
    ));

    return upgradeWebView.run('add', viewName, { save: true });
  }
});
