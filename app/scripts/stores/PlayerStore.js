'use strict';

var React = require('react');
var EventEmitter = require('events');
var merge = require('react/lib/merge');
var AppDispatcher = require('../dispatcher/AppDispatcher');
//var SampleActions = require('../actions/SampleActions');
var PlayerActions = require('../actions/PlayerActions');
var Constants = require('../Constants');
var CHANGE_EVENT = 'CHANGE_PLAYERSTORE';

// timerによるイベント発火まではしない

// Private Data
var _bpm = 120;
var _duration = 60 * 1000 / _bpm;
var _pos = 0;
var _timer;


// called from self
function play() {
  sync();
}
function pause() {
  window.clearTimeout(_timer);
}
function stop() {
  //VideoActions.stop();
  window.clearTimeout(_timer);
  _pos = 0;
}

function sync() {
  PlayerActions.sync(_pos++);
  _timer = window.setTimeout(function () {
    sync();
  }, _duration);
}

var PlayerStore = merge(EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addListener: function (e, callback) {
    this.on(e, callback);
  },
  removeListener: function (e, callback) {
    this.removeListener(e, callback);
  },

  // イベント受信時の動作を登録
  dispatcherIndex: AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {

      // events sent by user
    case Constants.PLAYER_PLAY:
      play();
      PlayerStore.emit(Constants.PLAYER_PLAY);
      break;

    case Constants.PLAYER_PAUSE:
      pause();
      PlayerStore.emitChange();
      break;

    case Constants.PLAYER_STOP:
      stop();
      PlayerStore.emit(Constants.PLAYER_STOP);
      break;


      // events sent by this self
    case Constants.PLAYER_SYNC:
      PlayerStore.emit(Constants.PLAYER_SYNC, _pos);
      break;
    }
  })
});


module.exports = PlayerStore;
