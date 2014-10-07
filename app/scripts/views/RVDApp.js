/** @jsx React.DOM */
'use strict';

var React = require('react');
var SamplesManager = require('./SamplesManager');
var SampleList = require('./SampleList');
var ConfigList = require('./ConfigList');


/**
 * Holds models of mode, samples.
 */
var RVDApp = React.createClass({
  getInitialState: function() {
    return {
      mode: 'play',
      samples: []
    };
  },
  onSamplesUpdate: function (newSamples) {
    this.setState({ samples: newSamples });
  },
  render: function() {
    return (
      <div>
        <h1>RVD</h1>
        <SamplesManager samples={this.state.samples} onUpdate={this.onSamplesUpdate} />
        <SampleList samples={this.state.samples} />
        <ConfigList samples={this.state.samples} />
      </div>
    );
  }
});

module.exports = RVDApp;
