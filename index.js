/**
 * Module dependencies
 */

var EventEmitter = require('events');
var loadAPI = require('./lib/load-api');
var prepareEmbed = require('./lib/prepare-embed');

/**
 * Expose `SoundCloud`
 */

module.exports = SoundCloud;

/**
 * Create new `SoundCloud` player
 *
 * @param {String} id of embedded widget
 */

function SoundCloud(id) {
  sdk = loadAPI();
  prepareEmbed(id);
  this.createPlayer(id);
}

/**
 * Mixin events
 */

SoundCloud.prototype = new EventEmitter();

/**
 * Create a controller for the widget
 *
 * @param {String} id of embedded widget
 * @api private
 */

SoundCloud.prototype.createPlayer = function(id) {
  var self = this;
  sdk(function(err, SC) {
    self.player = new window.SC.Widget(id);
    self.bindEvents();
  });
};

/**
 * Play the track.
 *
 * @api public
 */

SoundCloud.prototype.play = function() {
  this.player.play();
};

/**
 * Pause the track.
 *
 * @api public
 */

SoundCloud.prototype.pause = function() {
  this.player.pause();
};

/**
 * Bind events to player
 *
 * @api private
 */

SoundCloud.prototype.bindEvents = function() {
  var self = this;
  
  self.player.bind(window.SC.Widget.Events.READY, function() {
    self.emit('ready');
  });

  self.player.bind(window.SC.Widget.Events.PLAY, function() {
    self.emit('play');
  });

  self.player.bind(window.SC.Widget.Events.PAUSE, function() {
    self.emit('pause');
  });

  self.player.bind(window.SC.Widget.Events.FINISH, function() {
    self.emit('end');
  });
};
