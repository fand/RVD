var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../Constants');

var KeyActions = {
  bind: function (key, listener) {
    AppDispatcher.handleViewAction({
      actionType: Constants.KEY_BIND,
      key: key,
      listener: listener
    });
  },
  unbind: function (key, listener) {
    AppDispatcher.handleViewAction({
      actionType: Constants.KEY_UNBIND,
      key: key,
      listener: listener
    });
  }
};

module.exports = KeyActions;
