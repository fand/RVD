var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');

// for 'watch' task
var is_watching = false;
gulp.task('scripts-watch', function () {
  is_watching = true;
  gulp.start('scripts');
});

// Scripts
gulp.task('scripts', function () {
  var bundler = browserify({
    entries: ['./app/scripts/app.js'],
    extensions: ['.js', '.coffee'],
    debug: true,
    insertGlobals: true,
    cache: {}, packageCache: {}, fullPaths: true
  });

  if (is_watching) {
    bundler = watchify(bundler);
  }

  bundler.transform('coffeeify');
  bundler.transform('reactify');

  var rebundle = function () {
    bundler.bundle()
      .on('error', gutil.log.bind(gutil))
      .pipe(source('app.js'))
      .pipe(gulp.dest('dist/scripts'));
  };

  if (is_watching) {
    bundler.on('update', rebundle);
  }
  else {
    rebundle();
  }
});
