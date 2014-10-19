var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var livereload = require('gulp-livereload');
var config = require('../config').watch;

// Watch
gulp.task('watch', ['html', 'bundle', 'webserver'], function () {
  // Watch .html files
  gulp.watch(config.src.html, ['html']);

  // Watch .scss files
  gulp.watch(config.src.styles, ['styles']);

  // Watch .js or .coffee files
  //gulp.start('scripts-watch');   // now working well...
  gulp.watch(config.src.scripts, ['scripts']);

  livereload.listen();
  gulp.watch(config.dst).on('change', livereload.changed);
});
