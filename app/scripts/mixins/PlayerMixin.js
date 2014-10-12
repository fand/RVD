var React = require('react');
var Mousetrap = require('mousetrap');
var PlayerActions = require('../actions/PlayerActions');

// ユーザー入力によるイベント発火のみを扱う
// syncなど、timerによるイベント管理も考えたが、
// syncを発火するにはduration, bpmなどデータを保持する必要がある
// これはstoreと役割が被ってしまう
var isPlaying = false;
function toggle() {
  (isPlaying) ?
    PlayerActions.stop() :
    PlayerActions.play();
  isPlaying = !(isPlaying);
}

var PlayerMixin = {
  componentDidMount: function () {
    Mousetrap.bind('space', toggle);
  }
};

module.exports = PlayerMixin;
