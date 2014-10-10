/** @jsx React.DOM */
'use strict';

var React = require('react');
var PlayerStore = require('../stores/PlayerStore');
var Constants = require('../Constants');

var Video = React.createClass({
  getInitialState: function () {
    return { paused: true };
  },
  play: function () {console.log('playyyyyyyyyyyyy');
    this.refs.dom.getDOMNode().play();
    this.setState({ paused: false });
  },
  pause: function () {
    this.refs.dom.getDOMNode().pause();
    this.setState({ paused: true });
  },
  stop: function () {
    this.refs.dom.getDOMNode().pause();
    this.refs.dom.getDOMNode().currentTime = 0;
    this.setState({ paused: true });
  },
  setTime: function (time) {
    var dom = this.refs.dom.getDOMNode();
    if (dom.duration) {
      this.refs.dom.getDOMNode().currentTime = time;
      this.props.sample.getThumb(this.refs.dom.getDOMNode());  // get thumbnail of video for config
    }
  },
  componentDidMount: function () {
    var self = this;
    var dom = this.refs.dom.getDOMNode();
    if (! dom.duration) {
      var onload = function () {
        self.setTime(0);
        dom.removeEventListener('loadeddata', onload);

        PlayerStore.addListener(Constants.PLAYER_PLAY, self.play);
        PlayerStore.addListener(Constants.PLAYER_STOP, self.stop);

      };
      dom.addEventListener('loadeddata', onload);
    }
  },
  render: function () {
    return (<video preload src={this.props.sample.url} ref="dom" className={(this.state.paused)? 'paused': ''} />);
  }
});

module.exports = Video;
