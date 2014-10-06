var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// Bower helper
gulp.task('bower', function() {
  gulp.src('app/bower_components/**/*.js', {base: 'app/bower_components'})
    .pipe(gulp.dest('dist/bower_components/'));

});
