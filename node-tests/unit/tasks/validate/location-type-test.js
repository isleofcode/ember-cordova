'use strict';

var td              = require('testdouble');
var expect          = require('../../../helpers/expect');
var mockProject     = require('../../../fixtures/ember-cordova-mock/project');
var ValidateLocType = require('../../../../lib/tasks/validate/location-type');

describe('Validate Location Type', function() {
  var validateLoc;

  beforeEach(function() {
    validateLoc = new ValidateLocType({
      project: mockProject.project,
      ui: mockProject.ui,
    });
  });

  afterEach(function() {
    td.reset();
  });

  it('rejects when config.locationType is not hash', function() {
    var config = { locationType: 'auto' };
    expect(validateLoc.run(config)).to.be.rejected;
  });

  it('throws an error with config.locationType is blank', function() {
    var config = {};
    expect(validateLoc.run(config)).to.be.rejected;
  });

  it('resolves if config.locationType is hash', function() {
    var config = { locationType: 'hash' };
    expect(validateLoc.run(config)).to.be.fulfilled;
  });
});
