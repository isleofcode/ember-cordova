'use strict';

const td            = require('testdouble');
const expect        = require('../../helpers/expect');
const Promise       = require('ember-cli/lib/ext/promise');

const PrepareCmd    = require('../../../lib/commands/prepare');
const PrepareTask   = require('../../../lib/tasks/prepare');
const HookTask      = require('../../../lib/tasks/run-hook');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const mockAnalytics = require('../../fixtures/ember-cordova-mock/analytics');

describe('Prepare Command', () => {
  let tasks, prepare;

  beforeEach(() => {
    tasks = [];

    prepare = new PrepareCmd({
      project: mockProject.project
    });
    prepare.analytics = mockAnalytics;

    td.replace(PrepareTask.prototype, 'run', (hookName) => {
      tasks.push('prepare');
    });

    td.replace(HookTask.prototype, 'run',  (hookName) => {
      tasks.push('hook ' + hookName);
      return Promise.resolve();
    });
  });

  afterEach(() => {
    PrepareTask.prototype.project = undefined;

    td.reset();
  });

  it('runs tasks in the correct order', () => {
    return prepare.run().then(function() {
      ////h-t ember-electron for the pattern
      expect(tasks).to.deep.equal([
        'hook beforePrepare',
        'prepare',
        'hook afterPrepare'
      ]);
    });
  });
});
