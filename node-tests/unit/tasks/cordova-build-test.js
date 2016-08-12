'use strict';

const td            = require('testdouble');
const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const isObject      = td.matchers.isA(Object);

const setupBuildTask = function() {
  const CdvBuildTask = require('../../../lib/tasks/cordova-build');
  return new CdvBuildTask(mockProject);
};

describe('Cordova Build Task', () => {
  afterEach(() => {
    td.reset();
  });

  it('generates a cordova build command', () => {
    const cdvBuild = td.replace('cordova-lib/src/cordova/build');
    let build = setupBuildTask();
    build.run('ios');

    var match = td.matchers.contains({platforms: ['ios']});
    td.verify(cdvBuild(match, isObject));
  });

  it('sets platform to android', () => {
    const cdvBuild = td.replace('cordova-lib/src/cordova/build');
    let build = setupBuildTask();
    build.run('android');

    var match = td.matchers.contains({platforms: ['android']});
    td.verify(cdvBuild(match, isObject));
  });

  it('passes debug flag by default', () => {
    const cdvBuild = td.replace('cordova-lib/src/cordova/build');
    let build = setupBuildTask();
    build.run('ios', false);

    var match = td.matchers.contains({options: ['--debug']});
    td.verify(cdvBuild(match, isObject));
  });

  it('sets release flag when passed', () => {
    const cdvBuild = td.replace('cordova-lib/src/cordova/build');
    let build = setupBuildTask();
    build.run('ios', true);

    var match = td.matchers.contains({options: ['--release']});
    td.verify(cdvBuild(match, isObject));
  });

  it('proxies via cordova run', () => {
    const cordovaRun = td.replace('../../../lib/utils/cordova-run');
    let build = setupBuildTask();

    build.run();
    td.verify(cordovaRun(isObject, isObject, isObject));
  });
});
