'use strict';

var td              = require('testdouble');
var expect          = require('../../../helpers/expect');
var Promise         = require('rsvp');

var PlatformTask    = require('../../../../lib/tasks/validate/platform');
var mockProject     = require('../../../fixtures/ember-cordova-mock/project');
var CordovaValidator = require('../../../../lib/utils/cordova-validator');

describe('Validate Platform Tasks', function() {
  var tasks, validatePlatform;

  afterEach(function() {
    td.reset();
  });

  beforeEach(function() {
    tasks = [];
    validatePlatform = new PlatformTask({
      project: mockProject.project,
      platform: 'ios'
    });

    mockTasks();
  });

  function mockTasks() {
    td.replace(CordovaValidator.prototype, 'validateCordovaConfig', function() {
      tasks.push('validate-cordova-config');
      return Promise.resolve();
    });

    td.replace(CordovaValidator.prototype, 'validateCordovaJSON', function() {
      tasks.push('validate-cordova-json');
      return Promise.resolve();
    });

    td.replace(CordovaValidator.prototype, 'validateDirExists', function() {
      tasks.push('validate-dir');
      return Promise.resolve();
    });
  }

  it('runs validations in the correct order', function() {
    var validatePlatform = new PlatformTask({
      project: mockProject.project,
      platform: 'ios'
    });

    return validatePlatform.run()
    .then(function() {
      expect(tasks).to.deep.equal([
        'validate-cordova-config',
        'validate-cordova-json',
        'validate-dir'
      ]);
    });
  });

  context('validator object', function() {
    var validator;

    beforeEach(function() {
      validator = validatePlatform.createValidator();
    });

    it('sets type to platform', function() {
      expect(validator.type).to.equal('platform');
    });

    it('sets dir to platforms/', function() {
      expect(validator.dir).to.equal('platforms/');
    });

    it('sets correct fetch json path', function() {
      expect(validator.jsonPath).to.equal('platforms/platforms.json');
    });
  });
});
