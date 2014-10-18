var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// Watch
gulp.task('watch', ['html', 'bundle', 'webserver'], function () {
  // Watch .json files
  gulp.watch('app/scripts/**/*.json', ['json']);

  // Watch .html files
  gulp.watch('app/*.html', ['html']);

  // Watch .scss files
  gulp.watch('app/styles/**/*.scss', ['styles-watch']);

  // Watch .js or .coffee files
  gulp.watch(['app/scripts/**/*.js', 'app/scripts/**/*.coffee'], ['scripts-watch']);
});
