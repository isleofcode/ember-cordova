'use strict';

var BashTask      = require('../../../lib/tasks/bash');
var CordovaCmd    = require('../../../lib/commands/cordova');
var VerifyInstall = require('../../../lib/tasks/validate/cordova-installed');

var td            = require('testdouble');
var expect        = require('../../helpers/expect');
var Promise       = require('ember-cli/lib/ext/promise');

var mockProject   = require('../../fixtures/ember-cordova-mock/project');
var mockAnalytics = require('../../fixtures/ember-cordova-mock/analytics');
var isObject      = td.matchers.isA(Object);

describe('Cordova Command', function() {
  var cmd;

  beforeEach(function() {
    td.replace(VerifyInstall.prototype, 'run', function() {
      return Promise.resolve();
    });

    cmd = new CordovaCmd({
      project: mockProject.project,
      ui: mockProject.ui
    });
    cmd.analytics = mockAnalytics;
  });

  afterEach(function() {
    td.reset();
  });

  it('warns if an ember-cordova command is used', function() {
    cmd.validateAndRun(['build']);
    expect(cmd.ui.output).to.contain('bypassed ember-cordova command');
  });

  it('warns if cordova command is unknown', function() {
    cmd.validateAndRun(['foo']);
    expect(cmd.ui.output).to.contain('unknown Cordova command');
  });

  it('proxies argument commands', (done) => {
    var bashDouble = td.replace(BashTask.prototype, 'runCommand');

    cmd.validateAndRun(['plugin add foo']).then(function() {
      td.verify(bashDouble('cordova plugin add foo', isObject));
      done();
    }).catch(function(err) {
      done(err);
    });
  });
});
