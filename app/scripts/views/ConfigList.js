/** @jsx React.DOM */
'use strict';

var React = require('react');
var c = require('../Caret');
var Config = require('./Config');

var ConfigModel = function (sample) {
  this.sample = sample;

};

var ConfigList = React.createClass({

  render: function () {
    return (
      c.div({
        className: 'configList'
      },this.props.samples.map(function (sample) {
        return <Config sample={sample} />
      }))
    );
  }
});


module.exports = ConfigList;
