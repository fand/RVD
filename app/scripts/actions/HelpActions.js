var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../Constants');

var HelpActions = {
  toggle: function (key, listener) {
    AppDispatcher.handleViewAction({
      actionType: Constants.HELP_TOGGLE
    });
  }
};

module.exports = HelpActions;
