'use strict';

const td            = require('testdouble');
const PluginCmd     = require('../../../lib/commands/plugin');
const CdvRawTask    = require('../../../lib/tasks/cordova-raw');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const isAnything    = td.matchers.anything();
const isArray       = td.matchers.isA(Array);

describe('Build Command', () => {
  let pluginDouble;

  beforeEach(() => {
    PluginCmd.ui = mockProject.ui;
    PluginCmd.project = mockProject.project;

    pluginDouble = td.replace(CdvRawTask.prototype, 'run');
  });

  afterEach(() => {
    td.reset();
  });

  it('passes command to Plugin Task', () => {
    PluginCmd.run({}, ['add', 'cordova-plugin'])
    td.verify(pluginDouble('add', isArray, isAnything));
  });

  it('passes the save flag', () => {
    var opts = { save: false };
    PluginCmd.run(opts, ['add', 'cordova-plugin']);
    td.verify(pluginDouble('add', isArray, false));
  });
});
