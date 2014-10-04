/** @jsx React.DOM */
'use strict';

var React = require('react');
var c = require('../Caret');

var Sample = React.createClass({
  render: function () {
    return (
      <video className="sample">
        <source src={this.props.sample.url} />
      </video>
    );
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
