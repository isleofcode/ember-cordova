'use strict';

const td            = require('testdouble');
const expect        = require('../../helpers/expect');
const Promise       = require('ember-cli/lib/ext/promise');

const ServeCmd      = require('../../../lib/commands/serve');
const CdvBuildTask  = require('../../../lib/tasks/cordova-build');
const BashTask      = require('../../../lib/tasks/bash');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');

describe('Serve Command', () => {
  afterEach(() => {
    td.reset();
  });

  beforeEach(() => {
    ServeCmd.ui = mockProject.ui;

    ServeCmd.project = mockProject.project;
    ServeCmd.project.config = function() {
      return {
        locationType: 'hash'
      }
    }
  });

  function runServe(_options) {
    let options = _options || {};

    return ServeCmd.run(options);
  }

  context('when locationType is hash', () => {
    let tasks = [];

    beforeEach(() => {
      mockTasks();
    });

    it('runs tasks in the correct order', () => {
      runServe();

      expect(tasks).to.deep.equal([
        'ember-build',
        'cordova-build',
        'serve-bash'
      ]);
    });

    it('exits cleanly', () => {
      expect(runServe).not.to.throw(Error);
    });

    function mockTasks() {
      tasks = [];

      td.replace(CdvBuildTask.prototype, 'run', () => {
        tasks.push('cordova-build');
        return Promise.resolve();
      });

      td.replace(BashTask.prototype, 'run', () => {
        tasks.push('serve-bash');
        return Promise.resolve();
      });
    }
  });

  context('when locationType is not hash', () => {
    beforeEach(() => {
      ServeCmd.project.config = function() {
        return {
          locationType: 'auto'
        }
      };
    });

    it('throws', () => {
      expect(runServe).to.throw(Error);
    });
  });
});
