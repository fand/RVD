/** @jsx React.DOM */
'use strict';

var React = require('react');
var Dropper = require('./Dropper');
var PatternInput = require('./PatternInput');
var TimeInput = require('./TimeInput');
var SampleActions = require('../actions/SampleActions');


var Edit =  React.createClass({
  onPatternChange: function (newPattern) {
    SampleActions.setPattern(this.props.sample.id, newPattern);
  },
  onTimeChange: function (newTime) {
    SampleActions.setTime(this.props.sample.id, newTime);
  },
  onDurationChange: function (newDuration) {
    SampleActions.setDuration(this.props.sample.id, newDuration);
  },
  onDrop: function (newFiles) {
    SampleActions.setSample(this.props.sample.id, newFiles[0]);
  },
  render: function () {
    var cls = 'edit ' + this.props.className;
    return (
      <div className={cls}>
        <Dropper onDrop={this.onDrop}>
          <img src={this.props.sample.thumbUrl} />
          <div className="edit-content">

            <PatternInput
              onChange={this.onPatternChange}
              sample={this.props.sample}
              isFocused={this.props.focus === 'pattern'} />

            <TimeInput
              onTimeChange={this.onTimeChange}
              onDurationChange={this.onDurationChange}
              sample={this.props.sample}
              isFocused={this.props.focus === 'time'} />

          </div>
        </Dropper>
      </ div>
    );
  }
});


module.exports = Edit;
