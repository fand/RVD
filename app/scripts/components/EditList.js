/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var Config = require('./Config');
var KeyActions = require('../actions/KeyActions');

var ConfigList = React.createClass({
  getInitialState: function () {
    return {
      x: 0,
      y: 0,
      visible: false
    };
  },
  _moveRight: function () {
    if (!this.state.visible) { return; }
    if (this.state.x >= this.props.samples.length - 1) { return; }
    this.setState({ x: this.state.x + 1 });
  },
  _moveLeft: function () {
    if (!this.state.visible) { return; }
    if (this.state.x === 0) { return; }
    this.setState({ x: this.state.x - 1 });
  },
  _moveUp: function () {
    if (!this.state.visible) { return; }
    if (this.state.y === 0) { return; }
    this.setState({ y: 0 });
  },
  _moveDown: function () {
    if (!this.state.visible) { return; }
    if (this.state.y === 1) { return; }
    this.setState({ y: 1 });
  },
  _toggle: function () {
    this.setState({ visible: !this.state.visible });
  },
  componentDidMount: function () {
    var self = this;
    KeyActions.bind('shift+right', function (e) {
      self._moveRight();
    });
    KeyActions.bind('shift+left', function (e) {
      self._moveLeft();
    });
    KeyActions.bind('shift+up', function (e) {
      self._moveUp();
    });
    KeyActions.bind('shift+down', function (e) {
      self._moveDown();
    });
    KeyActions.bind('esc', function (e) {
      self._toggle();
    });
  },
  render: function () {
    var self = this;
    var configs = this.props.samples.map(function (sample, i) {
      // Tell current position to Config.
      var cls = ((self.state.x === i) ? 'config-active' :
                 (self.state.x < i) ? 'config-right' : 'config-left');
      cls += ' ' + ((self.state.y === 0) ? 'config-pattern' : 'config-time');
      var focus = ((!self.state.visible) ? '' :
                   (self.state.x !== i) ? '' :
                   (self.state.y === 0) ? 'pattern' : 'time');

      return (<Config className={cls} sample={sample} key={sample.id} focus={focus} />);
    });

    var cls = 'config-list ';
    cls += (this.state.visible) ? 'visible' : 'invisible';

    return (
      <div className={cls}>
        {configs}
      </div>
    );
  }
});


module.exports = ConfigList;
