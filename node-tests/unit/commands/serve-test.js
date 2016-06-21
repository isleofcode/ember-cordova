'use strict';

const td            = require('testdouble');
const expect        = require('../../helpers/expect');
const Promise       = require('ember-cli/lib/ext/promise');

const ServeCmd      = require('../../../lib/commands/serve');
const EmberBldTask  = require('../../../lib/tasks/ember-build');
const CdvBuildTask  = require('../../../lib/tasks/cordova-build');
const BashTask      = require('../../../lib/tasks/bash');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const defaults      = require('lodash').defaults;

describe('Serve Command', () => {
  beforeEach(() => {
    ServeCmd.project = defaults(mockProject.project, {
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

    td.replace(EmberBldTask.prototype, 'run', () => {
      tasks.push('ember-build');
      return Promise.resolve();
    });

    td.replace(CdvBuildTask.prototype, 'run', () => {
      tasks.push('cordova-build');
      return Promise.resolve();
    });

    td.replace(BashTask.prototype, 'run', () => {
      tasks.push('serve-bash');
      return Promise.resolve();
    });

    ServeCmd.run({});

    expect(tasks).to.deep.equal([
      'ember-build',
      'cordova-build',
      'serve-bash'
    ]);
  });
});
