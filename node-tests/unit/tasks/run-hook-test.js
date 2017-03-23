'use strict';

var expect          = require('../../helpers/expect');
var HookTask        = require('../../../lib/tasks/run-hook');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var Promise         = require('rsvp').Promise;

describe('Run Hook Task', function() {
  it('runs a hook at the provided path', function() {
    var hookTask = new HookTask(mockProject);
    return expect(hookTask.run('hook')).to.be.fulfilled;
  });

  it('passes options to the hook', function() {
    var options = {foo: true};
    var hookTask = new HookTask(mockProject);
    var taskRun = hookTask.run('hook-with-options', options);
    return expect(taskRun).to.become(options);
  });

  it('runs a hook at the provided path that has an error', function() {
    var hookTask = new HookTask(mockProject);
    return expect(hookTask.run('hook-with-error')).to.be.rejected;
  });

  it('is resolved if the hook does not exist', function() {
    var hookTask = new HookTask(mockProject);
    return expect(hookTask.run('invalid')).to.be.fulfilled;
  });

  it('is resolved if the hook is resolved', function() {
    var hookTask = new HookTask(mockProject);
    var expectation = expect(hookTask.run('hook-promise-resolved'));
    return Promise.all([
      expectation.to.eventually.equal('resolved promise from hook'),
      expectation.to.be.fulfilled,
    ]);
  });

  it('is rejected if the hook is rejected', function() {
    var hookTask = new HookTask(mockProject);
    var expectation = expect(hookTask.run('hook-promise-rejected'));
    return Promise.all([
      expectation.to.eventually.equal('hook rejected'),
      expectation.to.be.rejected,
    ]);
  });
});
