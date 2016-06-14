'use strict';

const td           = require('testdouble');
const BashTask     = require('../../../lib/tasks/bash');
const CordovaTask  = require('../../../lib/tasks/cordova');

const mockProject  = require('../../fixtures/ember-cordova-mock/project');
const isObject     = td.matchers.isA(Object);

describe('Cordova Task', () => {
  let bashDouble, cordovaCmd;

  beforeEach(() => {
    bashDouble = td.replace(BashTask.prototype, 'runCommand');

    cordovaCmd = new CordovaTask(mockProject);
  });

  afterEach(() => {
    td.reset();
  });

  it('proxies the command to cordova', () => {
    cordovaCmd.rawArgs = ['prepare'];
    cordovaCmd.run();

    td.verify(bashDouble('cordova prepare', isObject));
  });

  it('proxies multi argument commands', () => {
    cordovaCmd.rawArgs = ['plugin add foo'];
    cordovaCmd.run();

    td.verify(bashDouble('cordova plugin add foo', isObject));
  });
});

