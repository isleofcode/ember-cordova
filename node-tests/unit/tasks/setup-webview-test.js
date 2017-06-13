'use strict';

var td              = require('testdouble');
var expect          = require('../../helpers/expect');
var isAnything      = td.matchers.anything();
var logger          = require('../../../lib/utils/logger');

var CdvRawTask      = require('../../../lib/tasks/cordova-raw');
var SetupViewTask   = require('../../../lib/tasks/setup-webview');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var contains        = td.matchers.contains;


describe('Setup Webview Task', function() {
  var rawDouble, setupTask;

  beforeEach(function() {
    rawDouble = td.replace(CdvRawTask.prototype, 'run');

    setupTask = new SetupViewTask({
      project: mockProject.project,
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

  it('warns the user of default changes in ios', function() {
    var warnDouble = td.replace(logger, 'warn');
    var successDouble = td.replace(logger, 'success');

    setupTask.run();
    td.verify(warnDouble(contains(
      'ember-cordova initializes ios with the upgraded WKWebView'
    )));

    td.verify(successDouble(contains(
      'Initializing cordova with upgraded WebView'
    )));
  });

  it('defaults to crosswalk=false', function() {
    expect(setupTask.crosswalk).to.equal(false);
  });

  it('defaults to uiwebview=false', function() {
    expect(setupTask.uiwebview).to.equal(false);
  });

  it('when crosswalk=false(default), it uses android default', function() {
    setupTask.platform = 'android';
    setupTask.run();
    td.verify(rawDouble(), {times: 0, ignoreExtraArgs: true});
  });

  it('when uiwebview=true, it uses ios default webview', function() {
    setupTask.uiwebview = true;
    setupTask.run();
    td.verify(rawDouble(), {times: 0, ignoreExtraArgs: true});
  });

  it('when crosswalk=true, it uses crosswalk', function() {
    setupTask.platform = 'android';
    setupTask.crosswalk = true;
    setupTask.run();
    td.verify(rawDouble('add', 'cordova-plugin-crosswalk-webview', isAnything));
  });

  it('when uiwebview=false(default), it uses wkwebview', function() {
    setupTask.run();
    td.verify(rawDouble('add', 'cordova-plugin-wkwebview-engine', isAnything));
  });

  describe('invalid platform/webview combinations', function() {
    it('warns ios users if crosswalk=true', function() {
      setupTask.crosswalk = true;
      let warnDouble = td.replace(setupTask, 'warnPlatform');

      setupTask.run();
      td.verify(warnDouble('ios', 'crosswalk=true'));
    });

    it('warns android users if uiwebview=true', function() {
      setupTask.platform = 'android';
      setupTask.uiwebview = true;
      let warnDouble = td.replace(setupTask, 'warnPlatform');

      setupTask.run();
      td.verify(warnDouble('android', 'uiwebview=true'));
    });
  });
});
