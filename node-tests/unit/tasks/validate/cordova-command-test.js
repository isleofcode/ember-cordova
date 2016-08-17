'use strict';

const expect          = require('../../../helpers/expect');
const ValidateCordova = require('../../../../lib/tasks/validate/cordova-installed');

describe('Validate Cordova Installed Command', () => {
  let validateCordova;
  beforeEach(function() {
    validateCordova = new ValidateCordova();
  });

  it('exits if command is not add or remove', () => {
    expect(validateCordova.run([''])).to.eventually.be.rejected;
  });

  it('correctly pulls a single plugin name', () => {
    expect(
      validateCordova.run(['add', 'cordova-plugin'])
    ).to.eventually.deep.equal({command: 'add', args: ['cordova-plugin']});
  });

  it('correctly pulls multiple plugin names', () => {
    var plugins = ['cordova-plugin', 'cordova-plugin-2'];
    expect(
      validateCordova.run(['add', 'cordova-plugin', 'cordova-plugin-2'])
    ).to.eventually.deep.equal({command: 'add', args: plugins});
  });
});
