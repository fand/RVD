'use strict';

var Thumb = require('../Thumb');

var Sample = function (file) {
  this.file = file;
  this.type = file.type;
  this.name = file.name;
  this.url = URL.createObjectURL(this.file);
};
Sample.prototype.getThumb = function (dom) {
  this.thumbUrl = Thumb(dom);
};

module.exports = Sample;
