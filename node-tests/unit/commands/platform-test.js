'use strict';

const td            = require('testdouble');
const PlatformCmd   = require('../../../lib/commands/platform');
const CdvRawTask    = require('../../../lib/tasks/cordova-raw');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const isAnything    = td.matchers.anything();

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

  it('passes command to Cordova Raw Task', () => {
    return PlatformCmd.run({}, ['add', 'cordova-plugin']).then(function() {
      td.verify(rawDouble('add', ['cordova-plugin'], isAnything));
    });
  });

  it('passes the save flag', () => {
    var opts = { save: false };
    return PlatformCmd.run(opts, ['add', 'cordova-plugin']).then(function() {
      td.verify(rawDouble('add', ['cordova-plugin'], { save: false }));
    });
  });
});
