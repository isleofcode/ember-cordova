'use strict';

const td            = require('testdouble');
const expect        = require('../../helpers/expect');
const Promise       = require('ember-cli/lib/ext/promise');

const PrepareCmd    = require('../../../lib/commands/prepare');
const PrepareTask   = require('../../../lib/tasks/prepare');
const HookTask      = require('../../../lib/tasks/run-hook');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');

describe('Prepare Command', () => {
  let tasks;

  beforeEach(() => {
    tasks = [];

    PrepareTask.prototype.project = mockProject;

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
    return PrepareCmd.run.call({ project: mockProject }, {})
      .then(function() {

        ////h-t ember-electron for the pattern
        expect(tasks).to.deep.equal([
          'hook beforePrepare',
          'prepare',
          'hook afterPrepare'
        ]);
      });
  });
});
