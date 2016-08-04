'use strict';

const td            = require('testdouble');
const fs            = require('fs');
const path          = require('path');
const expect        = require('../../helpers/expect');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const isObject      = td.matchers.isA(Object);
const isString      = td.matchers.isA(String);
const isArray       = td.matchers.isA(Array);

const setupCreateTask = function() {
  const CreateCdvTask = require('../../../lib/tasks/create-cordova-project');
  return new CreateCdvTask(mockProject);
};

describe('Cordova Create Task', () => {
  beforeEach(() => {
    td.replace(fs, 'mkdirSync', () => {
      return true;
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

    let create = setupCreateTask();

    td.replace(fs, 'existsSync', function() {
      return false;
    });
    td.replace(fs, 'mkdirSync');

    create.run();

    td.verify(fs.mkdirSync(expectedPath));
  });

  it('generates a cordova build command', () => {
    let cdvCreate = td.replace('cordova-lib/src/cordova/create');

    td.replace(fs, 'existsSync', function() {
      return false;
    });

    let create = setupCreateTask();
    create.run();

    td.verify(cdvCreate(isString, isString, isString, isObject));
  });

  it('forces camelcased ids and names', () => {
    let cdvCreate = td.replace('cordova-lib/src/cordova/create');

    td.replace(fs, 'existsSync', function() {
      return false;
    });

    let create = setupCreateTask();
    create.id = 'ember-cordova-app';
    create.name = 'ember-cordova-app';

    create.run();

    td.verify(cdvCreate(isString, 'emberCordovaApp', 'emberCordovaApp', isObject));
  });

  it('raises a warning if cordova project already exists', () => {
    let cdvCreate = td.replace('cordova-lib/src/cordova/create');

    td.replace(fs, 'existsSync', function() {
      return true;
    });

    let create = setupCreateTask();
    create.run();

    expect(create.ui.output).to.contain('project already exists');
  });

  it('proxies via cordova run', () => {
    const cordovaRun = td.replace('../../../lib/utils/cordova-run');

    td.replace(fs, 'existsSync', function() {
      return false;
    });

    let create = setupCreateTask();
    create.run();
    td.verify(cordovaRun(isObject, isObject, isArray));
  });
});
