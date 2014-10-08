'use strict';

var Thumb = require('../Thumb');

var count = 0;
var Sample = function (file) {
  this.id = count++;
  this.file = file;
  this.type = file.type;
  this.name = file.name;
  this.url = URL.createObjectURL(this.file);
};
Sample.prototype.getThumb = function (dom) {
  this.thumbUrl = Thumb(dom);
};
Sample.isValid = function (file) {
  return (file && file.type && file.type.match(/video|audio/i));
};

module.exports = Sample;
