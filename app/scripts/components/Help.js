/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var cs = React.addons.classSet;

var KeyActions = require('../actions/KeyActions');
var HelpStore = require('../stores/HelpStore');

var keys = [
  { key: 'Space', description: 'Play / Stop' },
  { key: 'Esc',   description: 'Toggle EDIT' },
  { key: '?',     description: 'Toggle HELP' },
  { key: '+/-',   description: 'Change BPM'  }
];


var Help = React.createClass({
  _toggle: function () {
    this.setState({
      visible: !this.state.visible
    });
  },
  getInitialState: function () {
    return { visible: false };
  },
  componentDidMount: function () {
    var self = this;
    KeyActions.bind('?', function () {
      self._toggle();
    });
    HelpStore.addListener(function () {
      self._toggle();
    })
  },
  onClick: function () {
    this._toggle();
  },
  render: function () {
    var lists = keys.map(function (k) {
      return (
        <li>
          <span className="help-key">{k.key}</span>
          <span className="help-description">{k.description}</span>
        </li>
      );
    });

    var cls = cs({
      help: true,
      visible: this.state.visible
    });
    return (
      <div className={cls} onClick={this.onClick}>
        <h1>HELP</h1>
        <ul>{lists}</ul>
      </div>
    );
  }
});

module.exports = Help;
