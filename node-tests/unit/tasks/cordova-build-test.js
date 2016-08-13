'use strict';

const td            = require('testdouble');
const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const CdvRawTask    = require('../../../lib/tasks/cordova-raw');

const setupBuildTask = function() {
  const CdvBuildTask = require('../../../lib/tasks/cordova-build');
  return new CdvBuildTask(mockProject);
};

describe('Cordova Build Task', () => {
  afterEach(() => {
    td.reset();
  });

  it('creates a raw build task', () => {
    const cdvBuild = td.replace(CdvRawTask.prototype, 'run');
    let build = setupBuildTask();
    build.run('ios');

    td.verify(cdvBuild({platforms: ['ios'], options: ['--debug']}));
  });

  it('sets platform to android', () => {
    const cdvBuild = td.replace(CdvRawTask.prototype, 'run');
    let build = setupBuildTask();
    build.run('android');

    td.verify(cdvBuild({platforms: ['android'], options: ['--debug']}));
  });

  it('passes debug flag by default', () => {
    const cdvBuild = td.replace(CdvRawTask.prototype, 'run');
    let build = setupBuildTask();
    build.run('ios', false);

    td.verify(cdvBuild({platforms: ['ios'], options: ['--debug']}));
  });

  it('sets release flag when passed', () => {
    const cdvBuild = td.replace(CdvRawTask.prototype, 'run');
    let build = setupBuildTask();
    build.run('ios', true);

    td.verify(cdvBuild({platforms: ['ios'], options: ['--release']}));
  });
});
