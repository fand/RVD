/** @jsx React.DOM */
'use strict';

var React = require('react');
var KeyActions = require('../actions/KeyActions');

var numkeys = ('0123456789').split('');

var cancelEvent = function (e) {
  e.preventDefault();
  e.stopPropagation();
};

var TimeInput = React.createClass({
  getInitialState: function () {
    return {
      x: 0
    };
  },
  componentDidMount: function () {
    var self = this;
    this._onNum = {};
    numkeys.forEach(function (key) {
      self._onNum[key] = function (e) {
        if (! self.props.isFocused) { return; }
        cancelEvent(e);
        self.onKeyPressed(e, key);
      };
      KeyActions.bind(key, self._onNum[key]);
    });
    KeyActions.bind('left', this._moveLeft);
    KeyActions.bind('right', this._moveRight);
    KeyActions.bind(['del', 'backspace'], this._inputZero);
  },
  componentWillUnmount: function () {
    var self = this;
    numkeys.forEach(function (key) {
      KeyActions.unbind(key, self._onNum[key]);
    });
    KeyActions.unbind('left', this._moveLeft);
    KeyActions.unbind('right', this._moveRight);
    KeyActions.unbind(['del', 'backspace'], this._inputZero);
  },
  _inputZero: function (e) {
    if (! this.props.isFocused) { return; }
    cancelEvent(e);
    this.onKeyPressed(e, '0');
  },
  _moveRight: function (e) {
    if (! this.props.isFocused) { return; }
    cancelEvent(e);
    if (this.state.x < 9) {
      this.setState({ x: this.state.x + 1 });
    }
  },
  _moveLeft: function (e) {
    if (! this.props.isFocused) { return; }
    cancelEvent(e);
    if (this.state.x > 0) {
      this.setState({ x: this.state.x - 1 });
    }
  },
  onKeyPressed: function (e, key) {
    var pos = this.state.x;
    if (pos === 2 || pos === 5 || pos === 8) { return; }    // str[2], [5], [8] are separator. They can't be changed.

    // Get new string
    var str = this.props.sample.time_string + 'x' + this.props.sample.duration;
    var newStr = (str.substring(0, pos) + key + str.substring(pos + 1));

    (pos < 8) ?
      this._onTimeChange(newStr) : this._onDurationChange(newStr);
    this._moveRight(e);
  },
  _onTimeChange: function (str) {
    var newTime = str.substring(0, 8);
    this.props.onTimeChange(newTime);
  },
  _onDurationChange: function (str) {
    this.props.onDurationChange(str[9]);
  },
  renderLine: function () {
    var str = this.props.sample.time_string + 'x' + this.props.sample.duration;
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
    var style = { fontSize: (window.innerWidth / 10.0 * 1.6) };
    return (
      <div className={"time-input" + suffix} style={style}>
        {display}
      </div>
    );
  }
});


module.exports = TimeInput;
