'use strict';

const td            = require('testdouble');
const expect        = require('../../helpers/expect');
const PluginCmd     = require('../../../lib/commands/plugin');
const PluginTask    = require('../../../lib/tasks/cordova-plugin');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const isAnything    = td.matchers.anything();
const isArray       = td.matchers.isA(Array);

describe('Build Command', () => {
  let pluginDouble;

  beforeEach(() => {
    PluginCmd.ui = mockProject.ui;
    PluginCmd.project = mockProject.project;

    pluginDouble = td.replace(PluginTask.prototype, 'run');
  });

  afterEach(() => {
    td.reset();
  });

  it('exits if command is not add or remove', () => {
    expect(PluginCmd.run({})).to.be.an('error');
  });

  it('passes command to Plugin Task', () => {
    PluginCmd.run({}, ['add', 'cordova-plugin'])
    td.verify(pluginDouble('add', isArray, isAnything));
  });

  it('correctly pulls a single plugin name', () => {
    PluginCmd.run({}, ['add', 'cordova-plugin']);
    td.verify(pluginDouble('add', ['cordova-plugin'], isAnything));
  });

  it('correctly pulls multiple plugin names', () => {
    var plugins = ['cordova-plugin', 'cordova-plugin-2'];
    PluginCmd.run({}, ['add', 'cordova-plugin', 'cordova-plugin-2']);
    td.verify(pluginDouble('add', plugins, isAnything));
  });

  it('passes the save flag', () => {
    var opts = { save: false };
    PluginCmd.run(opts, ['add', 'cordova-plugin']);
    td.verify(pluginDouble('add', isArray, false));
  });
});
