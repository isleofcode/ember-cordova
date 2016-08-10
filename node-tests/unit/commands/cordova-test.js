'use strict';

const BashTask      = require('../../../lib/tasks/bash');
const td            = require('testdouble');
const expect        = require('../../helpers/expect');
const Promise       = require('ember-cli/lib/ext/promise');

td.replace('../../../lib/tasks/verify-cordova-installed', function() {
  return {
    run: function() {
      return new Promise(function(resolve) {
        resolve();
      });
    }
  }
});

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const isObject      = td.matchers.isA(Object);

const setupCordovaCmd = function() {
  const CordovaCmd = require('../../../lib/commands/cordova');

  CordovaCmd.ui = mockProject.ui;
  CordovaCmd.project = mockProject.project;
  return CordovaCmd;
};

describe('Cordova Command', () => {
  afterEach(() => {
    td.reset();
  });

  it('warns if an ember-cordova command is used', () => {
    let cmd = setupCordovaCmd();
    cmd.validateAndRun(['build']);
    expect(cmd.ui.output).to.contain('bypassed ember-cordova command');
  });

  it('warns if cordova command is unknown', () => {
    let cmd = setupCordovaCmd();
    cmd.validateAndRun(['foo']);
    expect(cmd.ui.output).to.contain('unknown Cordova command');
  });

  it('proxies argument commands', () => {
    const bashDouble = td.replace(BashTask.prototype, 'runCommand');
    let cmd = setupCordovaCmd();

    return cmd.validateAndRun(['plugin add foo']).then(() => {
      td.verify(bashDouble('cordova plugin add foo', isObject));
    });
  });
});
