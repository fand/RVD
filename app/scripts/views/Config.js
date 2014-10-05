/** @jsx React.DOM */
'use strict';

var React = require('react');
var c = require('../Caret');

var Config =  React.createClass({
  getInitialState: function () {
    return {
      pattern: '888a'
    };
  },
  onPatternChange: function () {
    console.log('pattern change!!');
  },
  render: function () {
    return (
      <div className="config">
        <img src={this.props.sample.thumbUrl} />
        <span className="hexline">
          0x<input type="text" onChange={this.onPatternChange} value={this.state.pattern} />
        </span>
      </ div>
    );
  }
});


module.exports = Config;
