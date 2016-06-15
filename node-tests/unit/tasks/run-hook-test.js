'use strict';

const expect        = require('../../helpers/expect');
const HookTask      = require('../../../lib/tasks/run-hook');
const mockProject   = require('../../fixtures/ember-cordova-mock/project');

describe('Run Hook Task', () => {
  it('runs a hook at the provided path', () => {
    let hookTask = new HookTask(mockProject);
    expect(hookTask.run('hook')).to.be.fulfilled;
  });

  it('is rejected if the hook does not exist', () => {
    let hookTask = new HookTask(mockProject);
    expect(hookTask.run('invalid')).to.be.rejected;
  });
});
