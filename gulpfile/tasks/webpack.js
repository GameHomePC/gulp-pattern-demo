"use strict";

let config = require('../config');

let isDevelopment = true;

let gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    path = require('path'),
    webpackStream = require('webpack-stream'),
    webpack = webpackStream.webpack,
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    named = require('vinyl-named'),
    gulplog = require('gulplog');

gulp.task('webpack', function(callback) {
    let firstBuildReady = false;

    function done(err, stats) {
        firstBuildReady = true;

        if(err) {
            return;
        }

        gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
            colors: true
        }))
    }

    let options = {
        watch: isDevelopment,
        devtool: isDevelopment ? 'cheap-module-inline-source-map' : null,
        module: {
            loaders: [{
                test: /\.js$/,
                include: path.join(__dirname, "src"),
                loader: "babel?presets[]=es2015"
            }]
        },
        plugins: [
            new webpack.NoErrorsPlugin()
        ]

    };

    gulp.src(config.tasks.js.src)
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: "Webpack",
                message: err.message
            }))
        }))
        .pipe(named())
        .pipe(webpackStream(options, null, done))
        .pipe(gulpIf(!isDevelopment, uglify()))
        .pipe(gulp.dest(config.tasks.js.dest))
        .on('data' , function() {
            if(firstBuildReady) {
                callback();
            }
        });
});

//gulp.task('js:build', jsFunc);
//module.exports = jsFunc;