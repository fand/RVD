/** @jsx React.DOM */
'use strict';

var React = require('react');
var c = require('../Caret');
var Mousetrap = require('mousetrap');

var Sample = React.createClass({
  componentDidMount: function () {
    var self = this;
    Mousetrap.bind('space', function () {
      self.toggle();
    });
  },
  toggle: function () {
    var dom = this.refs.dom.getDOMNode();
    (dom.paused) ?  dom.play() : dom.pause();
  },
  render: function () {
    return (<video src={this.props.sample.url} ref="dom" />);
  }
});

var SampleList = React.createClass({
  render: function() {
    var renderSample = function(sample) {
      return (<Sample sample={sample} />);
    };
    return c.div({className: 'sampleList'}, this.props.samples.map(renderSample));
  }
});


module.exports = SampleList;
