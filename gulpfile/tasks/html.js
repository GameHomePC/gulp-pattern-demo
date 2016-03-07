var config = require('../config');

if(!config.tasks.html) return;

var gulp = require('gulp'),
    rigger = require('gulp-rigger'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var htmlFunc = function() {
    gulp.src(config.tasks.html.src)
        .pipe(rigger())
        .pipe(gulp.dest(config.tasks.html.dest))
        .pipe(reload({stream: true}));
};

gulp.task('html:build', htmlFunc);
module.exports = htmlFunc;