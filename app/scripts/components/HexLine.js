/** @jsx React.DOM */
'use strict';

var React = require('react');

var HexLine = React.createClass({
  onChange: function (e) {
    this.props.onChange(e);
  },
  render: function () {
    return (
      <span className="hexline">
        0x<input type="text" onChange={this.onChange} value={this.props.value} />
      </span>
    );
  }
});


module.exports = HexLine;
