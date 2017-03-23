'use strict';

var td              = require('testdouble');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var fsUtils         = require('../../../lib/utils/fs-utils');
var Promise         = require('rsvp');

var expect          = require('../../helpers/expect');

describe('Update gitignore Task', function() {

  var createTask = function() {
    var GitIgnore = require('../../../lib/tasks/update-gitignore');
    return new GitIgnore({
      project: mockProject.project
    });
  };

  afterEach(function() {
    td.reset();
  });

  it('attempts to write ignore data to .gitignore', function() {
    var expectedGitkeep = '\n' +
      'ember-cordova/tmp-livereload\n' +
      'ember-cordova/cordova/www/*\n' +
      '!ember-cordova/cordova/www/.gitkeep\n' +
      'ember-cordova/cordova/plugins/*\n' +
      '!ember-cordova/cordova/plugins/.gitkeep\n' +
      'ember-cordova/cordova/platforms/*\n' +
      '!ember-cordova/cordova/platforms/.gitkeep\n'

    var writePath, writeContent = undefined;
    td.replace(fsUtils, 'append', function(path, content) {
      writePath = path;
      writeContent = content;
      return Promise.resolve();
    });

    var task = createTask();

    return task.run().then(function() {
      expect(writeContent).to.equal(expectedGitkeep);
      expect(writePath).to.equal('.gitignore');
    });
  });

  it('stubs empty gitkeeps', function() {
    var calls = [];
    td.replace(fsUtils, 'write', function(path) {
      calls.push(path);
      return;
    });

    var task = createTask();
    return task.run().then(function() {
      expect(calls).to.deep.equal([
        'ember-cordova/cordova/www/.gitkeep',
        'ember-cordova/cordova/plugins/.gitkeep',
        'ember-cordova/cordova/platforms/.gitkeep'
      ]);
    });
  });

  it('outputs an error message and resolves if write fails', function() {
    td.replace(fsUtils, 'append', function() {
      return Promise.reject();
    });
    var task = createTask();

    return expect(task.run()).to.be.rejectedWith(
      /failed to update \.gitignore/
    );
  });
});
