var gulp = require('gulp');
var express = require('express');
var config = require('../config').webserver;

// Webserver
gulp.task('webserver', function () {
  var serveStatic = require('serve-static');
  var app = express()
        .use(serveStatic(config.root))
        .listen(3000);
});
