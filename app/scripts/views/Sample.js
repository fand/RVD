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
  setTime: function (time) {
    this.refs.dom.getDOMNode().currentTime = time;
    //this.props.sample.takeapicture();  // TODO: get thumbnail of video for config
  },
  componentDidMount: function () {
    this.setTime(0);
  },
  render: function () {
    return (<video src={this.props.sample.url} ref="dom" className={(this.state.paused)? 'paused': ''} />);
  }
});

module.exports = Sample;
