'use strict';

var td              = require('testdouble');
var PlatformCmd     = require('../../../lib/commands/platform');
var CdvRawTask      = require('../../../lib/tasks/cordova-raw');

var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var mockAnalytics   = require('../../fixtures/ember-cordova-mock/analytics');
var isAnything      = td.matchers.anything();

describe('Platform Command', function() {
  var rawDouble, platform;

  beforeEach(function() {
    platform = new PlatformCmd({
      project: mockProject.project,
      ui: mockProject.ui
    });
    platform.analytics = mockAnalytics;

    rawDouble = td.replace(CdvRawTask.prototype, 'run');
  });

  afterEach(function() {
    td.reset();
  });

  it('passes command to Cordova Raw Task', function() {
    return platform.run({}, ['add', 'cordova-plugin']).then(function() {
      td.verify(rawDouble('add', ['cordova-plugin'], isAnything));
    });
  });

  it('passes the save flag', function() {
    var opts = { save: false };
    return platform.run(opts, ['add', 'cordova-plugin']).then(function() {
      td.verify(rawDouble('add', ['cordova-plugin'], { save: false }));
    });
  });
});
