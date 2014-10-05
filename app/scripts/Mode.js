'use strict';

var Mousetrap = require('mousetrap');
var RVDApp = require('./views/RVDApp');

var Mode = function () {
  this.mode = 'play';
  this.keybinds = {
    play: {},
    config: {}
  };
  this.globalKeybinds = {};
  this.listeners = {
    play: [],
    config: []
  };
};

Mode.prototype.addGlobalKeybinds = function (key, keybind) {
  this.globalKeybinds[key] = keybind;
  this.bindGlobals();
};
Mode.prototype.bindGlobals = function () {
  for (var k in this.globalKeybinds) {
    Mousetrap.bind(k, this.globalKeybinds[k]);
  }
};

Mode.prototype.toggleMode = function () {
  this.setMode((this.mode === 'play') ? 'config' : 'play');
};

Mode.prototype.setMode = function (mode) {
  // Set mode.
  this.mode = mode;
  
  // Unbind all.
  for (var m in this.keybinds) {
    if (m === mode) { continue; }
    for (var key in this.keybinds[m]) {
      Mousetrap.unbind(key);
    }
  }
  
  // Bind for new mode.
  for (var key in this.keybinds[mode]) {
    Mousetrap.bind(key, this.keybinds[mode][key]);
  }

  // Bind globals.
  this.bindGlobals();

  // Run listeners.
  this.listeners[mode].forEach(function (listener) {
    listener();
  });
};

Mode.prototype.addKeybind = function (mode, key, keybind) {
  this.keybinds.play[key] = keybind;
  if (this.mode === mode) {
    Mousetrap.bind(key, keybind);
  }
};

Mode.prototype.on = function (mode, listener) {
  this.listeners[mode].push(listener);
};


// Exports
var mode = new Mode();
// push TAB to toggle play / config mode.
mode.addGlobalKeybinds('tab', function (e) {
  e.preventDefault();
  mode.toggleMode();
});      

module.exports = mode;
