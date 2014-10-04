'use strict';

var React = require('react');

var TAGS = '\
a abbr address area article aside audio b base bdi bdo big blockquote body br    \
button canvas caption cite code col colgroup data datalist dd del details dfn    \
dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5  \
h6 head header hr html i iframe img input ins kbd keygen label legend li link    \
main map mark menu menuitem meta meter nav noscript object ol optgroup option    \
output p param pre progress q rp rt ruby s samp script section select small      \
source span strong style sub summary sup table tbody td textarea tfoot th        \
thead time title tr track u ul var video wbr                                     \
circle defs ellipse g line linearGradient mask path pattern polygon polyline     \
radialGradient rect stop svg text tspan                                          \
'.split(/\s/);


/**
 * Create hash for tags.
 * tagName as key, React.DOM generator as value.
 */
var caret = {};
TAGS.forEach(function (tag) {
  caret[tag] = function (config, children) {
    // Check arguments
    if (typeof children === 'undefined') {
      if (typeof config === 'string') {
        children = config;
        config = {};
      }
      else if (typeof config === 'object') {
        children = config;
        config = {};
      }
      else {
        throw new Error('invalid option or children');
      }
    }

    // Return React.DOM
    return React.DOM[tag](config, children);
  };
});


// Exports
if (module && module.exports) {
  module.exports = caret;
}
else {
  window.Caret = caret;
}
