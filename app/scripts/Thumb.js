'use strict';

var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.style.opacity = 0;
document.body.appendChild(canvas);

var Thumb = function (video) {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL();
};

module.exports = Thumb;
