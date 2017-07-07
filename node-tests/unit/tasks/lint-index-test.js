'use strict';

var td              = require('testdouble');
var expect          = require('../../helpers/expect');
var Promise         = require('rsvp').Promise;
var path            = require('path');
var cordovaPath     = require('../../../lib/utils/cordova-path');
var fsUtils         = require('../../../lib/utils/fs-utils');
var logger          = require('../../../lib/utils/logger');
var mockProject     = require('../../fixtures/ember-cordova-mock/project');

var LintTask        = require('../../../lib/tasks/lint-index');

describe('Lint Index Task', function() {
  var projectPath = cordovaPath(mockProject.project);
  var source = 'www/index.html';
  var task, subject, readFileArgs;

  afterEach(td.reset);

  beforeEach(function() {
    readFileArgs = null;

    task = new LintTask({
      source: source,
      project: mockProject.project
    });
  });

  context('when source contains tags with path-attributes with paths relative to root', function() { // eslint-disable-line max-len
    var infoArg, warnArg;

    beforeEach(function() {
      infoArg = null;
      warnArg = null;

      td.replace(fsUtils, 'read', function(path) {
        readFileArgs = { path };

        return Promise.resolve(
          '<html>\n' +
          '<head>\n' +
          '  <link href="/styles/foo.css" />\n' +
          '  <script src="/scripts/foo.js"></script>\n' +
          '</head>\n' +
          '<body>\n' +
          '  <img src="/images/foo.png" />\n' +
          '</body>\n' +
          '</html>'
        );
      });

      td.replace(logger, 'info', function(message) {
        infoArg = message;
      });

      td.replace(logger, 'warn', function(message) {
        warnArg = message;
      });

      subject = task.run();
    });

    it('calls fsUtils.read', function() {
      return subject.then(function() {
        expect(readFileArgs.path).to.eql(path.join(projectPath, source));
      });
    });

    it('prints path to linted index.html', function() {
      return subject.then(function() {
        expect(infoArg).to.contain(source);
      });
    });

    it('prints warnings with path and line number and value', function() {
      return subject.then(function() {
        expect(warnArg).to.contain(source);

        expect(warnArg).to.contain(
          'Line 3  ' +
          'href-attribute contains unsupported path relative to root: ' +
          '/styles/foo.css'
        );

        expect(warnArg).to.contain(
          'Line 4  ' +
          'src-attribute contains unsupported path relative to root: ' +
          '/scripts/foo.js'
        );

        expect(warnArg).to.contain(
          'Line 7  ' +
          'src-attribute contains unsupported path relative to root: ' +
          '/images/foo.png'
        );
      });
    });

    it('prints result', function() {
      return subject.then(function() {
        expect(warnArg).to.contain('✖ 3 problem(s)');
      });
    });

    it('returns promise that rejects with attribute warnings', function() {
      return subject.then(function(warnings) {
        expect(warnings).to.deep.include({
          tagName: 'link',
          name: 'href',
          value: '/styles/foo.css',
          line: 3
        }, {
          tagName: 'script',
          name: 'src',
          value: '/scripts/foo.js',
          line: 4
        }, {
          tagName: 'img',
          name: 'src',
          value: '/images/foo.png',
          line: 7
        });
      });
    });
  });

  context('when source contains no path attributes with path relative to root', function() { // eslint-disable-line max-len
    var infoArg, successArgs;

    beforeEach(function() {
      infoArg = null;
      successArgs = [];

      td.replace(fsUtils, 'read', function(path) {
        readFileArgs = { path };

        return Promise.resolve(
          '<html>\n' +
          '<head>\n' +
          '  <link href="./styles/foo.css" />\n' +
          '  <script src="./scripts/foo.js"></script>\n' +
          '</head>\n' +
          '<body>\n' +
          '  <img src="./images/foo.png" />\n' +
          '</body>\n' +
          '</html>'
        );
      });

      td.replace(logger, 'info', function(message) {
        infoArg = message;
      });

      td.replace(logger, 'success', function(message) {
        successArgs.push(message);
      });

      subject = task.run();
    });

    it('calls fsUtils.read', function() {
      return subject.then(function() {
        expect(readFileArgs.path).to.eql(path.join(projectPath, source));
      });
    });

    it('prints path to linted index.html', function() {
      return subject.then(function() {
        expect(infoArg).to.contain('ember-cordova: Linting ' +
          path.join(projectPath, source) + '...\n');
      });
    });

    it('prints result', function() {
      return subject.then(function() {
        expect(successArgs).to.contain('0 problems');
      });
    });

    it('returns promise that resolves', function() {
      return expect(subject).to.be.fulfilled;
    });
  });
});
