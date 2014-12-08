/**
 * Module dependencies
 */

var assert = require('assert');
var sinon = require('sinon');
var proxyquire = require('proxyquireify')(require);

var noop = function() {};

var requireSDKStub;
var loadAPI;

describe('load-api', function() {
  before(function() {

    /**
     * Mock out network requests
     */
    
    requireSDKStub = sinon.stub().returns({
      trigger: function() { return noop; }
    });

    loadAPI = proxyquire('../lib/load-api', {
      'require-sdk': requireSDKStub
    });
  });

  it('should load the SoundCloud Widget API', function() {
    loadAPI();
    assert.ok(requireSDKStub.calledWith('https://w.soundcloud.com/player/api.js'));
  });
});
