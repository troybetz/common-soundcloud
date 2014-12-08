/**
 * Module dependencies
 */

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
 * Create a controller for the widget
 *
 * @param {String} id of embedded widget
 * @api private
 */

SoundCloud.prototype.createPlayer = function(id) {
  var self = this;
  sdk(function(err, SC) {
    self.player = new SC.Widget(id);
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
