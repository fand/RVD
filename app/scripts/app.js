/** @jsx React.DOM */
'use strict';

var React = window.React = require('react'),
    mountNode = document.getElementById('app');

var c = require('./Caret.js');

var Sample = function (file) {
  this.file = file;
  this.type = file.type;
  this.name = file.name;
  this.url = URL.createObjectURL(this.file);
};

var cancelEvent = function (e) {
  e.preventDefault();
  e.stopPropagation();
};

var Dropper = React.createClass({
  getInitialState: function () {
    return {
      over: false
    }
  },
  load: function (files) {
    var newSamples = [];
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      var sample = new Sample(file);
      newSamples.push(sample);
    }
    return newSamples;
  },
  onDragEnter: cancelEvent,
  onDragLeave: function (e) {
    cancelEvent(e);
    this.setState({
      samples: this.state.samples,
      over: false
    });
  },
  onDragOver: function (e) {
    cancelEvent(e);
    this.setState({
      over: true
    });
  },
  onDrop: function (e) {
    cancelEvent(e);
    var samples = this.load(e.dataTransfer.files);
    this.setState({
      over: false
    });
    this.props.onDrop(samples);
  },
  render: function() {
    var cls = 'dropper';
    if (this.state.over) {
      cls += ' over'
    }
    return c.div({
      className: cls,
      onDragEnter: this.onDragEnter,
      onDragLeave: this.onDragLeave,
      onDragOver: this.onDragOver,
      onDrop: this.onDrop
    }, '');
  }
});

var SampleList = React.createClass({
  render: function() {
    var renderSample = function(sample) {
      return c.li({}, sample.name + ' : ' + sample.type + ' :: ' + sample.url);
    };
    return c.ul({className: 'sampleList'}, this.props.samples.map(renderSample));
  }
});

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
      </div>
    );
  }
});

React.renderComponent(<RVDApp />, mountNode);
