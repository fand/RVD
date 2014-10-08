/** @jsx React.DOM */
'use strict';

var React = require('react');
var Config = require('./Config');
var Mode = require('../Mode');

var ConfigModel = function (sample) {
  this.sample = sample;

};

var ConfigList = React.createClass({
  componentDidMount: function () {
    Mode.on('config', function () {
      this.forceUpdate();
    }.bind(this));
    Mode.on('play', function () {
      this.forceUpdate();
    }.bind(this));
  },
  render: function () {
    return (
      <div className={'configList ' + Mode.mode + '-mode'}>
        {this.props.samples.map(function (sample) {
          return (<Config sample={sample} />);
        })}
      </div>
    );
  }
});



module.exports = ConfigList;
