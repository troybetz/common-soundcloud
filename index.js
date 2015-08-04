/**
 * Module dependencies
 */

var EventEmitter = require('events');
var loadAPI = require('./lib/load-api');
var prepareEmbed = require('./lib/prepare-embed');

var sdk;

/**
 * Expose `SoundCloud`
 */

module.exports = SoundCloud;

/**
 * Create new `SoundCloud` controller
 *
 * @param {String} id of embedded widget
 */

function SoundCloud(id) {
  sdk = loadAPI();
  prepareEmbed(id);
  this.attachToEmbed(id);
}

/**
 * Mixin events
 */

SoundCloud.prototype = new EventEmitter();

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
 * Remove all event handlers and free up internal player for
 * garbage collection.
 *
 * @api public
 */

SoundCloud.prototype.destroy = function() {
  this.unbindEvents();
  delete this.player;
};

/**
 * Attach a controller to the embedded widget
 *
 * @param {String} id of embedded widget
 * @api private
 */

SoundCloud.prototype.attachToEmbed = function(id) {
  var self = this;

  sdk(function(err, SC) {
    self.player = new window.SC.Widget(id);
    self.bindEvents();
  });
};

/**
 * Bind player events
 *
 * @api private
 */

SoundCloud.prototype.bindEvents = function() {
  var self = this;

  self.player.bind(window.SC.Widget.Events.READY, function(event) {
    self.emit('ready', event);
  });

  self.player.bind(window.SC.Widget.Events.PLAY, function(event) {
    self.emit('play', event);
  });

  self.player.bind(window.SC.Widget.Events.PAUSE, function(event) {
    self.emit('pause', event);
  });

  self.player.bind(window.SC.Widget.Events.FINISH, function(event) {
    self.emit('end', event);
  });

  self.player.bind(window.SC.Widget.Events.PLAY_PROGRESS, function(event) {
    self.emit('playProgress', event);
  });

  self.player.bind(window.SC.Widget.Events.LOAD_PROGRESS, function(event) {
    self.emit('loadProgress', event);
  });
};

/**
 * Unbind all player events
 *
 * @api private
 */

SoundCloud.prototype.unbindEvents = function() {
  this.player.unbind(window.SC.Widget.Events.READY);
  this.player.unbind(window.SC.Widget.Events.PLAY);
  this.player.unbind(window.SC.Widget.Events.PAUSE);
  this.player.unbind(window.SC.Widget.Events.FINISH);
  this.player.unbind(window.SC.Widget.Events.PLAY_PROGRESS);
  this.player.unbind(window.SC.Widget.Events.LOAD_PROGRESS);
};
