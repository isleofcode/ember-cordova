'use strict';

const td            = require('testdouble');

const OpenCmd       = require('../../../lib/commands/prepare');
const OpenTask      = require('../../../lib/tasks/prepare');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');

describe('Open Command', () => {
  beforeEach(() => {
    OpenCmd.ui = mockProject.ui;
    OpenCmd.project = mockProject.project;
  });

  afterEach(() => {
    td.reset();
  });

  it('runs Open App Task', () => {
    let openDouble = td.replace(OpenTask.prototype, 'run');
    OpenCmd.run();
    td.verify(openDouble());
  });
});
