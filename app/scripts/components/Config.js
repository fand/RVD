/** @jsx React.DOM */
'use strict';

var React = require('react');
var Dropper = require('./Dropper');
var HexLine = require('./HexLine');
var TimeLine = require('./TimeLine');
var SampleActions = require('../actions/SampleActions');


var Config =  React.createClass({
  onPatternChange: function (newPattern) {
    SampleActions.setPattern(this.props.sample.id, newPattern);
  },
  onTimeChange: function (newTime) {
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
            <HexLine onChange={this.onPatternChange} sample={this.props.sample}
              isFocused={this.props.focus === 'pattern'} />
            <TimeLine onChange={this.onTimeChange} sample={this.props.sample}
              isFocused={this.props.focus === 'time'} />
          </div>
        </Dropper>
      </ div>
    );
  }
});


module.exports = Config;
