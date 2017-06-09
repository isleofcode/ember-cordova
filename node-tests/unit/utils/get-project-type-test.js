'use strict';

var td            = require('testdouble');
var expect        = require('../../helpers/expect');
var projectType   = require('../../../lib/utils/get-project-type');
var mockProject   = require('../../fixtures/ember-cordova-mock/project');

describe('Get Project Type Util', function() {
  describe('getPackage', function() {
    it('attempts to read package.json at root', function() {
      let packageJSON = projectType.getPackage(mockProject.project.root);
      expect(packageJSON.name).to.equal('mock-project');
    });
  });

  describe('isGlimmer', function() {
    afterEach(function() {
      td.reset();
    });

    it('returns true if @glimmer/application is present', function() {
      td.replace(projectType, 'getPackage', function() {
        return {
          name: 'my-app',
          devDependencies: {
            '@glimmer/application': '^0.5.1',
          }
        };
      });

      expect(projectType.isGlimmer()).to.equal(true);
    });

    it('returns false if @glimmer/application is not present', function() {
      td.replace(projectType, 'getPackage', function() {
        return {
          name: 'my-app',
          devDependencies: {
            'ember-source': '^0.5.1',
          }
        };
      });

      expect(projectType.isGlimmer()).to.equal(false);
    });
  });
});
