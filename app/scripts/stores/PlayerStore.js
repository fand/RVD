'use strict';

var React = require('react');
var EventEmitter = require('events');
var merge = require('react/lib/merge');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var PlayerActions = require('../actions/PlayerActions');
var Constants = require('../Constants');
var CHANGE_EVENT = 'CHANGE_PLAYERSTORE';

var MutekiTimer = require('../util/MutekiTimer');
var T = new MutekiTimer();


// Private Data
var _bpm = 120;
var _duration = (60 / 4) * 1000 / _bpm;
var _pos = 0;
var _timer;


// Play / Pause
function play() {
  sync();
}
function pause() {
  T.clearTimeout(_timer);
}

// Sync videos to read next pattern
function sync() {
  PlayerActions.sync(_pos++);
  _timer = T.setTimeout(function () {
    sync();
  }, _duration);
}

// BPM operation
function speedUp() {
  _bpm++;
  _duration = (60 / 4) * 1000 / _bpm;
}
function speedDown() {
  _bpm--;
  _duration = (60 / 4) * 1000 / _bpm;
}


var PlayerStore = merge(EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addListener: function (e, callback) {
    this.on(e, callback);
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
      PlayerStore.emit(Constants.PLAYER_PAUSE);
      break;

      // events sent by this self
    case Constants.PLAYER_SYNC:
      PlayerStore.emit(Constants.PLAYER_SYNC, _pos);
      break;

      // BPM operation
    case Constants.PLAYER_SPEED_UP:
      speedUp();
      break;

    case Constants.PLAYER_SPEED_DOWN:
      speedDown();
      break;
    }
  })
});


module.exports = PlayerStore;
