'use strict';

var td              = require('testdouble');
var expect          = require('../../helpers/expect');
var Promise         = require('rsvp').Promise;
var LintTask        = require('../../../lib/tasks/lint-index');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');
var mockAnalytics   = require('../../fixtures/ember-cordova-mock/analytics');

var LintCommand     = require('../../../lib/commands/lint-index');

describe('Lint Index Command', function() {
  var command;

  afterEach(td.reset);

  beforeEach(function() {
    command = new LintCommand({
      project: mockProject.project
    });
    command.analytics = mockAnalytics;
  });

  context('when options contains source', function() {
    var options = { source: 'www/index.html' };
    var subject, lintTaskRunCount;

    beforeEach(function() {
      lintTaskRunCount = 0;

      td.replace(LintTask.prototype, 'run', function() {
        lintTaskRunCount++;
        return Promise.resolve();
      });

      subject = command.run(options);
    });

    it('calls Lint Index Task', function() {
      return subject.then(function() {
        expect(lintTaskRunCount).to.eql(1);
      });
    });
  });
});
