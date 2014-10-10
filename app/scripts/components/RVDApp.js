/** @jsx React.DOM */
'use strict';

var React = require('react');
var SamplesManager = require('./SamplesManager');
var VideoList = require('./VideoList');
var ConfigList = require('./ConfigList');
var SampleStore = require('../stores/SampleStore');
var ModeStore = require('../stores/ModeStore');



var getState = function () {
  return {
    samples: SampleStore.getAllSamples(),
    mode: ModeStore.getMode()
  }
};


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
  componentDidMount: function () {
    SampleStore.addListener(this.onSamplesUpdate);
    ModeStore.addListener(this.onModeUpdate);
  },
  componentWillUnmount: function () {
    SampleStore.removeListener(this.onSamplesUpdate);
    ModeStore.removeListener(this.onModeUpdate);
  },
  onSamplesUpdate: function () {
    this.setState({ samples: SampleStore.getSamples() });
  },
  onModeUpdate: function () {
    this.setState({ mode: ModeStore.getMode() });
  },
  render: function() {
    return (
      <div>
        <h1>RVD</h1>
        <SamplesManager samples={this.state.samples} />
        <VideoList samples={this.state.samples} />
        <ConfigList samples={this.state.samples} />
      </div>
    );
  }
});

module.exports = RVDApp;
