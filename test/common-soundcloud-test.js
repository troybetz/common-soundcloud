/**
 * Module dependencies
 */

var EventEmitter = require('events');
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

    widgetMock = new EventEmitter();
    
    widgetMock.bind = widgetMock.addListener;
    widgetMock.unbind = sinon.spy();
    widgetMock.play = sinon.spy();
    widgetMock.pause = sinon.spy();

    window.SC = {
      Widget: sinon.stub().returns(widgetMock)
    };

    window.SC.Widget.Events = {
      READY: 'READY',
      PLAY: 'PLAY',
      PAUSE: 'PAUSE',
      FINISH: 'FINISH'
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

  describe('functionality', function() {
    it('can play a track', function() {
      var player = new SoundCloud('soundcloud-embed');
      player.play();

      assert.ok(widgetMock.play.called);
    });

    it('can pause a track', function() {
      var player = new SoundCloud('soundcloud-embed');
      player.pause();

      assert.ok(widgetMock.pause.called);
    });
  });

  describe('events', function() {
    it('should emit `ready` when loaded', function(done) {
      var player = new SoundCloud('soundcloud-embed');
      player.on('ready', done);

      widgetMock.emit(SC.Widget.Events.READY);
    });

    it('should emit `play` when playing', function(done) {
      var player = new SoundCloud('soundcloud-embed');

      player.on('play', done);

      widgetMock.emit(SC.Widget.Events.PLAY);
    });

    it('should emit `pause` when paused', function(done) {
      var player = new SoundCloud('soundcloud-embed');

      player.on('pause', done);
      widgetMock.emit(SC.Widget.Events.PAUSE);
    });

    it('should emit `end` when finished', function(done) {
      var player = new SoundCloud('soundcloud-embed');

      player.on('end', done);
      widgetMock.emit(SC.Widget.Events.FINISH);
    });
  });

  describe('destruction', function() {
    it('should remove player event listeners', function() {
      var player = new SoundCloud('soundcloud-embed');
      player.destroy();
      
      assert.equal(widgetMock.unbind.callCount, 4);
    });

    it('should delete its internal player', function() {
      var player = new SoundCloud('soundcloud-embed');
      player.destroy();

      assert.equal(player.player, undefined);
    });
  });
});
