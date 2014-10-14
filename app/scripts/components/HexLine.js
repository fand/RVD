/** @jsx React.DOM */
'use strict';

var React = require('react');
var KeyActions = require('../actions/KeyActions');

var hexkeys = ('0123456789abcdefABCDEF').split('');

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
      self.ifFocusedThen(e, self._moveUp);
    });
    KeyActions.bind('down', function (e) {
      self.ifFocusedThen(e, self._moveDown);
    });
    KeyActions.bind('left', function (e) {
      self.ifFocusedThen(e, self._moveLeft);
    });
    KeyActions.bind('right', function (e) {
      self.ifFocusedThen(e, self._moveRight);
    });
    KeyActions.bind(['del', 'backspace'], function (e) {
      var pos = self.state.y * 8 + self.state.x;
      self.ifFocusedThen(e, function () {
        var str = self.props.sample.string;
        self.props.onChange(str.substring(0, pos) + str.substring(pos + 1));
      })
    });
    KeyActions.bind(['enter'], function (e) {
      self.setState({ isFocused: false });
    });
  },
  _moveRight: function () {
    var lim = (this.props.sample.string.length <= 4) ? 3 : 7;
    var nbsp = (this.props.sample.string.length <= 8) ? 1 : 0;
    if (this.state.x < lim + nbsp) {
      this.setState({ x: this.state.x + 1 });
    }
  },
  _moveLeft: function () {
    if (this.state.x > 0) {
      this.setState({ x: this.state.x - 1 });
    }
  },
  _moveUp: function () {
    if (this.state.y > 0) {
      this.setState({ y: this.state.y - 1 });
    }
  },
  _moveDown: function () {
    if (this.state.y < 1) {
      this.setState({ y: this.state.y + 1 });
    }
  },
  onKeyPressed: function (key) {
    var str = this.props.sample.string;
    var pos = this.state.y * 8 + this.state.x;
    var newStr = (str.substring(0, pos) + key + str.substring(pos + 1)).toUpperCase();
    this.props.onChange(newStr);

    if (pos === 8 && this.state.y == 0) {
      this.setState({
        x: 0, y: 1
      });
    } else {
      this._moveRight();
    }
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
  onChange: function (str) {
    this.props.onChange(str);
  },
  renderOneLine: function () {
    var str = this.props.sample.string + '　';
    return (
      <span className="hexline-display">
        <span className="line">
          <span>{'0x' + str.substring(0, this.state.x)}</span>
          <span className="hexline-invert">{str[this.state.x]}</span>
          <span>{str.substring(this.state.x + 1)}</span>
        </span>
      </span>
    );
  },
  renderTwoLine: function () {
    var str = this.props.sample.string;
    if (this.state.y === 0) {
      return (
        <span className="hexline-display">
          <span className="line">
            <span>{'0x' + str.substring(0, this.state.x)}</span>
            <span className="hexline-invert">{str[this.state.x]}</span>
            <span>{str.substring(this.state.x + 1, 8)}</span>
          </span>
          <span className="line">
            <span>{'0x' + str.substring(8)}</span>
          </span>
        </span>
      );
    } else {
      return (
        <span className="hexline-display">
          <span className="line">
            <span>{'0x' + str.substring(0, 8)}</span>
          </span>
          <span className="line">
            <span>{'0x' + str.substring(8, 8 + this.state.x)}</span>
            <span className="hexline-invert">{str[8 + this.state.x]}</span>
            <span>{str.substring(this.state.x + 9)}</span>
          </span>
        </span>
      )
    }
  },
  render: function () {
    var display;
    if (this.props.sample.string.length <= 8) {
      display = this.renderOneLine();
    } else {
      display = this.renderTwoLine();
    }

    var suffix = (this.state.isFocused) ? ' focused' : '';
    return (
      <div className={"hexline" + suffix} onClick={this.onClick} onBlur={this.onBlur}>
        {display}
      </div>
    );

  }
});


module.exports = HexLine;
