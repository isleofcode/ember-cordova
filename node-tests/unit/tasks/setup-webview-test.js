'use strict';

var td              = require('testdouble');
var expect          = require('../../helpers/expect');
var isAnything      = td.matchers.anything();
var CdvRawTask      = require('../../../lib/tasks/cordova-raw');
var SetupViewTask   = require('../../../lib/tasks/setup-webview');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');


describe('Setup Webview Task', function() {
  var rawDouble, setupTask;

  beforeEach(function() {
    rawDouble = td.replace(CdvRawTask.prototype, 'run');

    setupTask = new SetupViewTask({
      project: mockProject.project,
      ui: mockProject.ui,
      platform: 'ios'
    });
  });

  afterEach(function() {
    td.reset();
  });

  it('runs a corodva raw task to install plugins', function() {
    setupTask.run();
    td.verify(rawDouble(isAnything, isAnything, isAnything));
  });

  it('warns the user & alerts them of install', function() {
    setupTask.run();

    expect(setupTask.ui.output).to.contain(
      'WARNING: ember-cordova initializes with upgraded WebViews.'
    );

    expect(setupTask.ui.output).to.contain(
      'Initializing cordova with upgraded WebView'
    );
  });

  it('uses cordova-plugin-wkwebview-engine for ios', function() {
    setupTask.run();
    td.verify(rawDouble('add', 'cordova-plugin-wkwebview-engine', isAnything));
  });

  it('uses cordova-plugin-crosswalk-webview for android', function() {
    setupTask.platform = 'android';
    setupTask.run();
    td.verify(rawDouble('add', 'cordova-plugin-crosswalk-webview', isAnything));
  });
});
