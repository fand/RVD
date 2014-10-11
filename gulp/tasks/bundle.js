var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

// Bundle
gulp.task('bundle', ['styles', 'scripts', 'bower'], function(){
  var assets = $.useref.assets();
  return gulp.src('./app/*.html')
    .pipe($.plumber())
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('dist'));
});
