/** @jsx React.DOM */
'use strict';

var React = require('react');

var cancelEvent = function (e) {
  e.preventDefault();
  e.stopPropagation();
};


/**
 * Adds files on Drop.
 */
var Dropper = React.createClass({
  getInitialState: function () {
    return {
      over: false
    }
  },
  onDragEnter: cancelEvent,
  onDragLeave: function (e) {
    cancelEvent(e);
    this.setState({
      samples: this.state.samples,
      over: false
    });
  },
  onDragOver: function (e) {
    cancelEvent(e);
    this.setState({
      over: true
    });
  },
  onDrop: function (e) {
    cancelEvent(e);
    var files = e.dataTransfer.files;
    this.setState({
      over: false
    });
    this.props.onDrop(files);
  },
  render: function() {
    var cls = 'dropper';
    if (this.props.hide) {
      cls += ' hide';
    }

    var maskCls = 'dropper-mask';
    if (this.state.over) {
      maskCls += ' over'
    }

    return (
      <div className={cls}
        onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}>
        <div className={maskCls} />
        {this.props.children}
      </div>
    );
  }
});

module.exports = Dropper;
