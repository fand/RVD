/** @jsx React.DOM */
'use strict';

var React = require('react');
var Dropper = require('./Dropper');
var SampleActions = require('../actions/SampleActions');


var SamplesManager = React.createClass({
  addSamples: function (files) {
    SampleActions.createMultiple(files);
  },
  render: function() {
    return (
      // Element to Drop files on
      <Dropper samples={this.props.samples} onDrop={this.addSamples}
        hide={this.props.mode === 'config'} />
    );
  }
});

module.exports = SamplesManager;
