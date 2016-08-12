'use strict';

const td            = require('testdouble');
const PlatformCmd   = require('../../../lib/commands/platform');
const CdvRawTask    = require('../../../lib/tasks/cordova-raw');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const isAnything    = td.matchers.anything();
const isArray       = td.matchers.isA(Array);

describe('Platform Command', () => {
  let rawDouble;

  beforeEach(() => {
    PlatformCmd.ui = mockProject.ui;
    PlatformCmd.project = mockProject.project;

    rawDouble = td.replace(CdvRawTask.prototype, 'run');
  });

  afterEach(() => {
    td.reset();
  });

  it('passes command to Plugin Task', () => {
    PlatformCmd.run({}, ['add', 'cordova-plugin'])
    td.verify(rawDouble('add', isArray, isAnything));
  });

  it('passes the save flag', () => {
    var opts = { save: false };
    PlatformCmd.run(opts, ['add', 'cordova-plugin']);
    td.verify(rawDouble('add', isArray, false));
  });
});
