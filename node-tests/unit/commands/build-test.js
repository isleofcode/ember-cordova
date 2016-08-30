'use strict';

var td              = require('testdouble');

var ui              = require('../../../lib/utils/ui');
var expect          = require('../../helpers/expect');
var Promise         = require('ember-cli/lib/ext/promise');

var BuildCmd        = require('../../../lib/commands/build');
var BuildTask       = require('../../../lib/tasks/ember-build');
var CdvBuildTask    = require('../../../lib/tasks/cordova-build');
var HookTask        = require('../../../lib/tasks/run-hook');
var PlatformTask    = require('../../../lib/tasks/validate/platform');

var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var mockAnalytics   = require('../../fixtures/ember-cordova-mock/analytics');

describe('Build Command', function() {
  var build;

  beforeEach(function() {
    var project = mockProject.project;
    project.config = function() {
      return {
        locationType: 'hash'
      };
    }

    build = new BuildCmd({
      project: project,
      ui: mockProject.ui
    });
    build.analytics = mockAnalytics;
  });

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

      td.replace(PlatformTask.prototype, 'run', function() {
        tasks.push('check-platform');
        return Promise.resolve();
      });

      td.replace(HookTask.prototype, 'run',  (hookName) => {
        tasks.push('hook ' + hookName);
        return Promise.resolve();
      });

      td.replace(BuildTask.prototype, 'run', function() {
        return Promise.resolve();
      });

      td.replace(CdvBuildTask.prototype, 'run', (_cordovaPlatform) => {
        cordovaPlatform = _cordovaPlatform;

        tasks.push('cordova-build');
        return Promise.resolve();
      });
    }

    it('exits cleanly', function() {
      return expect(function() {
        build.run({});
      }).not.to.throw(Error);
    });

    it('runs tasks in the correct order', function() {
      return build.run({})
        .then(function() {
          //h-t ember-electron for the pattern
          expect(tasks).to.deep.equal([
            'check-platform',
            'hook beforeBuild',
            'cordova-build',
            'hook afterBuild'
          ]);
        });
    });

    it('passes platform to cordova build task', function() {
      var passedPlatform = 'ios';

      return build.run({
        platform: passedPlatform
      }).then(function() {
        expect(cordovaPlatform).to.equal(passedPlatform);
      });
    });
  });

  context('when locationType is not hash', function() {
    beforeEach(function() {
      build.project.config = function() {
        return {
          locationType: 'auto'
        };
      };

      td.replace(ui, 'writeLine',  function() {
        throw new Error('Exit Called');
      });

    });

    it('throws', function() {
      return expect(function() {
        build.run({});
      }).to.throw(Error);
    });
  });
});
