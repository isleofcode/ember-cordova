'use strict';

const td            = require('testdouble');
const fs            = require('fs');
const path          = require('path');
const expect        = require('../../helpers/expect');
const BashTask      = require('../../../lib/tasks/bash');
const CreateCdvTask = require('../../../lib/tasks/create-cordova-project');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const isObject      = td.matchers.isA(Object);

describe('Cordova Create Task', () => {
  let bashDouble, cordovaCreate, mkDir;

  beforeEach(() => {
    bashDouble = td.replace(BashTask.prototype, 'runCommand');
    cordovaCreate = new CreateCdvTask(mockProject);
    td.replace(fs, 'mkdirSync');
  });

  afterEach(() => {
    td.reset();
  });

  it('creates an ember-cordova directory if one does not exist', () => {
    td.replace(fs, 'existsSync', () => {
      return false;
    });

    const expectedPath = path.resolve(__dirname, '..', '..', 'fixtures', 'ember-cordova-mock', 'ember-cordova');

    cordovaCreate.run();
    td.verify(fs.mkdirSync(expectedPath));
  });

  it('generates a cordova build command', () => {
    td.replace(fs, 'existsSync', () => {
      return false;
    });

    cordovaCreate.run();
    td.verify(bashDouble('cordova create cordova emberCordovaMock emberCordovaMock', isObject));
  });

  it('forces camelcased ids and names', () => {
    td.replace(fs, 'existsSync', () => {
      return false;
    });

    cordovaCreate.id = 'ember-cordova-app';
    cordovaCreate.name = 'ember-cordova-app';

    cordovaCreate.run();
    td.verify(bashDouble('cordova create cordova emberCordovaApp emberCordovaApp', isObject));
  });

  it('raises a warning if cordova project already exists', () => {
    td.replace(fs, 'existsSync', function() {
      return true;
    });

    cordovaCreate.run();
    expect(cordovaCreate.ui.output).to.contain('project already exists');
  });
});
