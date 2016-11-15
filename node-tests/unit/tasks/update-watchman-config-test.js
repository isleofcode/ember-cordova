'use strict';

var td              = require('testdouble');
var expect          = require('../../helpers/expect');
var path            = require('path');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var Promise         = require('ember-cli/lib/ext/promise');

var WatchmanConfig  = require('../../../lib/tasks/update-watchman-config');
var fsUtils         = require('../../../lib/utils/fs-utils');

describe('Update gitignore Task', function() {
  var watchmanTask;

  beforeEach(function() {
    watchmanTask = new WatchmanConfig({
      project: mockProject.project,
      ui: mockProject.ui
    });
  });

  afterEach(function() {
    td.reset();
  });

  xit('attempts to read watchmanconfig', function() {
    var actualPath;
    var expectedPath = path.join(mockProject.project.root, '.watchmanconfig');

    td.replace(fsUtils, 'write');
    td.replace(fsUtils, 'read', function(path) {
      actualPath = path;
      return Promise.resolve();
    });

    watchmanTask.run();

    expect(actualPath).to.equal(expectedPath);
  });

  it('adds ember-cordova to existing ignore_dirs array', function() {
    var writeContents;
    var expectedWrite = '{"ignore_dirs":["tmp","dist","ember-cordova"]}';

    td.replace(fsUtils, 'read', function(path) {
      return new Promise(function(resolve) {
        resolve('\{"ignore_dirs": ["tmp", "dist"]\}');
      });
    });

    td.replace(fsUtils, 'write', function(path, contents) {
      writeContents = contents;
      return Promise.resolve();
    });

    return watchmanTask.run().then(function() {
      expect(writeContents).to.equal(expectedWrite);
    });
  });

  it('creates an ignore_dirs array if it does not exist', function() {
    var writeContents;

    td.replace(fsUtils, 'read', function(path) {
      return new Promise(function(resolve) {
        resolve('\{\}');
      });
    });

    td.replace(fsUtils, 'write', function(path, contents) {
      writeContents = contents;
      return Promise.resolve();
    });

    return watchmanTask.run().then(function() {
      expect(writeContents).to.equal('{"ignore_dirs":["ember-cordova"]}');
    });
  });
});
