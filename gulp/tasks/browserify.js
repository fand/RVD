var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

// Scripts
gulp.task('scripts', function () {
  var bundler = browserify({
    entries: ['./app/scripts/app.js'],
    extensions: ['.js', '.coffee'],
    debug: true,
    insertGlobals: true,
    cache: {}, packageCache: {}, fullPaths: true
  });

  bundler.transform('coffeeify');
  bundler.transform('reactify');

  var rebundle = function () {
    bundler.bundle()
      .on('error', function(){console.error('Compile.error');})
      .pipe(source('app.js'))
      .pipe(gulp.dest('dist/scripts'));
  };

  rebundle();
});
