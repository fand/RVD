var path = require('path');
var BASE_DIR = __dirname + './../';
var BASE = function (p) {
  return path.join(BASE_DIR, p);
};


module.exports = {
  watch: {
    src: {
      html: BASE('app/*html'),
      styles: BASE('app/styles/**/*'),
      scripts: BASE('app/scripts/**/*')
    },
    dst: BASE('dist/**/*')
  },
  webserver: {
    root: BASE('dist')
  },
  scripts: {
    entries: [BASE('app/scripts/app.js')],
    dst: BASE('dist/scripts')
  },
  jshint: {
    src: BASE('app/scripts/**/*.js')
  }
};
