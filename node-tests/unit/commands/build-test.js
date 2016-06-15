'use strict';

const td            = require('testdouble');
const expect        = require('../../helpers/expect');
const Promise       = require('ember-cli/lib/ext/promise');

const BuildCmd      = require('../../../lib/commands/build');
const EmberBldTask  = require('../../../lib/tasks/ember-build');
const CdvBuildTask  = require('../../../lib/tasks/cordova-build');
const LinkTask      = require('../../../lib/tasks/link-environment');
const HookTask      = require('../../../lib/tasks/run-hook');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const defaults      = require('lodash').defaults;


describe('Build Command', () => {
  afterEach(() => {
    td.reset();
  });

  it('runs tasks in the correct order', () => {
    let tasks = [];

    td.replace(HookTask.prototype, 'run',  (hookName) => {
      tasks.push('hook ' + hookName);
      return Promise.resolve();
    });

    td.replace(EmberBldTask.prototype, 'run', () => {
      tasks.push('ember-build');
      return Promise.resolve();
    });

    td.replace(CdvBuildTask.prototype, 'run', () => {
      tasks.push('cordova-build');
      return Promise.resolve();
    });

    td.replace(LinkTask.prototype, 'run', () => {
      tasks.push('link');
      return Promise.resolve();
    });

    BuildCmd.run(mockProject);

    //h-t ember-electron for the pattern
    expect(tasks).to.deep.equal([
      'hook beforeBuild',
      'ember-build',
      'link',
      'cordova-build',
      'hook afterBuild'
    ]);
  });

  xit('uses default platform if none is provided', () => {
  });

  xit('passes env to ember build task', () => {
  });

  xit('passes platform to cordova build task', () => {
  });
});

