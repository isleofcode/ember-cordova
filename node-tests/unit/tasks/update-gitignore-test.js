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
    td.replace(fs, 'closeSync');
    td.replace(fs, 'openSync');

    var expectedGitkeep = '\n' +
      'ember-cordova/cordova/www/*\n' +
      '!ember-cordova/cordova/www/.gitkeep\n' +
      'ember-cordova/cordova/plugins/*\n' +
      '!ember-cordova/cordova/plugins/.gitkeep\n' +
      'ember-cordova/cordova/platforms/*\n' +
      '!ember-cordova/cordova/platforms/.gitkeep\n'

    var appendDouble = td.replace(fs, 'appendFileSync');
    var task = createTask();
    task.run();

    td.verify(appendDouble('.gitignore', expectedGitkeep));
  });

  it('stubs empty gitkeeps', function() {
    var openDouble = td.replace(fs, 'openSync');
    td.replace(fs, 'closeSync');

    var task = createTask();
    task.run();

    td.verify(openDouble('ember-cordova/cordova/www/.gitkeep', 'w'));
    td.verify(openDouble('ember-cordova/cordova/platforms/.gitkeep', 'w'));
    td.verify(openDouble('ember-cordova/cordova/plugins/.gitkeep', 'w'));
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
