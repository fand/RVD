var React = require('react');
var Mousetrap = require('mousetrap');
var ModeActions = require('../actions/ModeActions');

function toggle() {
  ModeActions.toggle();
}

var PlayerMixin = {
  componentDidMount: function () {
    Mousetrap.bind('esc', toggle);
  }
};

module.exports = PlayerMixin;
