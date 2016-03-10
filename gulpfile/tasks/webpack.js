"use strict";

let config = require('../config');

let isDevelopment = true;

let gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    path = require('path'),
    webpackStream = require('webpack-stream'),
    webpack = webpackStream.webpack,
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    named = require('vinyl-named');

gulp.task('webpack', function(callback) {
    let options = {
        output: {
            publicPath: '/js/'
        },
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

    return gulp.src(config.tasks.js.src)
        .pipe(plumber({
            errorHandler: notify.onError(err => ({
                title: "Webpack",
                message: err.message
            }))
        }))
        .pipe(named())
        .pipe(webpackStream(options))
        .pipe(gulpIf(!isDevelopment, uglify()))
        .pipe(gulp.dest(config.tasks.js.dest))
        .pipe(reload({stream: true}));
});

//gulp.task('js:build', jsFunc);
//module.exports = jsFunc;