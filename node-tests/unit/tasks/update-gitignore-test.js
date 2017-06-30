'use strict';

var td              = require('testdouble');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var fsUtils         = require('../../../lib/utils/fs-utils');
var Promise         = require('rsvp');

var expect          = require('../../helpers/expect');

describe('Update gitignore Task', function() {
  var expectedGitkeep = '';

  var createTask = function(ignoreStub) {
    td.replace(fsUtils, 'read', function() {
      return Promise.resolve(ignoreStub);
    });

    var GitIgnore = require('../../../lib/tasks/update-gitignore');
    return new GitIgnore({
      project: mockProject.project
    });
  };

  beforeEach(function() {
    expectedGitkeep = '\n' +
      'ember-cordova/tmp-livereload\n' +
      'ember-cordova/cordova/www/*\n' +
      '!ember-cordova/cordova/www/.gitkeep\n' +
      'ember-cordova/cordova/plugins/*\n' +
      '!ember-cordova/cordova/plugins/.gitkeep\n' +
      'ember-cordova/cordova/platforms/*\n' +
      '!ember-cordova/cordova/platforms/.gitkeep';
  });

  afterEach(function() {
    td.reset();
  });

  it('attempts to write ignore data to .gitignore', function() {
    var writeContent;

    td.replace(fsUtils, 'write', function(path, content) {
      writeContent = content;
      return Promise.resolve();
    });

    var task = createTask('');
    return task.run().then(function() {
      expect(writeContent).to.equal(expectedGitkeep);
    });
  });

  it('stubs empty gitkeeps, and then writes gitkeep', function() {
    var calls = [];
    td.replace(fsUtils, 'write', function(path, content) {
      calls.push(path);
      return;
    });

    var task = createTask();
    return task.run().then(function() {
      expect(calls).to.deep.equal([
        'ember-cordova/cordova/www/.gitkeep',
        'ember-cordova/cordova/plugins/.gitkeep',
        'ember-cordova/cordova/platforms/.gitkeep',
        '.gitignore'
      ]);
    });
  });

  it('does not clear existing content', function() {
    var writeContent;

    td.replace(fsUtils, 'write', function(path, content) {
      writeContent = content;
      return Promise.resolve();
    });

    var task = createTask('dist/');
    return task.run().then(function() {
      expect(writeContent).to.equal('dist/' + expectedGitkeep);
    });
  });

  it('does not duplicate content', function() {
    var writeContent;

    td.replace(fsUtils, 'write', function(path, content) {
      if (path === '.gitignore') {
        writeContent = content;
      }
      return Promise.resolve();
    });

    var expected = 'dist/' + expectedGitkeep;
    var task = createTask(expected);
    return task.run().then(function() {
      expect(writeContent).to.equal(expected);
    });
  });

  it('outputs an error message and resolves if write fails', function() {
    td.replace(fsUtils, 'write', function() {
      return Promise.reject();
    });
    var task = createTask();

    return expect(task.run()).to.be.rejectedWith(
      /failed to update \.gitignore/
    );
  });
});
