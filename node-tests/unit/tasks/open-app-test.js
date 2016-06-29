'use strict';

const td            = require('testdouble');
const path          = require('path');
const BashTask      = require('../../../lib/tasks/bash');
const OpenAppTask   = require('../../../lib/tasks/open-app');
const MockUI        = require('ember-cli/tests/helpers/mock-ui');
const expect        = require('../../helpers/expect');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const isObject      = td.matchers.isA(Object);

describe('Open App Task', () => {
  let bashDouble, openApp, cdvPath;

  beforeEach(() => {
    bashDouble = td.replace(BashTask.prototype, 'runCommand');
    cdvPath = path.resolve(__dirname, '..', '..', 'fixtures', 'ember-cordova-mock/ember-cordova/cordova');

    openApp = new OpenAppTask(mockProject);
  });

  afterEach(() => {
    td.reset();
  });

  it('runs open command for ios', () => {
    openApp.run();
    const expectedCmd = `open ${cdvPath}/platforms/ios/*.xcodeproj`;
    td.verify(bashDouble(expectedCmd, isObject));
  });

  it('runs open command for Android', () => {
    openApp.platform = 'android';
    openApp.run();

    const expectedCmd = `open ${cdvPath}/platforms/android/.project`;
    td.verify(bashDouble(expectedCmd, isObject));
  }),

  it('outputs an error if no platform is specified', () => {
    openApp.platform = 'invalidPlatform';
    openApp.run();

    expect(openApp.ui.output).to.contain('platform is not supported');
  });
});
