/** @jsx React.DOM */
'use strict';

var React = require('react');
var Help = require('./Help');
var HelpActions = require('../actions/HelpActions');

var Header = React.createClass({
  onClickHelp: function () {
    HelpActions.toggle();
  },
  render: function () {
    return (
      <div>
        <div className="header">
          <h1>RVD</h1>
          <h2 onClick={this.onClickHelp}>HELP</h2>
        </div>
        <Help />
      </div>
    );
  }
});

module.exports = Header;
