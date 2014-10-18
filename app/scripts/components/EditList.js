/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var cs = React.addons.classSet;
var Edit = require('./Edit');
var KeyActions = require('../actions/KeyActions');

var EditList = React.createClass({
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
    KeyActions.bind('shift+right', this._moveRight);
    KeyActions.bind('shift+left', this._moveLeft);
    KeyActions.bind('shift+up', this._moveUp);
    KeyActions.bind('shift+down', this._moveDown);
    KeyActions.bind('esc', this._toggle);
  },
  render: function () {
    var self = this;
    var edits = this.props.samples.map(function (sample, i) {
      // Tell current position to Config.
      var cls = ((self.state.x === i) ? 'edit-active' :
                 (self.state.x < i) ? 'edit-right' : 'edit-left');
      cls += ' ' + ((self.state.y === 0) ? 'edit-pattern' : 'edit-time');
      var focus = ((!self.state.visible) ? '' :
                   (self.state.x !== i) ? '' :
                   (self.state.y === 0) ? 'pattern' : 'time');
      return (<Edit className={cls} sample={sample} key={sample.id} focus={focus} />);
    });

    var cls = cs({
      'edit-list': true,
      'visible': this.state.visible
    });

    return (
      <div className={cls}>
        {edits}
      </div>
    );
  }
});


module.exports = EditList;
