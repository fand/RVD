var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// HTML
gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe($.plumber())
    .pipe($.useref())
    .pipe(gulp.dest('docs'))
    .pipe($.size());
});
