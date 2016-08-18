'use strict';

const td            = require('testdouble');
const PromiseExt    = require('ember-cli/lib/ext/promise');

const OpenCmd       = require('../../../lib/commands/open');
const OpenTask      = require('../../../lib/tasks/open-app');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const mockAnalytics = require('../../fixtures/ember-cordova-mock/analytics');

describe('Open Command', () => {
  let open;

  beforeEach(() => {
    open = new OpenCmd({
      project: mockProject.project,
      ui: mockProject.ui,
      analytics: mockAnalytics
    });

    td.replace(
      OpenTask.prototype,
      'run',
      function() { return PromiseExt.resolve(); }
    );
  });

  afterEach(() => {
    td.reset();
  });

  it('runs Open App Task', () => {
    var options =  { application: 'dummy', platform: 'ios' };

    console.log('running', open.analytics);
    return open.run(options)
      .then(function() {
        return true;
      });
  });
});
