/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var cs = React.addons.classSet;

var KeyActions = require('../actions/KeyActions');
var HelpStore = require('../stores/HelpStore');
var Constants = require('../Constants');

var keys = [
  { key: '?',     description: 'Toggle Help' },
  { key: 'Space', description: 'Play / Stop' },
  { key: 'Esc',   description: 'Toggle Edit Mode' },
  { key: 'Shift + ←/→',   description: 'Change Edit Target' },
  { key: 'Shift + ↑/↓',   description: 'Toggle Pattern/Time' },
  { key: '+/-',   description: 'Change BPM'  }
];


var Help = React.createClass({
  _toggle: function () {
    this.setState({
      visible: !this.state.visible
    });
  },
  getInitialState: function () {
    return { visible: true };
  },
  componentDidMount: function () {
    var self = this;
    KeyActions.bind('?', function () {
      self._toggle();
    });
    HelpStore.addListener(function () {
      self._toggle();
    })
    HelpStore.on(Constants.HELP_HIDE, function () {
      if (self.state.visible) {
        self._toggle();
      }
    })
  },
  onClick: function () {
    this._toggle();
  },
  renderKey: function (k, i) {
    return (
      <li key={i}>
        <span className="help-key">{k.key}</span>
        <span className="help-description">{k.description}</span>
      </li>
    );
  },
  render: function () {
    var lists = keys.map(this.renderKey);
    var cls = cs({
      help: true,
      visible: this.state.visible
    });
    return (
      <div className={cls} onClick={this.onClick}>
        <h2>RVD - React Video Sampler</h2>
        <ol>
          <li>Drag &amp; Drop videos here.</li>
          <li>Hit ESC to edit patterns.</li>
        </ol>
        <ul>{lists}</ul>
      </div>
    );
  }
});

module.exports = Help;
