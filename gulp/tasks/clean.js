var gulp = require('gulp');
var del = require('del');

// Clean
gulp.task('clean', function (cb) {
  del(['dist/styles', 'dist/scripts', 'dist/images'], cb);
});
