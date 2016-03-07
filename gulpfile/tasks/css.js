var config = require('../config');

if(!config.tasks.css) return;

var gulp = require('gulp'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    sourcemaps = require('gulp-sourcemaps'),
    prefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    gutil = require('gulp-util'),
    cssmin = require('gulp-minify-css'),
    sass = require('gulp-sass');

var cssFunc = function() {
    gulp.src(config.tasks.css.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', gutil.log))
        .pipe(postcss([ prefixer(config.tasks.css.autoprefixer) ]))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.tasks.css.dest))
        .pipe(reload({stream: true}));
};

gulp.task('sass:build', cssFunc);
module.exports = cssFunc;