'use strict';

var expect        = require('../../helpers/expect');
var parseCordovaOpts = require('../../../lib/utils/parse-cordova-build-opts');

describe('Parse Cordova Build Options Util', function() {
  it('sets default debug/device flags', function() {
    var cordovaOpts = parseCordovaOpts('ios', {})
    expect(cordovaOpts).to.deep.equal([
      '--debug',
      '--device'
    ]);
  });

  it('sets emulator flag when passed', function() {
    var options = { emulator: true };
    var cordovaOpts = parseCordovaOpts('ios', options)

    expect(cordovaOpts).to.deep.equal([
      '--debug',
      '--emulator'
    ]);
  });

  it('sets release flag when passed', function() {
    var options = { release: true };
    var cordovaOpts = parseCordovaOpts('ios', options)

    expect(cordovaOpts).to.deep.equal([
      '--release',
      '--device'
    ]);
  });

  describe('for ios', function() {
    it('returns ios options', function() {
      var options = { codeSignIdentity: 'FOO' };
      var cordovaOpts = parseCordovaOpts('ios', options)

      expect(cordovaOpts).to.contain('--codeSignIdentity=FOO');
      expect(cordovaOpts.length).to.equal(3);
    });
  });

  describe('for android', function() {
    it('returns android options', function() {
      var options = { keystore: 'FOO-KEYSTORE' };
      var cordovaOpts = parseCordovaOpts('android', options)

      expect(cordovaOpts).to.contain('--keystore=FOO-KEYSTORE');
      expect(cordovaOpts.length).to.equal(3);
    });
  });
});
