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
  this.pattern = [];
  this.setPattern(this.string);
};
Sample.prototype.getThumb = function (dom) {
  this.thumbUrl = Thumb(dom);
};
Sample.isValid = function (file) {
  return (file && file.type && file.type.match(/video|audio/i));
};

Sample.prototype.getNote = function (time) {
  return this.pattern[time % this.pattern.length];
};

Sample.prototype.setPattern = function (string) {
  this.string = string.substr(0, 4);
  var pattern = [];
  for (var i = 0; i < string.length; i++) {
    var bin = Number('0x' + string[i]).toString(2);
    var zeropad = 4 - bin.length;
    for (var j = 0; j < zeropad; j++) {
      pattern.push(false);
    }
    for (j = 0; j < bin.length; j++) {
      pattern.push((bin[j] === '1') ? true : false);
    }
  }
  console.log(pattern);
  this.pattern = pattern;
};


module.exports = Sample;
