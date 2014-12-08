/**
 * Module dependencies
 */

var load = require('require-sdk');

/**
 * Expose `loadAPI`
 */

module.exports = loadAPI;

/**
 * Load the SoundCloud Widget API
 *
 * @returns {Function}
 */

function loadAPI() {
  var sdk = load('https://w.soundcloud.com/player/api.js');
  return sdk;
}
