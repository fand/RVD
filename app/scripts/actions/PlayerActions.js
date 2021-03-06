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
  sync: function (time) {
    AppDispatcher.handleViewAction({
      actionType: Constants.PLAYER_SYNC,
      time: time
    });
  },
  speedUp: function () {
    AppDispatcher.handleViewAction({
      actionType: Constants.PLAYER_SPEED_UP
    });
  },
  speedDown: function () {
    AppDispatcher.handleViewAction({
      actionType: Constants.PLAYER_SPEED_DOWN
    });
  }
};

module.exports = PlayerActions;
