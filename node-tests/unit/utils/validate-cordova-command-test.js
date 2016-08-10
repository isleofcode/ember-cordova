'use strict';

const expect        = require('../../helpers/expect');
const validateCordova = require('../../../lib/utils/validate-cordova-command');

describe('Build Command', () => {
  it('exits if command is not add or remove', () => {
    expect(validateCordova([''])).to.be.an('error');
  });

  it('correctly pulls a single plugin name', () => {
    expect(
      validateCordova(['add', 'cordova-plugin'])
    ).to.deep.equal({command: 'add', args: ['cordova-plugin']});
  });

  it('correctly pulls multiple plugin names', () => {
    var plugins = ['cordova-plugin', 'cordova-plugin-2'];
    expect(
      validateCordova(['add', 'cordova-plugin', 'cordova-plugin-2'])
    ).to.deep.equal({command: 'add', args: plugins});
  });
});
