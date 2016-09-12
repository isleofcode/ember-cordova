'use strict';

const expect        = require('../../helpers/expect');

const parsePlatformOpts = require('../../../lib/utils/parse-platform-opts');

/* eslint-disable max-len */
const options = [
  { name: 'platform',                            type: String,  default: 'ios' },
  { name: 'verbose',                             type: Boolean, default: false,                       aliases: ['v'] },
  { name: 'environment',                         type: String,  default: 'development',               aliases: ['e', 'env', { 'dev': 'development' }, { 'prod': 'production' }] },
  { name: 'cordova-output-path',                 type: 'Path',  default: 'ember-cordova/cordova/www', aliases: ['op', 'out'] },
  { name: 'release',                             type: Boolean, default: false },
  { name: 'device',                              type: Boolean, default: false },
  { name: 'emulator',                            type: Boolean, default: true },
  { name: 'build-config',                        type: 'Path', aliases: ['buildConfig'] },

  // iOS Signing Options
  { name: 'code-sign-identity',                  type: String },
  { name: 'provisioning-profile',                type: String },
  { name: 'codesign-resource-rules',             type: String },

  // android Signing Options
  { name: 'keystore',                            type: String },
  { name: 'store-password',                      type: String },
  { name: 'alias',                               type: String },
  { name: 'password',                            type: String },
  { name: 'keystore-type',                       type: String },

  //Gradle
  { name: 'gradle-arg',                          type: Boolean, default: false },
  { name: 'cdv-build-multiple-apks',             type: String },
  { name: 'cdv-version-code',                    type: String },
  { name: 'cdv-release-signing-properties-file', type: String },
  { name: 'cdv-debug-signing-properties-file',   type: String },
  { name: 'cdv-min-sdk-version',                 type: String },
  { name: 'cdv-build-tools-version',             type: String },
  { name: 'cdv-compile-sdk-version',             type: String }
];
/* eslint-enable max-len */

describe('Parse Platform Options Util', () => {
  describe('for ios', function() {
    it('returns ios options', function() {
      let platformOpts = parsePlatformOpts(
        'ios',
        options
      )

      expect('codeSignIdentity' in platformOpts)
      .to.equal(true);
    });
  });
  describe('for android', function() {
    it('returns android options', function() {
      let platformOpts = parsePlatformOpts(
        'android',
        options
      )
      expect('alias' in platformOpts)
      .to.equal(true);
    });
  });
});
