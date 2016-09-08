'use strict';

var td              = require('testdouble');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var CdvRawTask      = require('../../../lib/tasks/cordova-raw');

const setupBuildTask = function() {
  const CdvBuildTask = require('../../../lib/tasks/cordova-build');
  return new CdvBuildTask({
    project: mockProject.project,
    ui: mockProject.ui,
    platform: 'ios'
  });
};

describe('Cordova Build Task', function() {
  afterEach(function() {
    td.reset();
  });

  it('creates a raw build task', () => {
    const cdvBuild = td.replace(CdvRawTask.prototype, 'run');
    let build = setupBuildTask();
    build.run();

    td.verify(cdvBuild({
      platforms: ['ios'],
      options: ['--debug', '--emulator']
    }));
  });

  it('sets platform to android', () => {
    const cdvBuild = td.replace(CdvRawTask.prototype, 'run');
    let build = setupBuildTask();
    build.platform = 'android';
    build.run();

    td.verify(cdvBuild({
      platforms: ['android'],
      options: ['--debug', '--emulator']
    }));
  });

  it('passes debug flag by default', () => {
    const cdvBuild = td.replace(CdvRawTask.prototype, 'run');
    let build = setupBuildTask();
    build.run();

    td.verify(cdvBuild({
      platforms: ['ios'],
      options: ['--debug', '--emulator']
    }));
  });

  it('sets release flag when passed', () => {
    const cdvBuild = td.replace(CdvRawTask.prototype, 'run');
    let build = setupBuildTask();
    build.isRelease = true;
    build.run();

    td.verify(cdvBuild({
      platforms: ['ios'],
      options: ['--release', '--emulator']
    }));
  });

  it('sets device flag when passed', () => {
    const cdvBuild = td.replace(CdvRawTask.prototype, 'run');
    let build = setupBuildTask();
    build.isEmulator = false;
    build.run();

    td.verify(cdvBuild({
      platforms: ['ios'],
      options: ['--debug', '--device']
    }));
  });
});
