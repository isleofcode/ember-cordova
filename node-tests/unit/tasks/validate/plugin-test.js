'use strict';

var td              = require('testdouble');
var expect          = require('../../../helpers/expect');
var Promise         = require('ember-cli/lib/ext/promise');

var PluginTask      = require('../../../../lib/tasks/validate/plugin');
var mockProject     = require('../../../fixtures/ember-cordova-mock/project');
var CordovaValidator = require('../../../../lib/utils/cordova-validator');

describe('Validate Plugin Tasks', function() {
  var tasks, validatePlugin;

  afterEach(function() {
    td.reset();
  });

  beforeEach(function() {
    tasks = [];

    validatePlugin = new PluginTask({
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

    td.replace(CordovaValidator.prototype, 'validatePluginJSON', function() {
      tasks.push('validate-plugin-json');
      return Promise.resolve();
    });

    td.replace(CordovaValidator.prototype, 'validateDirExists', function() {
      tasks.push('validate-dir');
      return Promise.resolve();
    });
  }

  it('runs validations in the correct order', function() {
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

    beforeEach(function() {
      validator = validatePlugin.createValidator();
    });

    it('sets type to plugin', function() {
      expect(validator.type).to.equal('plugin');
    });

    it('sets dir to plugins/', function() {
      expect(validator.dir).to.equal('plugins/');
    });

    it('sets correct fetch json path', function() {
      expect(validator.jsonPath).to.equal('plugins/fetch.json');
    });
  });
});
