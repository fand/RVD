'use strict';

var Mousetrap = require('mousetrap');

var Keys = function () {
  this.mode = 'play';
  this.handlers = {
    play: {},
    config: {}
  };

  // push TAB to toggle play / config mode.
  Mousetrap.bind('tab', function () {
    this.toggleMode();
  }.bind(this));
};
Keys.prototype.toggleMode = function () {
  this.setMode((this.mode === 'play') ? 'config' : 'play');
};
Keys.prototype.setMode = function (mode) {
  for (var m in this.handlers) {
    if (m === mode) { continue; }
    for (var key in this.handlers[m]) {
      Mousetrap.unbind(key);
    }
  }
  for (var key in this.handlers.play) {
    Mousetrap.bind(key, this.handlers[mode][key]);
  }
};
Keys.prototype.addHandler = function (mode, key, handler) {
  this.handlers.play[key] = handler;
  if (this.mode === mode) {
    Mousetrap.bind(key, handler);
  }
};


module.exports = new Keys();
