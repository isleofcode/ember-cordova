'use strict';

const td            = require('testdouble');
const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const isObject      = td.matchers.isA(Object);
const isArray       = td.matchers.isA(Array);
const isAnything    = td.matchers.anything();

describe('Cordova Plugin Task', () => {
  it('passes params to cordova-run util', () => {
    let runDouble = td.replace('../../../lib/utils/cordova-run');
    let CordovaRaw = require('../../../lib/tasks/cordova-raw');

    let plugin = new CordovaRaw(mockProject);
    plugin.run();

    td.verify(runDouble(isAnything, isObject, isArray));
  });
});
