/** @jsx React.DOM */
'use strict';

var React = require('react');
var PlayerStore = require('../stores/PlayerStore');
var SampleStore = require('../stores/SampleStore');
var Constants = require('../Constants');
var SampleActions = require('../actions/SampleActions');


var Video = React.createClass({
  getInitialState: function () {
    return { paused: true };
  },
  play: function () {
    this.refs.dom.getDOMNode().currentTime = this.props.sample.time;
    this.refs.dom.getDOMNode().play();
    this.setState({ paused: false });
  },
  pause: function () {
    this.refs.dom.getDOMNode().pause();
    this.setState({ paused: true });
  },
  sync: function (time) {
    if (this.props.sample.getNote(time)) {
      this.play();
    } else {
      this.pause();
    }
  },
  _init: function () {
    var dom = this.refs.dom.getDOMNode();
    dom.removeEventListener('loadeddata', this._init);
    PlayerStore.addListener(Constants.PLAYER_PLAY, this.play);
    PlayerStore.addListener(Constants.PLAYER_PAUSE, this.pause);
    PlayerStore.addListener(Constants.PLAYER_SYNC, this.sync);
    SampleStore.addListener(Constants.SAMPLE_SET_SAMPLE, this._update);
    SampleActions.setDOM(this.props.sample.id, dom);
  },
  _updateThumb: function () {
    var dom = this.refs.dom.getDOMNode();
    dom.removeEventListener('loadeddata', this._updateThumb);
    SampleActions.setDOM(this.props.sample.id, this.refs.dom.getDOMNode());
  },
  _update: function () {
    var dom = this.refs.dom.getDOMNode();
    if (dom.duration) {
      this._updateThumb();
    } else {
      dom.addEventListener('loadeddata', this._updateThumb);
    }
  },
  componentDidMount: function () {
    var dom = this.refs.dom.getDOMNode();
    if (dom.duration) {
      this._init();
    } else {
      dom.addEventListener('loadeddata', this._init);
    }
  },
  render: function () {
    return (<video preload src={this.props.sample.url} ref="dom" className={(this.state.paused)? 'paused': ''} />);
  }
});

module.exports = Video;
