var gulp = require('gulp');
var browserSync = require('browser-sync');

// Webserver
gulp.task('webserver', function () {
  browserSync({
    server: {
      baseDir: "./dist/"
    }
  });
});
