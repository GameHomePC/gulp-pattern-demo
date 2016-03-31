var config = require('../config');

if(!config.tasks.css) return;

var gulp = require('gulp'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    sourcemaps = require('gulp-sourcemaps'),
    prefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    cssmin = require('gulp-minify-css'),
    stylus = require('gulp-stylus');

var cssFunc = function() {
    gulp.src(config.tasks.css.src)
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(postcss([ prefixer(config.tasks.css.autoprefixer) ]))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.tasks.css.dest))
        .pipe(reload({stream: true}));
};

gulp.task('sass:build', cssFunc);
module.exports = cssFunc;