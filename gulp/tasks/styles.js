var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var reload = require('browser-sync').reload;

// Styles
gulp.task('styles', function () {
  return gulp.src('app/styles/main.scss')
    .pipe($.sass())
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('docs/styles'))
    .pipe($.size());
});
