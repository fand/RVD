var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// Webserver
gulp.task('webserver', function () {
  gulp.src('dist')
    .pipe($.webserver({
      open: true,
      port: 9000,
      livereload: true
    }));
});
