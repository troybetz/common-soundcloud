/**
 * Module dependencies
 */

var assert = require('assert');
var sinon = require('sinon');
var prepareEmbed = require('../lib/prepare-embed');

var goodEmbed;
var badEmbed;

describe('prepare-embed', function() {
  beforeEach(function() {
    badEmbed = document.createElement('div');
    badEmbed.id = 'bad-embed';
    document.body.appendChild(badEmbed);
  });

  afterEach(function() {
    document.body.removeChild(badEmbed);
  });

  it('should throw an error if embed doesnt exist', function() {
    assert.throws(function() {
      prepareEmbed('imaginary-iframe');
    });
  });

  it('should throw an error if embed isnt an iframe', function() {
    assert.throws(function() {
      prepareEmbed('bad-embed');
    });
  });
});
