'use strict';

var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');

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

// HTML
gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe($.useref())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

// Images
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

// Clean
gulp.task('clean', function () {
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false}).pipe($.clean());
});


// Bundle
gulp.task('bundle', ['styles', 'scripts', 'bower'], function(){
  var assets = $.useref.assets();
  return gulp.src('./app/*.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('dist'));
});

// Build
gulp.task('build', ['html', 'bundle', 'images']);

// Default task
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

// Webserver
gulp.task('webserver', function () {
  gulp.src('dist')
    .pipe($.webserver({
      open: true,
      port: 9000,
      livereload: true
    }));
});

// Bower helper
gulp.task('bower', function() {
  gulp.src('app/bower_components/**/*.js', {base: 'app/bower_components'})
    .pipe(gulp.dest('dist/bower_components/'));

});

gulp.task('json', function() {
  gulp.src('app/scripts/json/**/*.json', {base: 'app/scripts'})
    .pipe(gulp.dest('dist/scripts/'));
});

// Watch
gulp.task('watch', ['html', 'bundle', 'webserver'], function () {
  // Watch .json files
  gulp.watch('app/scripts/**/*.json', ['json']);

  // Watch .html files
  gulp.watch('app/*.html', ['html']);

  // Watch .scss files
  gulp.watch('app/styles/**/*.scss', ['styles']);

  // Watch .js or .coffee files
  gulp.watch(['app/scripts/**/*.js', 'app/scripts/**/*.coffee'], ['scripts']);

  // Watch image files
  gulp.watch('app/images/**/*', ['images']);
});
