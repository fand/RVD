/** @jsx React.DOM */
'use strict';

var React = require('react');
var Dropper = require('./Dropper');

var Config =  React.createClass({
  getInitialState: function () {
    return {
      time: 0,
      rate: 1.0,
      pattern: '888a'
    };
  },
  onPatternChange: function (e) {
    this.setState({
      pattern: e.target.value
    }, function () {
      // console.log('pattern changed!!');
      // console.log(this.state);
    });
  },
  onDrop: function (addedSamples) {
    var newSample = addedSamples[0];
    SampleDispatcher.setSample
    var newSamples = this.props.sample
    this.props.onUpdate(newSamples);
  },
  render: function () {
    return (
      <div className="config">
        <Dropper onDrop={this.onDrop} />
        <img src={this.props.sample.thumbUrl} />
        <span className="hexline">
          0x<input type="text" onChange={this.onPatternChange} value={this.state.pattern} />
        </span>
      </ div>
    );
  }
});


module.exports = Config;
