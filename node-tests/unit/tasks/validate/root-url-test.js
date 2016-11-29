'use strict';

var td              = require('testdouble');
var expect          = require('../../../helpers/expect');
var mockProject     = require('../../../fixtures/ember-cordova-mock/project');
var logger          = require('../../../../lib/utils/logger');
var contains        = td.matchers.contains;

var ValidateRoot    = require('../../../../lib/tasks/validate/root-url');

var rejectMsg =
  'Build Aborted. \n' +
  '{{rootURL}} or {{baseURL}} in app/index.html has a leading slash. \n' +
  'This will not work in cordova, and needs to be removed. \n' +
  'You can pass the --force flag to ignore this if youve otherwise handled \n' +
  'See http://embercordova.com/pages/setup_guide for more info.';

describe('Validate Root Url', function() {
  var validateRoot;

  beforeEach(function() {
    validateRoot = new ValidateRoot({
      project: mockProject.project,
      ui: mockProject.ui,
    });
  });

  afterEach(function() {
    td.reset();
  });

  it('resolves', function() {
    td.replace(validateRoot, 'validRootValues', function(path) {
      return true;
    });

    return expect(validateRoot.run(mockProject.config())).to.be.fulfilled;
  });

  it('rejects if validRootValues is false', function() {
    td.replace(validateRoot, 'validRootValues', function(path) {
      return false;
    });

    expect(
      validateRoot.run(mockProject.config())
    ).to.be.rejectedWith(rejectMsg);

  });

  it('when force is true, throws a warning vs rejection', function() {
    td.replace(validateRoot, 'validRootValues', function(path) {
      return false;
    });

    var warnDouble = td.replace(logger, 'warn');

    return validateRoot.run(mockProject.config(), true).then(function() {
      td.verify(warnDouble(contains('You have passed the --force flag')));
    })
  });

  describe('validRootValues', function() {
    it('returns false if any values lead with /', function() {
      var values = ['valid', '/invalid'];
      expect(validateRoot.validRootValues(values)).to.equal(false);
    });

    it('returns true if no values lead with /', function() {
      var values = ['valid', 'invalid'];
      expect(validateRoot.validRootValues(values)).to.equal(true);
    });
  });
});
