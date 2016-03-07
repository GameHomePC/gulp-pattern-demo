var config = require('../config');

if(!config.tasks.js) return;

var gulp = require('gulp'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    babelify = require("babelify"),
    gutil = require('gulp-util'),
    path = require('path');

var jsFunc = function() {
    config.tasks.js.src.forEach(function(e) {
        browserify({
            entries: e,
            debug: true
        })
            .transform(babelify.configure({
                presets: ["es2015"]
            }))
            .bundle()
            .on('error', gutil.log)
            .pipe(source(path.basename(e)))
            .pipe(gulp.dest(config.tasks.js.dest))
            .pipe(reload({stream: true}));
    });
};

gulp.task('js:build', jsFunc);
module.exports = jsFunc;