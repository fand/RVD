'use strict';

var React = require('react');

var tags = ['div', 'span',
            'form', 'input', 'textarea',
            'ol', 'ul', 'li',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

var c = {};
tags.forEach(function (tag) {
  c[tag] = function (config, children) {
    if (typeof config === 'undefined') {
      children = config;
      config = {};
    }
    return React.DOM[tag](config, children);
  };
});


module.exports = c;
