/** @jsx React.DOM */
'use strict';

var React = require('react');
var Config = require('./Config');
var KeyActions = require('../actions/KeyActions');


var ConfigList = React.createClass({
  _moveRight: function () {

  },
  _moveLeft: function () {

  },
  componentDidMount: function () {
    var self = this;
    KeyActions.bind('shift+right', function (e) {
      self._moveRight();
    });
    KeyActions.bind('shift+left', function (e) {
      self._moveLeft();
    });
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
