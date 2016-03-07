var config = require('../config');

if(!config.tasks.fonts) return;

var gulp = require('gulp');

var fontsFunc = function() {
    gulp.src(config.tasks.fonts.src)
        .pipe(gulp.dest(config.tasks.fonts.dest))
};

gulp.task('fonts:build', fontsFunc);
module.exports = fontsFunc;