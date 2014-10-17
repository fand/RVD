/** @jsx React.DOM */
'use strict';

var React = require('react');
var Dropper = require('./Dropper');
var HexLine = require('./HexLine');
var TimeLine = require('./TimeLine');
var SampleActions = require('../actions/SampleActions');

var getState = function (sample) {
  return {
    pattern: sample.string,
    time: sample.time
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
  onTimeChange: function (newTime) {console.log('ontimechange');
    this.setState({
      time: newTime
    });
    SampleActions.setTime(this.props.sample.id, newTime);
  },
  onDrop: function (newFiles) {
    SampleActions.setSample(this.props.sample.id, newFiles[0]);
  },
  render: function () {
    var cls = 'config ' + this.props.className;
    return (
      <div className={cls}>
        <Dropper onDrop={this.onDrop}>
          <img src={this.props.sample.thumbUrl} />
          <div className="config-content">
            <HexLine onChange={this.onPatternChange} sample={this.props.sample} />
            <TimeLine onChange={this.onTimeChange} sample={this.props.sample} />
          </div>
        </Dropper>
      </ div>
    );
  }
});


module.exports = Config;
