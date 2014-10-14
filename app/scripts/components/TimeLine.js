/** @jsx React.DOM */
'use strict';

var React = require('react');
var KeyActions = require('../actions/KeyActions');

var numkeys = ('0123456789').split('');

var TimeLine = React.createClass({
  getInitialState: function () {
    return {
      isFocused: false,
      x: 0,
    };
  },
  ifFocusedThen: function (e, cb) {
    if (! this.state.isFocused) { return; }
    e.preventDefault();
    e.stopPropagation();
    cb();
  },
  componentDidMount: function () {
    var self = this;
    numkeys.forEach(function (key) {
      KeyActions.bind(key, function (e) {
        if (! self.state.isFocused) { return; }
        self.onKeyPressed(key);
      });
    });
    KeyActions.bind('left', function (e) {
      self.ifFocusedThen(e, self._moveLeft);
    });
    KeyActions.bind('right', function (e) {
      self.ifFocusedThen(e, self._moveRight);
    });
    KeyActions.bind(['del', 'backspace'], function (e) {
      if (! self.state.isFocused) { return; }
      self.onKeyPressed('0');
    });
    KeyActions.bind(['enter'], function (e) {
      self.setState({ isFocused: false });
    });
  },
  _moveRight: function () {
    if (this.state.x < 15) {
      this.setState({ x: this.state.x + 1 });
    }
  },
  _moveLeft: function () {
    if (this.state.x > 0) {
      this.setState({ x: this.state.x - 1 });
    }
  },
  onKeyPressed: function (key) {
    var str = this.props.sample.time;
    var pos = this.state.x;
    var newTime = (str.substring(0, pos) + key + str.substring(pos + 1)).toUpperCase();

    this.props.onChange(newTime);
    this._moveRight();
  },
  onClick: function () {
    this.setState({
      isFocused: true
    });
  },
  onChange: function (str) {
    this.props.onChange(str);
  },
  renderLine: function () {
    var str = this.props.sample.string + '　';
    return (
      <span className="timeline-display">
        <span>{'0x' + str.substring(0, this.state.x)}</span>
        <span className="timeline-invert">{str[this.state.x]}</span>
        <span>{str.substring(this.state.x + 1)}</span>
      </span>
    );
  },
  render: function () {
    var display = this.renderLine();
    var suffix = (this.state.isFocused) ? ' focused' : '';
    return (
      <div className={"timeline" + suffix} onClick={this.onClick}>
        {display}
      </div>
    );
  }
});


module.exports = TimeLine;
