'use strict';

var td              = require('testdouble');
var childProcess    = require('child_process');
var BashTask        = require('../../../lib/tasks/bash');

var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var defaults        = require('lodash').defaults;
var isObject        = td.matchers.isA(Object);

describe('Bash Task', function() {
  var execDouble, bashCmd;

  beforeEach(function() {
    execDouble = td.replace(childProcess, 'execSync');

    bashCmd = new BashTask(defaults(mockProject, {
      command: 'foo'
    }));
  });

  afterEach(function() {
    td.reset();
  });

  it('attempts to exec cmd', function() {
    bashCmd.run();

    td.verify(execDouble('foo', isObject));
  });
});
