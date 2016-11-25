'use strict';

var td              = require('testdouble');

var ui              = require('../../../lib/utils/ui');
var expect          = require('../../helpers/expect');
var Promise         = require('ember-cli/lib/ext/promise');

var BuildTask       = require('../../../lib/tasks/ember-build');
var CdvBuildTask    = require('../../../lib/tasks/cordova-build');
var HookTask        = require('../../../lib/tasks/run-hook');

var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var mockAnalytics   = require('../../fixtures/ember-cordova-mock/analytics');

var isAnything      = td.matchers.anything;

/* eslint-disable max-len */
var ValidatePlatform        = require('../../../lib/tasks/validate/platform');
var ValidateAllowNavigation = require('../../../lib/tasks/validate/allow-navigation');
var ValidateRootUrl         = require('../../../lib/tasks/validate/root-url');
/* eslint-enable max-len */

var setupBuild = function() {
  var BuildCmd = require('../../../lib/commands/build');

  var project = mockProject.project;
  project.config = function() {
    return {
      locationType: 'hash'
    };
  }

  var build = new BuildCmd({
    project: project,
    ui: mockProject.ui
  });
  build.analytics = mockAnalytics;

  return build;
};

describe('Build Command', function() {
  afterEach(function() {
    td.reset();
  });

  context('when locationType is hash', function() {
    var tasks;
    var cordovaPlatform;

    beforeEach(function() {
      mockTasks();
    });

    function mockTasks() {
      tasks = [];

      td.replace(ValidatePlatform.prototype, 'run', function() {
        tasks.push('validate-platform');
        return Promise.resolve();
      });

      td.replace(ValidateAllowNavigation.prototype, 'run', function() {
        tasks.push('validate-allow-navigation');
        return Promise.resolve();
      });

      td.replace(ValidateRootUrl.prototype, 'run', function() {
        tasks.push('validate-root-url');
        return Promise.resolve();
      });

      td.replace(HookTask.prototype, 'run', function(hookName) {
        tasks.push('hook ' + hookName);
        return Promise.resolve();
      });

      td.replace(BuildTask.prototype, 'run', function() {
        tasks.push('ember-build');
        return Promise.resolve();
      });

      td.replace(CdvBuildTask.prototype, 'run', function() {
        cordovaPlatform = this.platform;

        tasks.push('cordova-build');
        return Promise.resolve();
      });
    }

    it('exits cleanly', function() {
      var build = setupBuild();

      return expect(function() {
        build.run({});
      }).not.to.throw(Error);
    });

    it('runs tasks in the correct order', function() {
      var build = setupBuild();

      return build.run({})
        .then(function() {
          //h-t ember-electron for the pattern
          expect(tasks).to.deep.equal([
            'validate-root-url',
            'validate-allow-navigation',
            'validate-platform',
            'hook beforeBuild',
            'ember-build',
            'cordova-build',
            'hook afterBuild'
          ]);
        });
    });

    it('skips ember-build with the --skip-ember-build flag', function() {
      var build = setupBuild();

      return build.run({skipEmberBuild: true})
        .then(function() {
          //h-t ember-electron for the pattern
          expect(tasks).to.deep.equal([
            'validate-root-url',
            'validate-allow-navigation',
            'validate-platform',
            'hook beforeBuild',
            'cordova-build',
            'hook afterBuild'
          ]);
        });
    });

    it('parses cordova build opts', function() {
      var optDouble = td.replace('../../../lib/utils/parse-cordova-build-opts');
      var build = setupBuild();

      return build.run({}).then(function() {
        td.verify(optDouble(isAnything(), isAnything()));
      });
    });

    it('passes platform to cordova build task', function() {
      var passedPlatform = 'android';
      var build = setupBuild();

      return build.run({platform: passedPlatform}).then(function() {
        expect(cordovaPlatform).to.equal(passedPlatform);
      });
    });
  });
});
