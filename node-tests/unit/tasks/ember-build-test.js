'use strict';

var td              = require('testdouble');
var Promise         = require('ember-cli/lib/ext/promise');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');

describe('Ember Build Task', function() {
  beforeEach(function() {
    td.reset();
  });

  it('stubs .gitkeep after ember build', function() {
    var createKeepDouble = td.replace('../../../lib/utils/create-gitkeep');
    var EmberBuildTask  = require('../../../lib/tasks/ember-build');

    td.replace(EmberBuildTask.prototype, 'initBuilder', function() {
      return {
        build: function() {
          return Promise.resolve();
        }
      }
    });

    var build  = new EmberBuildTask({
      project: mockProject.project,
      ui: mockProject.ui
    });

    return build.run().then(function() {
      td.verify(createKeepDouble('ember-cordova/cordova/www/.gitkeep'));
    });
  });
});

