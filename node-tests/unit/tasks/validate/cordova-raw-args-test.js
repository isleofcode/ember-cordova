'use strict';

/* eslint-disable max-len */
var td              = require('testdouble');
var expect          = require('../../../helpers/expect');
var mockProject     = require('../../../fixtures/ember-cordova-mock/project');
var ValidateArgs    = require('../../../../lib/tasks/validate/cordova-raw-args');
/* eslint-enable max-len */

describe('Validate Cordova Args Test', function() {
  afterEach(function() {
    td.reset();
  });

  function setupTask() {
    return new ValidateArgs({
      project: mockProject.project,
      ui: mockProject.ui
    });
  }

  context('getCommand', function() {
    var rawArgs = ['cordova', 'platform', 'foo'];

    it('returns add for any addCmds', function() {
      var validator = setupTask();
      var addCmds = ['add', 'a'];

      var count = addCmds.length;
      while (count--) {
        var args = rawArgs.concat(addCmds[count]);
        var command = validator.getCommand(args);
        expect(command).to.equal('add');
      }
    });

    it('returns remove for any removeCmds', function() {
      var validator = setupTask();
      var rmCmds = ['remove', 'rm', 'r'];

      var count = rmCmds.length;
      while (count--) {
        var args = rawArgs.concat(rmCmds[count]);
        var command = validator.getCommand(args);
        expect(command).to.equal('remove');
      }
    });
  });

  context('with invalid add/remove flags', function() {
    beforeEach(function() {
      td.replace(ValidateArgs.prototype, 'getCommand', function() {
        return
      });
    });

    it('rejects the promise & warns if command is undefined', function() {
      var validator = setupTask();
      return expect(validator.run([])).to.eventually.be.rejected;
    });

    it('rejects the promise & warns if command is undefined', function() {
      var validator = setupTask();
      return validator.run([]).catch(function() {
        expect(validator.ui.output).to.include('Missing add or remove flag');
      });
    });
  });

  it('removes any add/rm flags from the validatedCommand args', function() {
    var args = ['plugin', 'add', 'cordova-plugin-foo'];
    var validator = setupTask();

    return expect(validator.run(args)).to.eventually
      .have.property('args')
      .and.deep.equal(['plugin', 'cordova-plugin-foo']);
  });

  it('adds the action(command) to validatedCommand', function() {
    var args = ['plugin', 'add', 'cordova-plugin-foo'];
    var validator = setupTask();

    return expect(validator.run(args)).to.eventually
      .have.property('command')
      .and.equal('add');
  });
});
