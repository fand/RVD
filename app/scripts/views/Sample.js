/** @jsx React.DOM */
'use strict';

var React = require('react');

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
    var dom = this.refs.dom.getDOMNode();
    if (dom.duration) {
      this.refs.dom.getDOMNode().currentTime = time;
      this.props.sample.getThumb(this.refs.dom.getDOMNode());  // get thumbnail of video for config
    }
  },
  componentDidMount: function () {
    var dom = this.refs.dom.getDOMNode();
    if (! dom.duration) {
      var onload = function () {
        this.setTime(0);
        dom.removeEventListener('loadeddata', onload);
      }.bind(this);
      dom.addEventListener('loadeddata', onload);
    }
  },
  render: function () {
    return (<video preload src={this.props.sample.url} ref="dom" className={(this.state.paused)? 'paused': ''} />);
  }
});

module.exports = Sample;
