'use strict';

const td            = require('testdouble');
const PromiseExt    = require('ember-cli/lib/ext/promise');

const OpenCmd       = require('../../../lib/commands/open');
const OpenTask      = require('../../../lib/tasks/open-app');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');

describe('Open Command', () => {
  beforeEach(() => {
    OpenTask.prototype.project = mockProject;
    OpenCmd.ui = mockProject.ui;
    OpenCmd.project = mockProject.project;

    td.replace(
      OpenTask.prototype,
      'run',
      function() { return PromiseExt.resolve(); }
    );
  });

  afterEach(() => {
    OpenTask.prototype.project = undefined;
    td.reset();
  });

  it('runs Open App Task', () => {
    var options =  { application: 'dummy', platform: 'ios' };

    return OpenCmd.run.call({ project: mockProject }, options)
      .then(function() { return true; });
  });
});
