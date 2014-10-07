/** @jsx React.DOM */
'use strict';

var React = require('react');
var Dropper = require('./Dropper');


var SamplesManager = React.createClass({
  addSamples: function (addedSamples) {
    var newSamples = this.props.samples.concat(addedSamples)
    this.props.onUpdate(newSamples);
  },
  render: function() {
    return (
      // Element to Drop files on
      <Dropper samples={this.props.samples} onDrop={this.addSamples} />
    );
  }
});

module.exports = SamplesManager;
