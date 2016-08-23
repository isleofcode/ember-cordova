'use strict';

const td            = require('testdouble');
const fs            = require('fs');
const expect        = require('../../helpers/expect');
const GitIgnore     = require('../../../lib/tasks/update-gitignore');
const mockProject   = require('../../fixtures/ember-cordova-mock/project');

describe('Update gitignore Task', () => {
  beforeEach(function() {
    td.reset();
  });

  var createTask = function() {
    return new GitIgnore({
      project: mockProject.project,
      ui: mockProject.ui
    });
  };

  it('attempts to write ignore data to .gitignore', function() {
    var appendDouble = td.replace(fs, 'appendFileSync');
    var task = createTask();
    task.run();

    td.verify(appendDouble('.gitignore', task.ignoreContent));
  });

  it('outputs an error message and resolves if write fails', function() {
    var appendDouble = td.replace(fs, 'appendFileSync', function() {
      throw new Error();
    });
    var task = createTask();
    task.run();

    expect(task.ui.output).to.contain('failed to update .gitignore');
  });
});
