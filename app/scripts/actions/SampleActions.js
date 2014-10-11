var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../Constants');

var SampleActions = {
  create: function (file) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SAMPLE_CREATE,
      file: file
    });
  },
  destroy: function (id) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SAMPLE_DESTROY,
      id: id
    });
  },
  createMultiple: function (files) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SAMPLE_CREATE_MULTIPLE,
      files: files
    });
  },
  setPattern: function (id, pattern) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SAMPLE_SET_PATTERN,
      id: id,
      pattern: pattern
    });
  }
};

module.exports = SampleActions;
