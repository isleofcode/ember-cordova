'use strict';

const td            = require('testdouble');
const PluginCmd     = require('../../../lib/commands/plugin');
const CdvRawTask    = require('../../../lib/tasks/cordova-raw');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const isAnything    = td.matchers.anything();

describe('Plugin Command', () => {
  let rawDouble;

  beforeEach(() => {
    PluginCmd.ui = mockProject.ui;
    PluginCmd.project = mockProject.project;

    rawDouble = td.replace(CdvRawTask.prototype, 'run');
  });

  afterEach(() => {
    td.reset();
  });

  it('passes command to Cordova Raw', () => {
    PluginCmd.run({}, ['add', 'cordova-plugin'])
    td.verify(rawDouble('add', ['cordova-plugin'], isAnything));
  });

  it('passes the save flag', () => {
    var opts = { save: false };
    PluginCmd.run(opts, ['add', 'cordova-plugin']);
    td.verify(rawDouble('add', ['cordova-plugin'], { save: false }));
  });
});
