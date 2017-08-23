/** @jsx React.DOM */
'use strict';

var React = require('react');
var Video = require('./Video');


var VideoList = React.createClass({
  getInitialState: function () {
    return { paused: true };
  },
  play: function () {
    this.props.samples.forEach(function (sample, i) {
      this.refs['sample' + i].play();
    }.bind(this));
  },
  pause: function () {
    this.props.samples.forEach(function (sample, i) {
      this.refs['sample' + i].pause();
    }.bind(this));
  },
  toggle: function () {
    (this.state.paused) ? this.play() : this.pause();
    this.setState({ paused: !this.state.paused });
  },
  renderVideo: function (sample, i) {
    return (<Video sample={sample} key={sample.id} ref={'sample' + i} />);
  },
  render: function() {
    return (<div className="sampleList">{this.props.samples.map(this.renderVideo)}</div>);
  }
});


module.exports = VideoList;
