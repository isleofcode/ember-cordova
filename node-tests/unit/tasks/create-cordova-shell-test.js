'use strict';

var td              = require('testdouble');
var fs              = require('fs');

var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var expect          = require('../../helpers/expect');

var contains        = td.matchers.contains;
var isString        = td.matchers.isA(String);

var setupTask = function(mockTemplate) {
  var CreateShell = require('../../../lib/tasks/create-livereload-shell');

  var shellTask = new CreateShell({
    project: mockProject.project,
    ui: mockProject.ui
  });

  if (mockTemplate) {
    td.replace(CreateShell.prototype, 'getShellTemplate', function() {
      return '{{liveReloadUrl}}';
    });
  }

  return shellTask;
};

describe('Create Cordova Shell Task', function() {
  var writeDouble;

  beforeEach(function() {
    writeDouble = td.replace(fs, 'writeFileSync');
  });

  afterEach(function() {
    td.reset();
  });

  it('reads in the template index.html', function() {
    var shellTask = setupTask();
    var readDouble = td.replace(fs, 'readFileSync');

    expect(shellTask.run(4200)).to.eventually.throw(Error);
    td.verify(readDouble(
      contains('templates/livereload-shell/index.html'),
      isString
    ));
  });

  it('replaces {{liveReloadUrl}} and saves', function() {
    var shellTask = setupTask(true);

    return shellTask.run(4200, 'fakeUrl').then(function() {
      td.verify(writeDouble(
        contains('cordova/www/index.html'),
        'fakeUrl',
        isString
      ));
    });
  })

  it('detects reloadUrl if one is not passed', function() {
    td.replace('../../../lib/utils/get-network-ip', function() {
      return '192.0.0.2';
    });
    var shellTask = setupTask(true);

    return shellTask.run(4200).then(function() {
      td.verify(writeDouble(
        isString,
        'http://192.0.0.2:4200',
        isString
      ));
    });
  });

  it('rejects on error', function() {
    td.replace(fs, 'readFileSync');
    var shellTask = setupTask(true);
    expect(shellTask.run()).to.eventually.be.rejected;
  });
});
