var React = require('react');
var Mousetrap = require('mousetrap');
var PlayerActions = require('../actions/PlayerActions');

// ユーザー入力によるイベント発火のみを扱う
// syncなど、timerによるイベント管理をここに書く事も考えたが、
// syncを発火するにはduration, bpmなどデータを保持する必要がある
// これはstoreと役割が被ってしまう
var isPlaying = false;
function toggle() {
  (isPlaying) ?
    PlayerActions.pause() :
    PlayerActions.play();
  isPlaying = !(isPlaying);
}

// bpm操作
function speedUp() {
  PlayerActions.speedUp();
}
function speedDown() {
  PlayerActions.speedDown();
}

var PlayerMixin = {
  componentDidMount: function () {
    Mousetrap.bind('space', toggle);
    Mousetrap.bind('+', speedUp);
    Mousetrap.bind('-', speedDown);
  }
};

module.exports = PlayerMixin;
