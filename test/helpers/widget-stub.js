/**
 * Module dependencies
 */

var EventEmitter = require('events');
var sinon = require('sinon');

/**
 * Create new `widgetStub`
 *
 * Implements event system for binding only. Unbinding not supported.
 */

var widgetStub = new EventEmitter();

/**
 * Methods
 */

widgetStub.bind = widgetStub.addListener; // real
widgetStub.unbind = sinon.spy();
widgetStub.play = sinon.spy();
widgetStub.pause = sinon.spy();

/**
 * Expose `widgetStub`
 */

module.exports = widgetStub;
