/** @jsx React.DOM */
'use strict';

var React = require('react');
var KeyActions = require('../actions/KeyActions');

var numkeys = ('0123456789').split('');

var TimeLine = React.createClass({
  getInitialState: function () {
    return {
      x: 0
    };
  },
  ifFocusedThen: function (e, cb) {
    if (! this.props.isFocused) { return; }
    e.preventDefault();
    e.stopPropagation();
    cb();
  },
  componentDidMount: function () {
    var self = this;
    numkeys.forEach(function (key) {
      KeyActions.bind(key, function (e) {
        if (! self.props.isFocused) { return; }
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
      if (! self.props.isFocused) { return; }
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
    var str = this.props.sample.time_string + '';
    var pos = this.state.x;
    var newTime = (str.substring(0, pos) + key + str.substring(pos + 1));
    this.onChange(newTime);
    this._moveRight();
  },
  onChange: function (str) {
    this.props.onChange(str);
  },
  renderLine: function () {
    var str = this.props.sample.time + '　';
    return (
      <span className="fake-display">
        <span className="line">
          <span>{str.substring(0, this.state.x)}</span>
          <span className="fake-invert">{str[this.state.x]}</span>
          <span>{str.substring(this.state.x + 1)}</span>
        </span>
      </span>
    );
  },
  render: function () {
    var display = this.renderLine();
    var suffix = (this.props.isFocused) ? ' focused' : '';
    return (
      <div className={"timeline" + suffix}>
        {display}
      </div>
    );
  }
});


module.exports = TimeLine;
