/** @jsx React.DOM */
'use strict';

var React = require('react');
var SamplesManager = require('./SamplesManager');
var VideoList = require('./VideoList');
var ConfigList = require('./ConfigList');
var SampleStore = require('../stores/SampleStore');
var ModeStore = require('../stores/ModeStore');
var KeyStore = require('../stores/KeyStore');
var KeyActions = require('../actions/KeyActions');

var PlayerMixin = require('../mixins/PlayerMixin');
var ModeMixin = require('../mixins/ModeMixin');


var getState = function () {
  return {
    samples: SampleStore.getSamples(),
    mode: ModeStore.getMode()
  }
};


/**
 * Holds models of mode, samples.
 */
var RVDApp = React.createClass({
  mixins: [PlayerMixin, ModeMixin],
  getInitialState: function() {
    return getState();
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
        <SamplesManager samples={this.state.samples} mode={this.state.mode}/>
        <VideoList samples={this.state.samples} />
        <ConfigList
          samples={this.state.samples}
          mode={this.state.mode} />
      </div>
    );
  }
});

module.exports = RVDApp;
