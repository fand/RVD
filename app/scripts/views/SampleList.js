/** @jsx React.DOM */
'use strict';

var React = require('react');
var c = require('../Caret');
var Keys = require('../Keys');

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

var SampleList = React.createClass({
  getInitialState: function () {
    return { paused: true };
  },
  componentDidMount: function () {
    var self = this;
    Keys.addHandler('play', 'space', function () {
      this.toggle();
    }.bind(this));
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
  render: function() {
    var renderSample = function(sample, i) {
      return (<Sample sample={sample} ref={'sample' + i} />);
    };
    return c.div({className: 'sampleList'}, this.props.samples.map(renderSample));
  }
});


module.exports = SampleList;
