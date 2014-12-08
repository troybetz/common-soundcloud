/**
 * Expose `prepareEmbed`
 */

module.exports = prepareEmbed;

/**
 * Make sure the embed is ready for API control
 *
 * @param {String} embedID - id of iframe to prepare
 */

function prepareEmbed(embedID) {
  var embed = document.getElementById(embedID);

  if (!isEmbeddedVideo(embed)) {
    throw new Error('embed must be an iframe');
  }
}

/**
 * @param {Object} [embed]
 * @returns {Boolean}
 */

function isEmbeddedVideo(embed) {
  return embed && embed.tagName === 'IFRAME';
}
