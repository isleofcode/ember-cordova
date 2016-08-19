'use strict';

const td            = require('testdouble');
const fs            = require('fs');

const mockProject   = require('../../fixtures/ember-cordova-mock/project');
const expect        = require('../../helpers/expect');

const contains      = td.matchers.contains;
const isString      = td.matchers.isA(String);

const setupTask = function(mockTemplate) {
  let CreateShell = require('../../../lib/tasks/create-livereload-shell');

  let shellTask = new CreateShell({
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
  let writeDouble;

  beforeEach(function() {
    writeDouble = td.replace(fs, 'writeFileSync');
  });

  afterEach(function() {
    td.reset();
  });

  it('reads in the template index.html', function() {
    let shellTask = setupTask();
    let readDouble = td.replace(fs, 'readFileSync');

    expect(shellTask.run(4200)).to.eventually.throw(Error);
    td.verify(readDouble(
      contains('templates/livereload-shell/index.html'),
      isString
    ));
  });

  it('replaces {{liveReloadUrl}} and saves', function() {
    let shellTask = setupTask(true);

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
    let shellTask = setupTask(true);

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
    let shellTask = setupTask(true);
    expect(shellTask.run()).to.eventually.be.rejected;
  });
});
