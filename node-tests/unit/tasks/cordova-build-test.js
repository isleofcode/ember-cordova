'use strict';

var td              = require('testdouble');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var CdvRawTask      = require('../../../lib/tasks/cordova-raw');

var setupBuildTask = function() {
  var CdvBuildTask = require('../../../lib/tasks/cordova-build');
  return new CdvBuildTask(mockProject);
};

describe('Cordova Build Task', function() {
  afterEach(function() {
    td.reset();
  });

  it('creates a raw build task', function() {
    var cdvBuild = td.replace(CdvRawTask.prototype, 'run');
    var build = setupBuildTask();
    build.run('ios');

    td.verify(cdvBuild({platforms: ['ios'], options: ['--debug']}));
  });

  it('sets platform to android', function() {
    var cdvBuild = td.replace(CdvRawTask.prototype, 'run');
    var build = setupBuildTask();
    build.run('android');

    td.verify(cdvBuild({platforms: ['android'], options: ['--debug']}));
  });

  it('passes debug flag by default', function() {
    var cdvBuild = td.replace(CdvRawTask.prototype, 'run');
    var build = setupBuildTask();
    build.run('ios', false);

    td.verify(cdvBuild({platforms: ['ios'], options: ['--debug']}));
  });

  it('sets release flag when passed', function() {
    var cdvBuild = td.replace(CdvRawTask.prototype, 'run');
    var build = setupBuildTask();
    build.run('ios', true);

    td.verify(cdvBuild({platforms: ['ios'], options: ['--release']}));
  });
});
