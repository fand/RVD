/** @jsx React.DOM */
'use strict';

var React = require('react');
var SampleManager = require('./SampleManager');


/** 
 * Manages global mode & keybindings of RVDApp.
 */
var RVDApp = React.createClass({
  getInitialState: function() {
    return {
      mode: 'play'
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
        <SampleManager />
      </div>
    );
  }
});

module.exports = RVDApp;
