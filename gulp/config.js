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
    dst: BASE('docs/**/*')
  },
  webserver: {
    root: BASE('docs')
  },
  scripts: {
    entries: [BASE('app/scripts/app.js')],
    dst: BASE('docs/scripts')
  }
};
