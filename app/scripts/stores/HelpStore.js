'use strict';

var React = require('react');
var EventEmitter = require('events');
var merge = require('react/lib/merge');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../Constants');
var CHANGE_EVENT = 'CHANGE_HELPSTORE';

var HelpStore = merge(EventEmitter.prototype, {
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
      case Constants.HELP_TOGGLE:
        HelpStore.emitChange();
        break;
      case Constants.HELP_HIDE:
        HelpStore.emit(Constants.HELP_HIDE);
        break;
    }
  })
});


module.exports = HelpStore;
