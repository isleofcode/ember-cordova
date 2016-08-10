'use strict';

const expect        = require('../../helpers/expect');
const td            = require('testdouble');
const fs            = require('fs');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const CordovaValidator = require('../../../lib/utils/cordova-validator');

describe('Cordova Validator', () => {
  let validator;

  beforeEach(() => {
    td.replace(CordovaValidator.prototype, 'throwError');

    validator = new CordovaValidator({
      project: mockProject.project,
      platform: 'ios',
      desiredKeyName  : 'cordova-test-plugin',
      type: 'plugin',
      dir: 'plugins/',
      jsonPath: 'plugins/fetch.json'
    });
  });

  afterEach(() => {
    td.reset();
  });

  context('validateCordovaConfig', () => {
    it('fulfills when config.xml holds the key', () => {
      return expect(
        validator.validateCordovaConfig()
      ).to.eventually.be.fulfilled;
    });

    it('rejects when config.xml does not hold the key', () => {
      validator.desiredKeyName = 'i-dont-exist';
      return expect(
        validator.validateCordovaConfig()
      ).to.eventually.be.rejected;
    });
  });

  context('validateCordovaJSON', () => {
    it('fulfills when key is in json file', () => {
      return expect(validator.validateCordovaJSON()).to.eventually.be.fulfilled;
    });

    it('rejects when key is not in json file', () => {
      validator.desiredKeyName = 'i-dont-exist';
      return expect(validator.validateCordovaJSON()).to.eventually.be.rejected;
    });
  });

  context('validatePluginJSON', () => {
    it('fulfills when key is in plugin json file', () => {
      return expect(validator.validatePluginJSON()).to.eventually.be.fulfilled;
    });

    it('rejects when key is not in plugin json file', () => {
      validator.desiredKeyName = 'i-dont-exist';
      return expect(validator.validatePluginJSON()).to.eventually.be.rejected;
    });
  });

  context('validateDirExists', () => {
    it('fulfills when plugin dir exists', () => {
      td.replace(fs, 'existsSync', function() {
        return true;
      });

      return expect(validator.validateDirExists()).to.eventually.be.fulfilled;
    });

    it('rejects when plugin dir does not exist', () => {
      td.replace(fs, 'existsSync', function() {
        return false;
      });

      return expect(validator.validateDirExists()).to.eventually.be.rejected;
    });
  });
});

