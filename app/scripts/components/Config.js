/** @jsx React.DOM */
'use strict';

var React = require('react');
var Dropper = require('./Dropper');
var HexLine = require('./HexLine');
var SampleActions = require('../actions/SampleActions');

var Config =  React.createClass({
  getInitialState: function () {
    return {
      time: 0,
      rate: 1.0,
      pattern: '888a'
    };
  },
  onPatternChange: function (e) {
    var newPattern = e.target.value;
    this.setState({
      pattern: newPattern
    });
    SampleActions.setPattern(this.props.sample.id, newPattern);
  },
  onDrop: function (addedSamples) {
    //SampleActions.setSample(this.props.sample, addedSamples[0]);
  },
  render: function () {
    return (
      <div className="config">
        <Dropper onDrop={this.onDrop} />
        <img src={this.props.sample.thumbUrl} />
        <HexLine onChange={this.onPatternChange} value={this.state.pattern} />
      </ div>
    );
  }
});


module.exports = Config;
