/** @jsx React.DOM */
'use strict';

var React = require('react');
var c = require('../Caret');

var Sample = React.createClass({
  getInitialState: function () {
    return { paused: true };
  },
  play: function () {
    this.refs.dom.getDOMNode().play();
    this.setState({ paused: false });
  },
  pause: function () {
    this.refs.dom.getDOMNode().pause();
    this.setState({ paused: true });
  },
  render: function () {
    return (<video src={this.props.sample.url} ref="dom" className={(this.state.paused)? 'paused': ''} />);
  }
});

module.exports = Sample;
