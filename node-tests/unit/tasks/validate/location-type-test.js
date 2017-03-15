'use strict';

var td              = require('testdouble');
var expect          = require('../../../helpers/expect');
var mockProject     = require('../../../fixtures/ember-cordova-mock/project');
var ValidateLocType = require('../../../../lib/tasks/validate/location-type');

describe('Validate Location Type', function() {
  var validateLoc;

  beforeEach(function() {
    validateLoc = new ValidateLocType({
      project: mockProject.project
    });
  });

  afterEach(function() {
    td.reset();
  });

  it('rejects when config.locationType is not hash', function() {
    validateLoc.config = { locationType: 'auto' };
    return expect(validateLoc.run()).to.be.rejected;
  });

  it('throws an error with config.locationType is blank', function() {
    validateLoc.config = {};
    return expect(validateLoc.run()).to.be.rejected;
  });

  it('resolves if config.locationType is hash', function() {
    validateLoc.config = { locationType: 'hash' };
    return expect(validateLoc.run()).to.be.fulfilled;
  });
});
