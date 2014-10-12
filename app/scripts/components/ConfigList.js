/** @jsx React.DOM */
'use strict';

var React = require('react');
var Config = require('./Config');

var ConfigList = React.createClass({
  componentDidMount: function () {
  },
  render: function () {
    var configs = this.props.samples.map(function (sample) {
      return (<Config sample={sample} />);
    });
    return (
      <div className={'configList ' + this.props.mode + '-mode'}>
        {configs}
      </div>
    );
  }
});


module.exports = ConfigList;
