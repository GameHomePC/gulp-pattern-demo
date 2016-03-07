var config = require('../config');

if(!config.tasks.images) return;

var gulp = require('gulp'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

var imageFunc = function() {
    gulp.src(config.tasks.images.src)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(config.tasks.images.dest))
        .pipe(reload({stream: true}));
};

gulp.task('image:build', imageFunc);
module.exports = imageFunc;