'use strict';

var td              = require('testdouble');
var fs              = require('fs');
var mockProject     = require('../fixtures/ember-cordova-mock/project');
var expect          = require('../helpers/expect');
var isObject        = td.matchers.isA(Object);

var stubIndex = function() {
  var stub = require('../../index');
  stub.project = {
    targetIsCordova: true,
    RELOAD_PORT: 1,
    CORDOVA_PLATFORM: 'ios'
  };
  stub.ui = mockProject.ui;

  stub._super = {};
  stub._super.treeForPublic = function(tree) { return tree };

  td.replace(stub, 'cordovaAssetTree');

  return stub;
};

describe('Index', function() {
  afterEach(function() {
    td.reset();
  });

  context('with target cordova', function() {
    describe('contentFor', function() {
      it('adds a cordova script tag', function() {
        var projectIndex = stubIndex();

        expect(
          projectIndex.contentFor('body')
        ).to.equal(
          '<script src="cordova.js"></script>'
        );
      });
    });

    describe('treeForPublic', function() {
      beforeEach(function() {
        td.replace('../../lib/utils/get-platform-assets', function() {
          return {
            path: 'path',
            files: []
          }
        });
      });

      it('attempts to add cordova assets to tree', function() {
        td.replace(fs, 'existsSync', function() {
          return true;
        });

        var getAssetDouble = td.replace('../../lib/utils/get-platform-assets');
        var projectIndex = stubIndex();

        expect(function() {
          projectIndex.treeForPublic()
        }).to.throw(Error);

        td.verify(getAssetDouble(isObject));
      });

      it('throws an error if platformAssets.path is undefined', function() {
        td.replace('../../lib/utils/get-platform-assets', function() {
          return {
            path: undefined,
            files: []
          }
        });

        var projectIndex = stubIndex();
        expect(function() {
          projectIndex.treeForPublic()
        }).to.throw(
        'ember-cordova: Did not receive platform asset path, canot not build'
        );
      });

      it('throws an error if cordova.js does not exist', function() {
        td.replace(fs, 'existsSync', function(path) {
          return path !== 'path/cordova.js'
        });

        var projectIndex = stubIndex();
        projectIndex.treeForPublic();

        expect(projectIndex.ui.output).to.contain('WARNING: ember-cordova:');
        expect(projectIndex.ui.output).to.contain('cordova.js');
      });

      it('throws an error if cordova_plugins.js does not exist', function() {
        td.replace(fs, 'existsSync', function(path) {
          return path !== 'path/cordova_plugins.js'
        });

        var projectIndex = stubIndex();
        projectIndex.treeForPublic();

        expect(projectIndex.ui.output).to.contain('WARNING: ember-cordova:');
        expect(projectIndex.ui.output).to.contain('cordova_plugins.js');
      });
    });
  });
});
