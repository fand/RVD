/** @jsx React.DOM */
'use strict';

var React = require('react');
var c = require('../Caret');
var Mousetrap = require('mousetrap');

var Sample = React.createClass({
  play: function () {
    this.refs.dom.getDOMNode().play();
  },
  pause: function () {
    this.refs.dom.getDOMNode().pause();
  },
  render: function () {
    return (<video src={this.props.sample.url} ref="dom" />);
  }
});

var SampleList = React.createClass({
  getInitialState: function () {
    return {
      paused: true
    };
  },
  componentDidMount: function () {
    var self = this;
    Mousetrap.bind('space', function () {
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
    this.setState({
      paused: !this.state.paused
    });
  },
  render: function() {
    var renderSample = function(sample, i) {
      return (<Sample sample={sample} ref={'sample' + i} />);
    };
    return c.div({className: 'sampleList'}, this.props.samples.map(renderSample));
  }
});


module.exports = SampleList;
