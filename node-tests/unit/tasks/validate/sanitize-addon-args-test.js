'use strict';

/* eslint-disable max-len */
var td              = require('testdouble');
var expect          = require('../../../helpers/expect');
var mockProject     = require('../../../fixtures/ember-cordova-mock/project');
var SanitizeArgs    = require('../../../../lib/tasks/validate/sanitize-addon-args');
/* eslint-enable max-len */

describe('Sanitize Cordova Args Test', function() {
  afterEach(function() {
    td.reset();
  });

  function setupTask() {
    return new SanitizeArgs({
      project: mockProject.project,
      ui: mockProject.ui,
      api: 'plugin'
    });
  }

  context('getAction', function() {
    var rawArgs = ['cordova', 'platform', 'foo'];

    it('returns add for any addCmds', function() {
      var validator = setupTask();
      var addCmds = ['add', 'a'];

      var count = addCmds.length;
      while (count--) {
        var args = rawArgs.concat(addCmds[count]);
        var command = validator.getAction(args);
        expect(command).to.equal('add');
      }
    });

    it('returns remove for any removeCmds', function() {
      var validator = setupTask();
      var rmCmds = ['remove', 'rm', 'r'];

      var count = rmCmds.length;
      while (count--) {
        var args = rawArgs.concat(rmCmds[count]);
        var command = validator.getAction(args);
        expect(command).to.equal('remove');
      }
    });
  });

  context('with invalid add/remove flags', function() {
    beforeEach(function() {
      td.replace(SanitizeArgs.prototype, 'getAction', function() {
        return
      });
    });

    it('rejects the promise & warns if command is undefined', function() {
      var validator = setupTask();
      return expect(validator.run()).to.eventually.be.rejected;
    });

    it('rejects the promise & warns if command is undefined', function() {
      var validator = setupTask();
      return validator.run().catch(function(err) {
        expect(err).to.include('Missing add/rm flag');
      });
    });
  });

  context('sanitized hash', function() {
    it('returns a target name (e.g. ios, plugn-camera)', function() {
      var args = ['add', 'cordova-plugin-foo'];
      var validator = setupTask();
      validator.rawArgs = args;

      return expect(validator.run()).to.eventually
        .have.property('name')
        .and.equal('cordova-plugin-foo');
    });

    it('returns an action property', function() {
      var args = ['add', 'cordova-plugin-foo'];
      var validator = setupTask();
      validator.rawArgs = args;

      return expect(validator.run()).to.eventually
        .have.property('action')
        .and.equal('add');
    });

    it('returns --variables formatted to cordova spec', function() {
      var args = ['add', 'cordova-plugin-foo'];
      var validator = setupTask();
      validator.rawArgs = args;
      validator.varOpts = ['APP_ID=FOO', 'APP_NAME=FOO'];

      return expect(validator.run()).to.eventually
        .have.deep.property('varOpts.APP_ID')
        .and.equal('FOO');
    });
  });
});
