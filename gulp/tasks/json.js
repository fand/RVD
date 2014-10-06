var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// Json task (just copy files)
gulp.task('json', function() {
  gulp.src('app/scripts/json/**/*.json', {base: 'app/scripts'})
    .pipe(gulp.dest('dist/scripts/'));
});
