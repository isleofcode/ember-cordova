'use strict';

var td              = require('testdouble');
var fs              = require('fs');
var path            = require('path');
var expect          = require('../../helpers/expect');

var cordovaProj     = require('cordova-lib').cordova;
var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var isObject        = td.matchers.isA(Object);
var isString        = td.matchers.isA(String);

describe('Cordova Create Task', function() {
  var create, rawDouble;

  var setupCreateTask = function() {
    rawDouble = td.replace(cordovaProj.raw, 'create');
    var CreateCdvTask = require('../../../lib/tasks/create-cordova-project');
    create = new CreateCdvTask(mockProject);
  };

  beforeEach(function() {
    td.replace(fs, 'mkdirSync', function() {
      return true;
    });

    td.replace(fs, 'existsSync', function() {
      return false;
    });
  });

  afterEach(function() {
    td.reset();
  });

  it('creates an ember-cordova directory if one does not exist', function() {
    var expectedPath = path.resolve(
      __dirname, '..', '..',
      'fixtures',
      'ember-cordova-mock',
      'ember-cordova'
    );

    setupCreateTask();
    td.replace(fs, 'mkdirSync');

    create.run();
    td.verify(fs.mkdirSync(expectedPath));
  });

  it('calls cordova.create.raw', function() {
    setupCreateTask();
    create.run();
    td.verify(rawDouble(isString, isString, isString, isObject));
  });

  it('forces camelcased ids and names', function() {
    setupCreateTask();
    create.id = 'ember-cordova-app';
    create.name = 'ember-cordova-app';

    create.run();

    /* eslint-disable max-len */
    td.verify(rawDouble(isString, 'emberCordovaApp', 'emberCordovaApp', isObject));
    /* eslint-enable max-len */
  });

  it('raises a warning if cordova project already exists', function() {
    td.replace(fs, 'existsSync', function() {
      return true;
    });

    setupCreateTask();
    create.run();

    expect(create.ui.output).to.contain('project already exists');
  });

  it('defaults to the ember-cordova-template template', function() {
    setupCreateTask();
    create.run();

    var matcher = td.matchers.contains({
      lib: {
        www: {
          url: 'ember-cordova-template'
        }
      }
    });

    td.verify(rawDouble(isString, isString, isString, matcher));
  });

  it('builds with a template when provided', function() {
    setupCreateTask();
    create.run('templatePath');

    var matcher = td.matchers.contains({lib: { www: { url: 'templatePath'}}});
    td.verify(rawDouble(isString, isString, isString, matcher));
  });
});
