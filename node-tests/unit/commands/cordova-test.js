'use strict';

const BashTask      = require('../../../lib/tasks/bash');
const CordovaCmd    = require('../../../lib/commands/cordova');
const VerifyInstall = require('../../../lib/tasks/validate/cordova-installed');

const td            = require('testdouble');
const expect        = require('../../helpers/expect');
const Promise       = require('ember-cli/lib/ext/promise');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const mockAnalytics = require('../../fixtures/ember-cordova-mock/analytics');
const isObject      = td.matchers.isA(Object);

describe('Cordova Command', () => {
  let cmd;

  beforeEach(() => {
    td.replace(VerifyInstall.prototype, 'run', () => {
      return Promise.resolve();
    });

    cmd = new CordovaCmd({
      project: mockProject.project,
      ui: mockProject.ui
    });
    cmd.analytics = mockAnalytics;
  });

  afterEach(() => {
    td.reset();
  });

  it('warns if an ember-cordova command is used', () => {
    cmd.validateAndRun(['build']);
    expect(cmd.ui.output).to.contain('bypassed ember-cordova command');
  });

  it('warns if cordova command is unknown', () => {
    cmd.validateAndRun(['foo']);
    expect(cmd.ui.output).to.contain('unknown Cordova command');
  });

  it('proxies argument commands', (done) => {
    const bashDouble = td.replace(BashTask.prototype, 'runCommand');

    cmd.validateAndRun(['plugin add foo']).then(() => {
      td.verify(bashDouble('cordova plugin add foo', isObject));
      done();
    }).catch(function(err) {
      done(err);
    });
  });
});
