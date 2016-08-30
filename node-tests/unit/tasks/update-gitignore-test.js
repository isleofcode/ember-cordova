'use strict';

var td              = require('testdouble');
var fs              = require('fs');
var expect          = require('../../helpers/expect');
var GitIgnore       = require('../../../lib/tasks/update-gitignore');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');

describe('Update gitignore Task', function() {
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
    td.replace(fs, 'appendFileSync', function() {
      throw new Error();
    });
    var task = createTask();
    task.run();

    expect(task.ui.output).to.contain('failed to update .gitignore');
  });
});
