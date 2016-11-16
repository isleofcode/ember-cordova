'use strict';

var td              = require('testdouble');
var expect          = require('../../../helpers/expect');
var path            = require('path');
var mockProject     = require('../../../fixtures/ember-cordova-mock/project');
var Promise         = require('ember-cli/lib/ext/promise');

var ValidateIndex   = require('../../../../lib/tasks/validate/ember-index');
var fsUtils         = require('../../../../lib/utils/fs-utils');

describe('Validate Ember Index Task', function() {
  var validateIndex;

  beforeEach(function() {
    validateIndex = new ValidateIndex({
      project: mockProject.project,
      ui: mockProject.ui,
    });
  });

  afterEach(function() {
    td.reset();
  });

  it('resolves', function() {
    td.replace(fsUtils, 'read', function() {
      return Promise.resolve('');
    });

    return expect(validateIndex.run()).to.be.fulfilled;
  });

  it('attempts to read app/index.html', function() {
    var actualPath;
    var expectedPath = path.join(mockProject.project.root, 'app/index.html');

    td.replace(fsUtils, 'read', function(path) {
      actualPath = path;
      return Promise.resolve();
    });

    validateIndex.run();

    expect(actualPath).to.equal(expectedPath);
  });

  it('rejects on fs errors', function() {
    td.replace(fsUtils, 'read', function(path) {
      return Promise.reject();
    });

    return expect(validateIndex.run()).to.be.rejected;
  });

  it('runs invalidIndex if {{rootURL}} is included', function() {
    td.replace(fsUtils, 'read', function(path) {
      return Promise.resolve('index with {{rootURL}}');
    });

    validateIndex.invalidIndex = td.function();
    return validateIndex.run().then(function() {
      td.verify(validateIndex.invalidIndex());
    })
  });

  it('runs invalidIndex if {{baseURL}} is included', function() {
    td.replace(fsUtils, 'read', function(path) {
      return Promise.resolve('index with {{baseURL}}');
    });

    validateIndex.invalidIndex = td.function();
    return validateIndex.run().then(function() {
      td.verify(validateIndex.invalidIndex());
    })
  });

  it('when force is true, throws a warning vs rejection', function() {
    td.replace(fsUtils, 'read', function(path) {
      return Promise.resolve('index with {{rootURL}}');
    });

    return validateIndex.run(true).then(function() {
      expect(validateIndex.ui.output).to.contain('Build Warning');
    })
  });

  it('invalidIndex rejects with an error', function() {
    return expect(validateIndex.invalidIndex()).to.be.rejectedWith(
      /Youve defined \{\{rootURL\}\} or \{\{baseURL\}\} in app\/index\.html/
    );
  });
});
