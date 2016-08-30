'use strict';

var td              = require('testdouble');
var PromiseExt      = require('ember-cli/lib/ext/promise');

var OpenCmd         = require('../../../lib/commands/open');
var OpenTask        = require('../../../lib/tasks/open-app');

var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var mockAnalytics   = require('../../fixtures/ember-cordova-mock/analytics');

describe('Open Command', function() {
  var open;

  beforeEach(function() {
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

  afterEach(function() {
    td.reset();
  });

  it('runs Open App Task', function() {
    var options =  { application: 'dummy', platform: 'ios' };

    console.log('running', open.analytics);
    return open.run(options)
      .then(function() {
        return true;
      });
  });
});
