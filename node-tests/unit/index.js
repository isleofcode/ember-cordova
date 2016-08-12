'use strict';

const td            = require('testdouble');
var fs              = require('fs');
const expect        = require('../helpers/expect');

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

        td.verify(getAssetDouble());
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
