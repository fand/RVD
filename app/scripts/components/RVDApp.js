/** @jsx React.DOM */
'use strict';

var React = require('react');
var Dropper = require('./Dropper');
var Header = require('./Header');
var SamplesManager = require('./SamplesManager');
var VideoList = require('./VideoList');
var ConfigList = require('./ConfigList');
var SampleStore = require('../stores/SampleStore');
var KeyStore = require('../stores/KeyStore');
var KeyActions = require('../actions/KeyActions');
var SampleActions = require('../actions/SampleActions');
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
  onDrop: function (files) {
    SampleActions.createMultiple(files);
  },
  render: function() {
    return (
      <div>
        <Dropper onDrop={this.onDrop}>
          <Header />
          <VideoList samples={this.state.samples} />
          <ConfigList samples={this.state.samples} />
        </Dropper>
      </div>
    );
  }
});

module.exports = RVDApp;
