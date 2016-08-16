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

  stub._super = {};
  stub._super.treeForPublic = function(tree) { return tree };

  return stub;
};

describe('Index', () => {
  afterEach(function() {
    td.reset();
  });

  context('with target cordova', function() {
    describe('config', function() {
      it('stubs a cordova conf object', function() {
        let projectIndex = stubIndex();
        delete projectIndex.project.RELOAD_PORT;

        expect(projectIndex.config('', {})).to.deep.equal({ cordova: {} });
      });

      context('with liveReload', function() {
        it('defaults reloadUrl to conf.reloadUrl', function() {
          let projectIndex = stubIndex();

          let args = {
            cordova: {
              reloadUrl: 'http://192.0.0.1:4200'
            }
          };

          expect(
            projectIndex.config('', args)
          ).to.deep.equal(args)
        });

        it('detects reloadUrl if no default', function() {
          td.replace('../../lib/utils/get-network-ip', function() {
            return '192.0.0.2';
          });
          let projectIndex = stubIndex();

          expect(
            projectIndex.config('', {})
          ).to.deep.equal({
            cordova: {
              reloadUrl: 'http://192.0.0.2:1'
            }
          })
        });
      });

    });

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
      it('attempts to add cordova assets to tree', function() {
        td.replace(fs, 'existsSync', function() {
          return true;
        });

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
        }).to.throw(
        'ember-cordova: Did not receive platform asset path, canot not build'
        );
      });

      /* eslint-disable max-len */
      it('throws an error if cordova_plugins does not exist', function() {
        td.replace(fs, 'existsSync', function() {
          return false;
        });

        td.replace('../../lib/utils/get-platform-assets', function() {
          return {
            path: 'path',
            files: []
          }
        });

        let projectIndex = stubIndex();
        expect(function() {
          projectIndex.treeForPublic()
        }).to.throw(
        'ember-cordova: cordova_plugins did not exist. It is required for Device LiveReload to work.'
        );
      });
      /* eslint-enable max-len */
    });
  });
});
