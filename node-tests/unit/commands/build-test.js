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
  beforeEach(() => {
    BuildCmd.ui = mockProject.ui;
    BuildCmd.project = defaults(mockProject.project, {
      config: {
        cordova: {
          platform: 'android',
          reloadUrl: 'reloadUrl'
        }
      }
    });
  });

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

  it('passes env to ember build task', () => {
    td.replace(CdvBuildTask.prototype, 'run', () => {
      return Promise.resolve();
    });
    td.replace(LinkTask.prototype, 'run', () => {
      return Promise.resolve();
    });
    td.replace(HookTask.prototype, 'run',  (hookName) => {
      return Promise.resolve();
    });

    let buildDouble = td.replace(EmberBldTask.prototype, 'run');

    BuildCmd.run({
      environment: 'development'
    });
    td.verify(buildDouble('development'));
  });

  it('passes platform to cordova build task', () => {
    td.replace(EmberBldTask.prototype, 'run', () => {
      return Promise.resolve();
    });
    td.replace(LinkTask.prototype, 'run', () => {
      return Promise.resolve();
    });
    td.replace(HookTask.prototype, 'run',  (hookName) => {
      return Promise.resolve();
    });

    let cordovaDouble = td.replace(CdvBuildTask.prototype, 'run');

    BuildCmd.run({
      platform: 'ios'
    });
    td.verify(cordovaDouble('ios'));
  });
});
