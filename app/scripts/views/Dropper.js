/** @jsx React.DOM */
'use strict';

var React = require('react');
var c = require('../Caret');
var Sample = require('../models/Sample');

var cancelEvent = function (e) {
  e.preventDefault();
  e.stopPropagation();
};


/**
 * Adds samples on Drop.
 */
var Dropper = React.createClass({
  getInitialState: function () {
    return {
      over: false
    }
  },
  load: function (files) {
    var newSamples = [];
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var sample = new Sample(file);
      newSamples.push(sample);
    }
    return newSamples;
  },
  onDragEnter: cancelEvent,
  onDragLeave: function (e) {
    cancelEvent(e);
    this.setState({
      samples: this.state.samples,
      over: false
    });
  },
  onDragOver: function (e) {
    cancelEvent(e);
    this.setState({
      over: true
    });
  },
  onDrop: function (e) {
    cancelEvent(e);
    var samples = this.load(e.dataTransfer.files);
    this.setState({
      over: false
    });
    this.props.onDrop(samples);
  },
  render: function() {
    var cls = 'dropper';
    if (this.state.over) {
      cls += ' over'
    }
    return c.div({
      className: cls,
      onDragEnter: this.onDragEnter,
      onDragLeave: this.onDragLeave,
      onDragOver: this.onDragOver,
      onDrop: this.onDrop
    }, '');
  }
});

module.exports = Dropper;
