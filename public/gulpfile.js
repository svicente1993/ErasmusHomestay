"use strict";

var gulp        = require('gulp'),
    jshint      = require('gulp-jshint'),
    browserSync = require('browser-sync'),
    runSequence = require('run-sequence'),
    reload      = browserSync.reload;

gulp.task('lint', function() {
  return gulp.src('./app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('serve', function(cb) {
    browserSync({
        port: 8080,
        server: {
            baseDir: "./"
        }
    });

    gulp.watch([
      "./*.html",
      "./app/**/*.js",
      "./app/**/*.html",
      "./app/**/**/*.html",
      "./app/**/**/*.js",
      "./assets/css/**/*.css",
      "./assets/img/**/*.*",
      "./index.html"
    ], browserSync.reload, cb);
});

gulp.task('default', function (cb) {
  runSequence('lint', 'test', cb);
});
