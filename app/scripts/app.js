/** @jsx React.DOM */
'use strict';

var React = require('react');
var c = require('./Caret');
var RVDApp = require('./views/RVDApp');

React.renderComponent(<RVDApp />, document.getElementById('app'));
