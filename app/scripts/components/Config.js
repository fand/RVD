/** @jsx React.DOM */
'use strict';

var React = require('react');
var Dropper = require('./Dropper');
var HexLine = require('./HexLine');
var SampleActions = require('../actions/SampleActions');

var getState = function (sample) {
  return {
    pattern: sample.string
  };
};

var Config =  React.createClass({
  getInitialState: function () {
    return getState(this.props.sample);
  },
  onPatternChange: function (newPattern) {
    this.setState({
      pattern: newPattern
    });
    SampleActions.setPattern(this.props.sample.id, newPattern);
  },
  onDrop: function (addedSamples) {
    SampleActions.setSample(this.props.sample, addedSamples[0]);
  },
  render: function () {
    return (
      <div className="config">
        <Dropper onDrop={this.onDrop}>
          <img src={this.props.sample.thumbUrl} />
          <HexLine onChange={this.onPatternChange} sample={this.props.sample} />
        </Dropper>
      </ div>
    );
  }
});


module.exports = Config;
