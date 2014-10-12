var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../Constants');

var ModeActions = {
  toggle: function () {
    AppDispatcher.handleViewAction({
      actionType: Constants.MODE_TOGGLE
    });
  },
  set: function (mode) {
    AppDispatcher.handleViewAction({
      actionType: Constants.PLAYER_SET,
      mode: mode
    });
  }
};

module.exports = ModeActions;
