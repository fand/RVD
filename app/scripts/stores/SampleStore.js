'use strict';

var React = require('react');
var EventEmitter = require('events');
var merge = require('react/lib/merge');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../Constants');
var CHANGE_EVENT = 'CHANGE_SAMPLESTORE';
var _ = require('lodash');

// Model
var Sample = require('../models/Sample');

// Private Data
var _samples = [];
var create = function (file) {
  if (! Sample.isValid(file)) { return; }
  _samples.push(new Sample(file));
};
var destroy = function (id) {
  _samples = _samples.filter(function (s) {
    return (s.id !== id);
  });
};
var createMultiple = function (files) {
  files.forEach(create);
};


var SampleStore = merge(EventEmitter.prototype, {
  getSamples: function () {
    return _samples;
  },
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  // イベント受信時の動作を登録
  dispatcherIndex: AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
    case Constants.SAMPLE_CREATE:
      create(action.file);
      SampleStore.emitChange();
      break;

    case Constants.SAMPLE_DELETE:
      destroy(action.id);
      SampleStore.emitChange();
      break;

    case Constants.SAMPLE_CREATE_MULTIPLE:
      _.each(action.files, function (file) {
        create(file);
      });
      SampleStore.emitChange();
      break;

    }
  })
});


module.exports = SampleStore;
