/**
 * Module dependencies
 */

var assert = require('assert');
var sinon = require('sinon');
var proxyquire = require('proxyquireify')(require);

var noop = function() {};

var soundcloudEmbed;
var loadAPIStub;
var SoundCloud;

describe('common-soundcloud', function() {
  beforeEach(function() {

    /**
     * Add a fake embedded video to control
     */
    
    soundcloudEmbed = document.createElement('iframe');
    soundcloudEmbed.src = '#';
    soundcloudEmbed.id = 'soundcloud-embed';
    document.body.appendChild(soundcloudEmbed);

    /**
     * Mock out SoundCloud Widget API
     */

    window.SC = {
      Widget: sinon.stub().returns({})
    };
    
    loadAPIStub = sinon.stub().returns(function(cb) {
      cb(null, window.SC);
    });

    /**
     * Magic happens
     */
    
    SoundCloud = proxyquire('../', {
      './lib/load-api': loadAPIStub
    });
  });

  afterEach(function() {
    document.body.removeChild(soundcloudEmbed);
  });

  describe('initialization', function() {
    it('should load the SoundCloud iframe API', function() {
      var player = new SoundCloud('soundcloud-embed');
      assert.ok(loadAPIStub.called);
    });

    it('should create a new instance of `SC.Widget`', function() {
      var player = new SoundCloud('soundcloud-embed');
      assert.ok(SC.Widget.calledWith('soundcloud-embed'));
    });
  });
});
