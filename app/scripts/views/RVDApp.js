/** @jsx React.DOM */
'use strict';

var React = require('react');
var c = require('../Caret');
var Dropper = require('./Dropper');
var SampleList = require('./SampleList');
var ConfigList = require('./ConfigList');


/**
 * Manages samples.
 *
 */
var RVDApp = React.createClass({
  getInitialState: function() {
    return {
      samples: []
    };
  },
  addSamples: function (newSamples) {
    var samples = this.state.samples;
    this.setState({
      samples: samples.concat(newSamples)
    });
  },
  render: function() {
    return (
      <div>
        <h1>RVD</h1>
        <Dropper samples={this.state.samples} onDrop={this.addSamples} />
        <SampleList samples={this.state.samples} />
        <ConfigList samples={this.state.samples} />
      </div>
    );
  }
});

module.exports = RVDApp;
