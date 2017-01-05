'use strict';

/* eslint-disable max-len */
var expect          = require('../../../helpers/expect');
var ValidateCordova = require('../../../../lib/tasks/validate/cordova-installed');
/* eslint-enable max-len */

describe('Validate Cordova Installed Command', function() {
  var validateCordova;
  beforeEach(function() {
    validateCordova = new ValidateCordova();
  });

  it('exits if command is not add or remove', function() {
    return expect(validateCordova.run([''])).to.eventually.be.rejected;
  });

  it('correctly pulls a single plugin name', function() {
    return expect(
      validateCordova.run(['add', 'cordova-plugin'])
    ).to.eventually.deep.equal({command: 'add', args: ['cordova-plugin']});
  });

  it('correctly pulls multiple plugin names', function() {
    var plugins = ['cordova-plugin', 'cordova-plugin-2'];
    return expect(
      validateCordova.run(['add', 'cordova-plugin', 'cordova-plugin-2'])
    ).to.eventually.deep.equal({command: 'add', args: plugins});
  });
});
