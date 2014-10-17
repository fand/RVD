/** @jsx React.DOM */
'use strict';

var React = require('react');
var SamplesManager = require('./SamplesManager');
var VideoList = require('./VideoList');
var ConfigList = require('./ConfigList');
var SampleStore = require('../stores/SampleStore');
var KeyStore = require('../stores/KeyStore');
var KeyActions = require('../actions/KeyActions');
var Constants = require('../Constants.js');

var PlayerMixin = require('../mixins/PlayerMixin');


var getState = function () {
  return {
    samples: SampleStore.getSamples()
  };
};


/**
 * Holds models of mode, samples.
 */
var RVDApp = React.createClass({
  mixins: [PlayerMixin],
  getInitialState: function() {
    return getState();
  },
  componentDidMount: function () {
    SampleStore.addListener(Constants.SAMPLE_CHANGE, this.onSamplesUpdate);
  },
  componentWillUnmount: function () {
    SampleStore.removeListener(Constants.SAMPLE_CHANGE, this.onSamplesUpdate);
  },
  onSamplesUpdate: function () {
    this.setState({ samples: SampleStore.getSamples() });
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
