/**
 * Module dependencies
 */

var sinon = require('sinon');
var widgetStub = require('./widget-stub');

/**
 * Expose `widgetStub`
 */

exports.widgetStub = widgetStub;

/**
 * Create new `SC` object
 */

var SC = {
  Widget: sinon.stub().returns(widgetStub)
};

/**
 * Fake events system
 */

SC.Widget.Events = {
  READY: 'READY',
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  FINISH: 'FINISH',
  PLAY_PROGRESS: 'PLAY_PROGRESS',
  LOAD_PROGRESS: 'LOAD_PROGRESS'
};

/**
 * Expose `SC`
 */

exports.SC = SC;
