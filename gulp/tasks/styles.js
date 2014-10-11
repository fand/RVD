var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gulpif = require('gulp-if');
var reload = require('browser-sync').reload;


var is_watching = false;
gulp.task('styles-watch', function () {
  is_watching = true;
  gulp.start('styles');
});

// Styles
gulp.task('styles', function () {
  return gulp.src('app/styles/main.scss')
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10,
      loadPath: ['app/bower_components']
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('dist/styles'))
    .pipe($.size())
    .pipe(gulpif(is_watching, reload({stream: true})));
});
