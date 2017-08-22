var gulp = require('gulp');
var del = require('del');

// Clean
gulp.task('clean', function (cb) {
  del(['docs/styles', 'docs/scripts'], cb);
});
