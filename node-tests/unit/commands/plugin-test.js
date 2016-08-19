'use strict';

const td            = require('testdouble');
const PluginCmd     = require('../../../lib/commands/plugin');
const CdvRawTask    = require('../../../lib/tasks/cordova-raw');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const mockAnalytics = require('../../fixtures/ember-cordova-mock/analytics');
const isAnything    = td.matchers.anything();

describe('Plugin Command', () => {
  let rawDouble, plugin;

  beforeEach(() => {
    plugin = new PluginCmd({
      project: mockProject.project,
      ui: mockProject.ui
    });
    plugin.analytics = mockAnalytics;

    rawDouble = td.replace(CdvRawTask.prototype, 'run');
  });

  afterEach(() => {
    td.reset();
  });

  it('passes command to Cordova Raw', () => {
    return plugin.run({}, ['add', 'cordova-plugin']).then(function() {
      td.verify(rawDouble('add', ['cordova-plugin'], isAnything));
    });
  });

  it('passes the save flag', () => {
    var opts = { save: false };
    return plugin.run(opts, ['add', 'cordova-plugin']).then(function() {
      td.verify(rawDouble('add', ['cordova-plugin'], { save: false }));
    });
  });
});
