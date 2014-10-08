'use strict';

var React = require('react');
var EventEmitter = require('events');
var merge = require('react/lib/merge');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../Constants');
var CHANGE_EVENT = 'CHANGE_MODESTORE';

// Private Data
var _mode = 'play';
var toggle = function () {
  _mode = (_mode === 'play') ? 'config' : 'play';
};
var set = function (newMode) {
  _mode = newMode;
};


var ModeStore = merge(EventEmitter.prototype, {
  getMode: function () {
    return _mode;
  },
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  // イベント受信時の動作を登録
  dispatcherIndex: AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
    case Constants.MODE_TOGGLE:
      toggle();
      ModeStore.emitChange();
      break;

    case Constants.MODE_SET:
      set(action.mode);
      ModeStore.emitChange();
      break;
    }
  })
});


module.exports = ModeStore;
