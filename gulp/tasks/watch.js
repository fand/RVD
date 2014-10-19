var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var reload = require('browser-sync').reload;

// Watch
gulp.task('watch', ['html', 'bundle', 'webserver'], function () {
  // Watch .html files
  gulp.watch('app/*.html', ['html', reload]);

  // Watch .scss files
  gulp.watch('app/styles/**/*.scss', ['styles', reload]);

  // Watch .js or .coffee files
  gulp.watch(['app/scripts/**/*.js', 'app/scripts/**/*.coffee'], ['scripts-watch', reload]);
});
