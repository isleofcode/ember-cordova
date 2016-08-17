'use strict';

const td            = require('testdouble');
const expect        = require('../../../helpers/expect');
const Promise       = require('ember-cli/lib/ext/promise');

const PlatformTask  = require('../../../../lib/tasks/validate/platform');
const mockProject   = require('../../../fixtures/ember-cordova-mock/project');
const CordovaValidator = require('../../../../lib/utils/cordova-validator');

describe('Validate Platform Tasks', () => {
  let tasks, validatePlatform;

  afterEach(() => {
    td.reset();
  });

  beforeEach(() => {
    tasks = [];
    validatePlatform = new PlatformTask({
      project: mockProject.project,
      platform: 'ios'
    });

    mockTasks();
  });

  function mockTasks() {
    td.replace(CordovaValidator.prototype, 'validateCordovaConfig', () => {
      tasks.push('validate-cordova-config');
      return Promise.resolve();
    });

    td.replace(CordovaValidator.prototype, 'validateCordovaJSON', () => {
      tasks.push('validate-cordova-json');
      return Promise.resolve();
    });

    td.replace(CordovaValidator.prototype, 'validateDirExists', () => {
      tasks.push('validate-dir');
      return Promise.resolve();
    });
  }

  it('runs validations in the correct order', () => {
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

    beforeEach(() => {
      validator = validatePlatform.createValidator();
    });

    it('sets type to platform', () => {
      expect(validator.type).to.equal('platform');
    });

    it('sets dir to platforms/', () => {
      expect(validator.dir).to.equal('platforms/');
    });

    it('sets correct fetch json path', () => {
      expect(validator.jsonPath).to.equal('platforms/platforms.json');
    });
  });
});
