var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var react = require('gulp-react');
var config = require('../config').jshint;

gulp.task('jshint', function() {
  return gulp.src(config.src)
    .pipe(react())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
