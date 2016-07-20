'use strict';

const td            = require('testdouble');

const OpenCmd       = require('../../../lib/commands/open');
const OpenTask      = require('../../../lib/tasks/open-app');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');

describe('Open Command', () => {
  beforeEach(() => {
    OpenTask.prototype.project = mockProject;
    OpenCmd.ui = mockProject.ui;
    OpenCmd.project = mockProject.project;
  });

  afterEach(() => {
    OpenTask.prototype.project = undefined;
    td.reset();
  });

  it('runs Open App Task', () => {
    let openDouble = td.replace(OpenTask.prototype, 'run', function() { return Promise.resolve(); });

    return OpenCmd.run.call({ project: mockProject }, { application: 'dummy', platform: 'ios' })
      .then(function() {
        td.verify(openDouble());
      });
  });
});
