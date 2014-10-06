var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

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
    .pipe($.size());
});
