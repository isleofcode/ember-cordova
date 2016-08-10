'use strict';

const td            = require('testdouble');
const expect        = require('../../helpers/expect');
const Promise       = require('ember-cli/lib/ext/promise');

const PluginTask    = require('../../../lib/tasks/validate-plugin');
const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const CordovaValidator = require('../../../lib/utils/cordova-validator');

describe('Validate Plugin Tasks', () => {
  let tasks, validatePlugin;

  afterEach(() => {
    td.reset();
  });

  beforeEach(() => {
    tasks = [];

    validatePlugin = new PluginTask({
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

    td.replace(CordovaValidator.prototype, 'validatePluginJSON', () => {
      tasks.push('validate-plugin-json');
      return Promise.resolve();
    });

    td.replace(CordovaValidator.prototype, 'validateDirExists', () => {
      tasks.push('validate-dir');
      return Promise.resolve();
    });
  }

  it('runs validations in the correct order', () => {
    return validatePlugin.run()
    .then(function() {
      expect(tasks).to.deep.equal([
        'validate-cordova-config',
        'validate-cordova-json',
        'validate-plugin-json',
        'validate-dir'
      ]);
    });
  });

  context('validator object', function() {
    var validator;

    beforeEach(() => {
      validator = validatePlugin.createValidator();
    });

    it('sets type to plugin', () => {
      expect(validator.type).to.equal('plugin');
    });

    it('sets dir to plugins/', () => {
      expect(validator.dir).to.equal('plugins/');
    });

    it('sets correct fetch json path', () => {
      expect(validator.jsonPath).to.equal('plugins/fetch.json');
    });
  });
});
