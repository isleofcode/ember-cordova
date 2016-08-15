'use strict';

const td            = require('testdouble');
const fs            = require('fs');
const path          = require('path');
const expect        = require('../../helpers/expect');

const cordovaProj   = require('cordova-lib').cordova;
const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const isObject      = td.matchers.isA(Object);
const isString      = td.matchers.isA(String);

describe('Cordova Create Task', () => {
  let create, rawDouble;

  const setupCreateTask = function() {
    rawDouble = td.replace(cordovaProj.raw, 'create');
    const CreateCdvTask = require('../../../lib/tasks/create-cordova-project');
    create = new CreateCdvTask(mockProject);
  };

  beforeEach(() => {
    td.replace(fs, 'mkdirSync', () => {
      return true;
    });

    td.replace(fs, 'existsSync', function() {
      return false;
    });
  });

  afterEach(() => {
    td.reset();
  });

  it('creates an ember-cordova directory if one does not exist', () => {
    const expectedPath = path.resolve(
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

  it('calls cordova.create.raw', () => {
    setupCreateTask();
    create.run();
    td.verify(rawDouble(isString, isString, isString, {}));
  });

  it('forces camelcased ids and names', () => {
    setupCreateTask();
    create.id = 'ember-cordova-app';
    create.name = 'ember-cordova-app';

    create.run();

    /* eslint-disable max-len */
    td.verify(rawDouble(isString, 'emberCordovaApp', 'emberCordovaApp', isObject));
    /* eslint-enable max-len */
  });

  it('raises a warning if cordova project already exists', () => {
    td.replace(fs, 'existsSync', function() {
      return true;
    });

    setupCreateTask();
    create.run();

    expect(create.ui.output).to.contain('project already exists');
  });


  it('builds with a template when provided', function() {
    setupCreateTask();
    create.run('templatePath');

    var matcher = td.matchers.contains({lib: { www: { url: 'templatePath'}}});
    td.verify(rawDouble(isString, isString, isString, matcher));
  });
});
