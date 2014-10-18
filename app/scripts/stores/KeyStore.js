'use strict';

var React = require('react');
var EventEmitter = require('events');
var merge = require('react/lib/merge');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../Constants');
var CHANGE_EVENT = 'CHANGE_KEYSTORE';

var Mousetrap = require('mousetrap');

var _keybinds = {};

var initKey = function (key) {
  _keybinds[key] = [];
  Mousetrap.bind(key, function (e) {
    _keybinds[key].forEach(function (l) {
      l(e);
    });
  });
};

var _bind = function (key, listener) {
  if (!_keybinds[key]) {
    initKey(key);
  }
  _keybinds[key].push(listener);
};
var bind = function (_keys, listener) {
  var keys = ((Array.isArray(_keys)) ? _keys : [_keys]);
  keys.forEach(function (key) {
    _bind(key, listener);
  });
};
var _unbind = function (key, listener) {
  if (_keybinds[key]) {
    var idx;
    while ((idx = _keybinds[key].indexOf(listener)) != -1) {
      _keybinds[key].splice(idx, 1);
    }
  }
};
var unbind = function (_keys, listener) {
  var keys = ((Array.isArray(_keys)) ? _keys : [_keys]);
  keys.forEach(function (key) {
    _unbind(key, listener);
  });
};


var KeyStore = merge(EventEmitter.prototype, {
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
    case Constants.KEY_BIND:
      bind(action.key, action.listener);
      KeyStore.emitChange();
      break;

    case Constants.KEY_UNBIND:
      unbind(action.key, action.listener);
      KeyStore.emitChange();
      break;
    }
  })
});


module.exports = KeyStore;
