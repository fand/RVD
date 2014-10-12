/** @jsx React.DOM */
'use strict';

var React = require('react');
var KeyActions = require('../actions/KeyActions');

var hexkeys = ('0123456789abcdef').split('');

var HexLine = React.createClass({
  getInitialState: function () {
    return {
      isFocused: false,
      x: 0,
      y: 0
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
    hexkeys.forEach(function (key) {
      KeyActions.bind(key, function (e) {
        if (! self.state.isFocused) { return; }
        self.onKeyPressed(key);
      });
    });
    KeyActions.bind('up', function (e) {
      self.ifFocusedThen(e, function () {
        if (self.state.y > 0) {
          self.setState({
            y: self.state.y + 1
          });
        }
      });
    });
    KeyActions.bind('down', function (e) {
      self.ifFocusedThen(e, function () {
        if (self.state.y < 1) {
          self.setState({
            y: self.state.y - 1
          });
        }
      });
    });
    KeyActions.bind('left', function (e) {
      self.ifFocusedThen(e, function () {
        if (self.state.x > 0) {
          self.setState({
            x: self.state.x - 1
          });
        }
      });
    });
    KeyActions.bind('right', function (e) {
      self.ifFocusedThen(e, function () {
        if (self.state.x < self.props.value.length - 1) {
          self.setState({
            x: self.state.x + 1
          });
        }
      });
    });
  },
  onKeyPressed: function (key) {
    var str = this.props.value;
    var newStr = str.substr(0, this.state.x) + key + str.substr(this.state.x + 1)
    this.props.onChange(newStr);
  },
  onClick: function () {
    this.setState({
      isFocused: true
    });
  },
  onBlur: function () {
    this.setState({
      isFocused: false
    });
  },
  onChange: function (e) {
    this.props.onChange(e);
  },
  render: function () {
    var str = this.props.value;
    var display = (
      <span className="hexline-display">
        <span>{'0x' + str.substr(0, this.state.x)}</span>
        <span className="hexline-invert">{str[this.state.x]}</span>
        <span>{str.substr(this.state.x + 1)}</span>
      </span>
    );
    return (
      <span className="hexline" onClick={this.onClick} onBlur={this.onBlur}>
        {display}
      </span>
    );
  }
});


module.exports = HexLine;
