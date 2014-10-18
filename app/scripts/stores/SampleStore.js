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
var _ids = {};
var create = function (file) {
  if (! Sample.isValid(file)) { return; }
  var sample = new Sample(file);
  _samples.push(sample);
  _ids[sample.id] = _samples.length - 1;
};
var destroy = function (id) {
  _samples = _samples.filter(function (s) {
    return (s.id !== id);
  });
  delete _ids[id];
};
var createMultiple = function (files) {
  files.forEach(create);
};

var setPattern = function (id, pattern) {
  var idx = _ids[id];
  _samples[idx].setPattern(pattern);
};

var setSample = function (id, sample) {
  var idx = _ids[id];
  _samples[idx].setSample(sample);
};

var setDOM = function (id, dom) {
  var idx = _ids[id];
  _samples[idx].setDOM(dom);
};

var setTime = function (id, sample) {
  var idx = _ids[id];
  _samples[idx].setTime(sample);
};

var updateThumb = function (id) {
  var idx = _ids[id];
  _samples[idx].updateThumb();
};

var SampleStore = merge(EventEmitter.prototype, {
  hasSamples: function () {
    return (_samples.length > 0);
  },
  getSamples: function () {
    return _samples;
  },
  emitChange: function () {
    this.emit(Constants.SAMPLE_CHANGE);
  },
  addListener: function (e, callback) {
    this.on(e, callback);
  },

  // イベント受信時の動作を登録
  dispatcherIndex: AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
    case Constants.SAMPLE_CREATE:
      create(action.file);
      SampleStore.emitChange();
      break;

    case Constants.SAMPLE_DESTROY:
      destroy(action.id);
      SampleStore.emitChange();
      break;

    case Constants.SAMPLE_CREATE_MULTIPLE:
      _.each(action.files, function (file) {
        create(file);
      });
      SampleStore.emitChange();
      break;

    case Constants.SAMPLE_SET_PATTERN:
      setPattern(action.id, action.pattern);
      SampleStore.emitChange();
      break;

    case Constants.SAMPLE_SET_SAMPLE:
      setSample(action.id, action.file);
      SampleStore.emit(Constants.SAMPLE_SET_SAMPLE);
      SampleStore.emitChange();
      break;

    case Constants.SAMPLE_SET_TIME:
      setTime(action.id, action.time);
      SampleStore.emitChange();
      break;

    case Constants.SAMPLE_SET_DOM:
      setDOM(action.id, action.dom);
      SampleStore.emitChange();
      break;

    case Constants.SAMPLE_UPDATE_THUMB:
      updateThumb(action.id);
      SampleStore.emitChange();
      break;

    }
  })
});


module.exports = SampleStore;
