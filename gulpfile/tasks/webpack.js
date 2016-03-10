var config = require('../config');

var isDevelopment = true;

var gulp = require('gulp'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    babelify = require("babelify"),
    gutil = require('gulp-util'),
    path = require('path'),
    webpackStream = require('webpack-stream'),
    webpack = webpackStream.webpack,
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    gulpIf = require('gulp-if'),
    uglify = require('gulp-uglify'),
    named = require('vinyl-named');

gulp.task('webpack', function() {
    var options = {
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
        .pipe(webpackStream(options))
        .pipe(gulpIf(!isDevelopment, uglify()))
        .pipe(gulp.dest(config.tasks.js.dest));
});

//gulp.task('js:build', jsFunc);
//module.exports = jsFunc;