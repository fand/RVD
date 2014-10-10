var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../Constants');

var PlayerActions = {
  play: function () {
    AppDispatcher.handleViewAction({
      actionType: Constants.PLAYER_PLAY
    });
  },
  pause: function () {
    AppDispatcher.handleViewAction({
      actionType: Constants.PLAYER_PAUSE
    });
  },
  stop: function () {
    AppDispatcher.handleViewAction({
      actionType: Constants.PLAYER_STOP
    });
  },
  sync: function (time) {
    AppDispatcher.handleViewAction({
      actionType: Constants.PLAYER_SYNC,
      time: time
    });
  }
};

module.exports = PlayerActions;
