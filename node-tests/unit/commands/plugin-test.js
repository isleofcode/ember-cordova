'use strict';

var td              = require('testdouble');
var PluginCmd       = require('../../../lib/commands/plugin');
var CdvRawTask      = require('../../../lib/tasks/cordova-raw');

var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var mockAnalytics   = require('../../fixtures/ember-cordova-mock/analytics');
var isAnything      = td.matchers.anything();
var contains        = td.matchers.contains;

describe('Plugin Command', function() {
  var rawDouble, plugin;

  beforeEach(function() {
    plugin = new PluginCmd({
      project: mockProject.project
    });
    plugin.analytics = mockAnalytics;

    rawDouble = td.replace(CdvRawTask.prototype, 'run');
  });

  afterEach(function() {
    td.reset();
  });

  it('passes command to Cordova Raw', function() {
    return plugin.run({}, ['add', 'cordova-plugin']).then(function() {
      td.verify(rawDouble('add', 'cordova-plugin', isAnything));
    });
  });

  it('passes the save flag', function() {
    var opts = { save: false };
    return plugin.run(opts, ['add', 'cordova-plugin']).then(function() {
      td.verify(rawDouble('add', 'cordova-plugin', contains({ save: false })));
    });
  });
});
