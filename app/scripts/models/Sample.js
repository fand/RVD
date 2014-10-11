'use strict';

var Thumb = require('../Thumb');

var count = 0;
var Sample = function (file) {
  this.id = count++;
  this.file = file;
  this.type = file.type;
  this.name = file.name;
  this.url = URL.createObjectURL(this.file);

  this.time = 20.3;
  this.string = 'F4D6';
  this.pattern = [1,1,1,1,0,1,0,0,1,1,0,1,0,1,1,0];
};
Sample.prototype.getThumb = function (dom) {
  this.thumbUrl = Thumb(dom);
};
Sample.isValid = function (file) {
  return (file && file.type && file.type.match(/video|audio/i));
};

Sample.prototype.getNote = function (time) {
  return this.pattern[time % this.pattern.length];
}

module.exports = Sample;
