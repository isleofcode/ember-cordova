'use strict';

var td              = require('testdouble');
var expect          = require('../../helpers/expect');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var Promise         = require('rsvp').Promise;

describe('Blueprint Index', function() {
  var index;
  var called = false;

  beforeEach(function() {
    called = false;

    td.replace('../../../lib/utils/init-project', function() {
      called = true;
      return Promise.resolve();
    });

    index = require('../../../blueprints/ember-cordova/index');
    index.project = mockProject.project;
    index.ui = mockProject.ui;
  });

  afterEach(function() {
    td.reset();
  });


  it('runs the init util', function() {
    return index.afterInstall({}).then(function() {
      expect(called).to.equal(true);
    });
  });
});
