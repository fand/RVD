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
  },
  setSample: function (id, file) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SAMPLE_SET_SAMPLE,
      id: id,
      file: file
    });
  },
  setDOM: function (id, dom) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SAMPLE_SET_DOM,
      id: id,
      dom: dom
    });
  },
  setTime: function (id, time) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SAMPLE_SET_TIME,
      id: id,
      time: time
    });
  },
  setDuration: function (id, duration) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SAMPLE_SET_DURATION,
      id: id,
      duration: duration
    });
  },
  updateThumb: function (id) {
    AppDispatcher.handleViewAction({
      actionType: Constants.SAMPLE_UPDATE_THUMB,
      id: id
    });
  }
};

module.exports = SampleActions;
