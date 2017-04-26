'use strict';

var expect        = require('../../helpers/expect');
var parseCordovaOpts = require('../../../lib/utils/parse-cordova-build-opts');

describe('Parse Cordova Build Options Util', function() {
  it('sets generic flags', function() {
    var cordovaOpts = parseCordovaOpts('ios', {
      release: true, device: 'deviceName'
    })

    expect(cordovaOpts.release).to.equal(true);
    expect(cordovaOpts.device).to.equal('deviceName');
  });

  describe('for ios', function() {
    it('returns ios options', function() {
      var options = { codeSignIdentity: 'FOO' };
      var cordovaOpts = parseCordovaOpts('ios', options)

      expect(cordovaOpts.codeSignIdentity).to.equal('FOO');
    });

    it ('does not parse android options', function() {
      var options = { keystore: 'FOO-KEYSTORE' };
      var cordovaOpts = parseCordovaOpts('ios', options)

      expect(cordovaOpts.keystore).to.equal(undefined);
    });
  });

  describe('for android', function() {
    it('returns android options', function() {
      var options = { keystore: 'FOO-KEYSTORE' };
      var cordovaOpts = parseCordovaOpts('android', options)

      expect(cordovaOpts.keystore).to.equal('FOO-KEYSTORE');
    });

    it('does not parse ios options', function() {
      var options = { codeSignIdentity: 'FOO' };
      var cordovaOpts = parseCordovaOpts('android', options)

      expect(cordovaOpts.codeSignIdentity).to.equal(undefined);
    });
  });
});
