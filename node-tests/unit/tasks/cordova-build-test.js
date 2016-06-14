'use strict';

const td                = require('testdouble');
const BashTask          = require('../../../lib/tasks/bash');
const CordovaBuildTask  = require('../../../lib/tasks/cordova-build');

const mockProject       = require('../../fixtures/ember-cordova-mock/project');
const defaults          = require('lodash').defaults;
const isObject          = td.matchers.isA(Object);

describe('Cordova Build Task', () => {
  let bashDouble, build;

  beforeEach(() => {
    bashDouble = td.replace(BashTask.prototype, 'runCommand');

    build = new CordovaBuildTask(mockProject);
  });

  afterEach(() => {
    td.reset();
  });

  it('generates a cordova build command', () => {
    build.run();

    td.verify(bashDouble('cordova build ios', isObject));
  });

  it('sets platform', () => {
    build.platform = 'android';
    build.run();

    td.verify(bashDouble('cordova build android', isObject));
  });

  it('sets release tag for non development builds', () => {
    build.env = 'production';
    build.run();

    td.verify(bashDouble('cordova build ios --release', isObject));
  });
});
