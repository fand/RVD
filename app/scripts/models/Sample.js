'use strict';

var Thumb = require('../util/Thumb');

var count = 0;
var Sample = function (file) {
  this.id = count++;
  this.setSample(file);

  this.time_string = '00:00.00';
  this.pattern_string = 'F4D6A6DC';
  this.time = 0;
  this.pattern = [];
  this.setPattern(this.pattern_string);
  this.setTime(this.time_string);
};
Sample.isValid = function (file) {
  return (file && file.type && file.type.match(/video|audio/i));
};

Sample.prototype.getNote = function (time) {
  return this.pattern[time % this.pattern.length];
};

Sample.prototype.setPattern = function (string) {
  // Format input pattern
  string = string
    .substr(0, 16)
    .replace(/-*$/, '')
    .replace(/-/g, '0');
  var len = string.length;

  // Create new pattern for input string
  var pattern = [];
  for (var i = 0; i < len; i++) {
    var bin = Number('0x' + string[i]).toString(2);
    var zeropad = 4 - bin.length;
    for (var j = 0; j < zeropad; j++) {
      pattern.push(false);
    }
    for (j = 0; j < bin.length; j++) {
      pattern.push((bin[j] === '1') ? true : false);
    }
  }

  // Pad to fit the length to 4, 8, or 16.
  var pad =
        (8 < len) ?  16 - len :
        (4 < len) ?  8 - len : 4 - len;

  var s_tail = [];
  var p_tail = [];
  for (i = 0; i < pad; i++) {
    s_tail.push('-');
    for (j = 0; j < 4; j++) {
      p_tail.push(false);
    }
  }
  this.pattern_string = string + s_tail.join('');
  this.pattern = pattern.concat(p_tail);
};

Sample.prototype.setSample = function (file) {
  this.file = file;
  this.type = file.type;
  this.name = file.name;
  this.url = URL.createObjectURL(this.file);
  if (this.dom) {
    this.dom.src = this.url;
  }
};

Sample.prototype.setTime = function (time_string) {
  if (time_string === this.time_string) { return; }


  // Convert string to sec.
  var times = time_string.split(/:|\./g);
  var newTime = (+times[0]) * 60 + (+times[1]) + (+times[2]) * 0.01;

  if (this.dom.duration < newTime) { return; }
  this.time = newTime;
  this.time_string = time_string;
  this.updateThumb();
};

Sample.prototype.setDOM = function (dom) {
  this.dom = dom;
  this.updateThumb();
};

Sample.prototype.updateThumb = function () {
  if (!this.dom) { return; }
  this.thumbUrl = Thumb(this.dom);
};

module.exports = Sample;
