'use strict';

const td            = require('testdouble');
var fs              = require('fs');
const expect        = require('../helpers/expect');
const isObject      = td.matchers.isA(Object);

const stubIndex = function() {
  let stub = require('../../index');
  stub.project = {
    targetIsCordova: true,
    RELOAD_PORT: 1,
    CORDOVA_PLATFORM: 'ios'
  };

  td.replace(stub, 'cordovaAssetTree');
  return stub;
};

describe('Index', () => {
  afterEach(function() {
    td.reset();
  });

  context('with target cordova', function() {
    describe('contentFor', function() {
      it('adds a cordova script tag', function() {
        let projectIndex = stubIndex();

        expect(
          projectIndex.contentFor('body')
        ).to.equal(
          '<script src="cordova.js"></script>'
        );
      });
    });

    describe('treeForPublic', function() {
      beforeEach(function() {
        td.replace(fs, 'existsSync', function() {
          return true;
        });
      });

      it('attempts to add cordova assets to tree', function() {
        let getAssetDouble = td.replace('../../lib/utils/get-platform-assets');
        let projectIndex = stubIndex();

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
        let projectIndex = stubIndex();

        expect(function() {
          projectIndex.treeForPublic()
        }).to.throw(Error);
      });

      it('throws an error if cordova_plugins does not exist', function() {
        td.replace(fs, 'existsSync', function() {
          return false;
        });
        let projectIndex = stubIndex();

        expect(function() {
          projectIndex.treeForPublic()
        }).to.throw(Error);
      });
    });
  });
});
