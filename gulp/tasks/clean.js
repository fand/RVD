var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// Clean
gulp.task('clean', function () {
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false}).pipe($.clean());
});
