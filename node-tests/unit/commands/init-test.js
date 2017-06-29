'use strict';

var td              = require('testdouble');
var expect          = require('../../helpers/expect');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');

describe('Init Command', function() {
  var init;
  var called = false;

  beforeEach(function() {
    called = false;

    td.replace('../../../lib/utils/init-project', function() {
      called = true;
      return Promise.resolve();
    });

    var InitCommand     = require('../../../lib/commands/init');
    init = new InitCommand({
      project: mockProject.project,
      ui: mockProject.ui
    });
  });

  afterEach(function() {
    td.reset();
  });

  it('runs the init util', function() {
    return init.run({}).then(function() {
      expect(called).to.equal(true);
    });
  });
});
