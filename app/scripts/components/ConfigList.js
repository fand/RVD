/** @jsx React.DOM */
'use strict';

var React = require('react/addons');
var Config = require('./Config');
var KeyActions = require('../actions/KeyActions');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;


var ConfigList = React.createClass({
  getInitialState: function () {
    return { index: 0 };
  },
  _moveRight: function () {
    if (this.state.index >= this.props.samples.length - 1) { return; }
    this.setState({ index: this.state.index + 1 });
  },
  _moveLeft: function () {
    if (this.state.index == 0) { return; }
    this.setState({ index: this.state.index - 1 });
  },
  componentDidMount: function () {
    var self = this;
    KeyActions.bind('shift+right', function (e) {
      self._moveRight();
    });
    KeyActions.bind('shift+left', function (e) {
      self._moveLeft();
    });
  },
  render: function () {
    var self = this;
    var configs = this.props.samples.map(function (sample, i) {
      var cls = ((self.state.index === i) ? 'config-active' :
                 (self.state.index < i) ? 'config-right' : 'config-left');
      return (<Config className={cls} sample={sample} key={sample.id}/>);
    });
    return (
      <div className={'configList ' + this.props.mode + '-mode'}>
        {configs}
      </div>
    );
  }
});


module.exports = ConfigList;
